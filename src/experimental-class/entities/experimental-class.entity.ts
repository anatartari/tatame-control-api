// src/experimental-class/experimental-class.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sport } from '../../sport/entities/sport.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class ExperimentalClass {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
    sport: Sport;

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    student: Student;
}