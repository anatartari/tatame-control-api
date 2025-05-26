import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { SportWithStudentsCountDto } from './dto/sport-with-students-count.dto';

@Injectable()
export class SportRepository extends Repository<Sport> {
    constructor(private dataSource: DataSource) {
        super(Sport, dataSource.createEntityManager());
    }

    async findWithStudentCount(): Promise<SportWithStudentsCountDto[]> {
        return this.createQueryBuilder('sport')
            .leftJoin('sport.registrations', 'registration')
            .select([
                'sport.id',
                'sport.name',
                'sport.sensei',
                'sport.day_of_week',
                'sport.start_time',
                'sport.end_time',
            ])
            .addSelect('COUNT(registration.id)', 'students_count')
            .groupBy('sport.id')
            .getRawMany()
            .then(this.mapRawResults);
    }

    private mapRawResults(rawResults: any[]): SportWithStudentsCountDto[] {
        return rawResults.map(raw => ({
            id: raw.sport_id,
            name: raw.sport_name,
            sensei: raw.sport_sensei,
            day_of_week: raw.sport_day_of_week,
            start_time: raw.sport_start_time,
            end_time: raw.sport_end_time,
            students_count: parseInt(raw.students_count, 10),
        }));
    }
}