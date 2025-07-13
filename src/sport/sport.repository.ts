import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { SportWithStudentsCountDto } from './dto/sport-with-students-count.dto';
import { BasicListSportDto } from './dto/basic-list-sport.dto';
import { daysOfWeekStringToArray } from 'src/global/enums/dayOfWeek.enum';

@Injectable()
export class SportRepository extends Repository<Sport> {
    
    constructor(private dataSource: DataSource) {
        super(Sport, dataSource.createEntityManager());
    }

    async findBasicList(): Promise<BasicListSportDto[]> {
        return this.createQueryBuilder('sport')
            .select([
                'sport.id',
                'sport.name',
                'sport.day_of_week',
                'sport.start_time',
                'sport.end_time',
            ])
            .where('sport.active = true')
            .getRawMany()
            .then(this.mapBasicList);
    }

    async findWithStudentCount(): Promise<SportWithStudentsCountDto[]> {
        return this.createQueryBuilder('sport')
            .leftJoin('sport.registrations', 'registration')
            .select([
                'sport.id',
                'sport.name',
                'sport.sensei',
                'sport.price',
                'sport.day_of_week',
                'sport.start_time',
                'sport.end_time',
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
            dayOfWeek: daysOfWeekStringToArray(raw.day_of_week),  
            startTime: raw.start_time,
            endTime: raw.end_time,
            price: raw.sport_price,
            studentsCount: parseInt(raw.studentsCount, 10),
        }));
    
    }

    private mapBasicList(rawResults: any[]): BasicListSportDto[] {
        return rawResults.map(raw => ({
            id: raw.sport_id,
            name: raw.sport_name,
            dayOfWeek: daysOfWeekStringToArray(raw.day_of_week),
            startTime: raw.start_time,
            endTime: raw.end_time,
        }));
    }
}