import { Entity, ManyToOne, Column, Unique, JoinTable, ManyToMany } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Sport } from '../../sport/entities/sport.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { BaseEntity } from '../../global/entities/base.entity';
@Entity()
@Unique(['student', 'sport'])
export class Registration extends BaseEntity {

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    student: Student;

    @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
    sport: Sport;

    @Column({ length: 50 })
    status: string;

    @ManyToMany(() => Payment)
    @JoinTable()
    payments: Payment[]
}