import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOneOptions } from 'typeorm';
import { Sport } from '../../domain/entities/sport.entity';
import { ISportRepository } from '../../ports/repositories/sport.repository.port';
import { SportWithStudentsCountDto } from '../../dto/sport-with-students-count.dto';
import { BasicListSportDto } from '../../dto/basic-list-sport.dto';
import { daysOfWeekStringToArray } from 'src/global/enums/dayOfWeek.enum';

@Injectable()
export class SportRepositoryAdapter implements ISportRepository {
    constructor(
        @InjectRepository(Sport)
        private readonly repository: Repository<Sport>,
    ) {}

    async find(): Promise<Sport[]> {
        return this.repository.find();
    }

    async findOne(options: FindOneOptions<Sport>): Promise<Sport | null> {
        return this.repository.findOne(options);
    }

    create(entityLike: Partial<Sport>): Sport {
        if (entityLike === undefined) {
            return this.repository.create();
        }
        if (Array.isArray(entityLike)) {
            return this.repository.create(entityLike);
        }
        return this.repository.create(entityLike);
    }

    async save(entity: Sport): Promise<Sport> {
        return this.repository.save(entity);
    }

    async update(id: string, entity: Partial<Sport>): Promise<void> {
        await this.repository.update(id, entity);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByIds(ids: string[]): Promise<Sport[]> {
        return this.repository.find({
            where: { id: In(ids) },
            select: ['id', 'price']
        });
    }

    async findBasicList(): Promise<BasicListSportDto[]> {
        return this.repository.createQueryBuilder('sport')
            .select([
                'sport.id',
                'sport.name',
                'sport.dayOfWeek',
                'sport.startTime',
                'sport.endTime',
            ])
            .where('sport.active = true')
            .getRawMany()
            .then(this.mapBasicList);
    }

    async findWithStudentCount(): Promise<SportWithStudentsCountDto[]> {
        return this.repository.createQueryBuilder('sport')
            .leftJoin('sport.registrations', 'registration')
            .select([
                'sport.id',
                'sport.name',
                'sport.sensei',
                'sport.price',
                'sport.dayOfWeek',
                'sport.startTime',
                'sport.endTime',
            ])
            .addSelect('COUNT(registration.id)', 'studentsCount')
            .groupBy('sport.id')
            .getRawMany()
            .then(this.mapRawResults);
    }

    private mapRawResults(rawResults: any[]): SportWithStudentsCountDto[] {
        return rawResults.map(raw => ({
            id: raw.sport_id,
            name: raw.sport_name,
            sensei: raw.sport_sensei,
            dayOfWeek: daysOfWeekStringToArray(raw.sport_dayOfWeek),  
            startTime: raw.sport_startTime,
            endTime: raw.sport_endTime,
            price: raw.sport_price,
            studentsCount: parseInt(raw.studentsCount, 10),
        }));
    }

    private mapBasicList(rawResults: any[]): BasicListSportDto[] {
        return rawResults.map(raw => ({
            id: raw.sport_id,
            name: raw.sport_name,
            dayOfWeek: daysOfWeekStringToArray(raw.sport_dayOfWeek),
            startTime: raw.sport_startTime,
            endTime: raw.sport_endTime,
        }));
    }
}

