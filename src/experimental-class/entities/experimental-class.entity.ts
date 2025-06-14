// src/experimental-class/experimental-class.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sport } from '../../sport/entities/sport.entity';
import { Student } from '../../student/entities/student.entity';
import { BaseEntity } from '../../global/entities/base.entity';

@Entity('experimental_class')
export class ExperimentalClass extends BaseEntity {

    @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
    sport: Sport;

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    student: Student;
}