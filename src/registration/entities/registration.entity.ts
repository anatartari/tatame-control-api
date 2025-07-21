import { Entity, ManyToOne, Column, Unique, JoinTable, ManyToMany } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Sport } from '../../sport/entities/sport.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { BaseEntity } from '../../global/entities/base.entity';
import { RegistrationStatusEnum } from '../../global/enums/registration-status.enum';

@Entity()
@Unique(['student', 'sport'])
export class Registration extends BaseEntity {

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    student: Student;

    @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
    sport: Sport;

    @Column({ 
        type: 'varchar', 
        length: 50,
        enum: RegistrationStatusEnum,
        default: RegistrationStatusEnum.ACTIVE
    })
    status: RegistrationStatusEnum;

    @ManyToMany(() => Payment, (payment) => payment.registrations)
    @JoinTable({
        name: 'registration_payment',
        joinColumn: {
            name: 'registration_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'payment_id',
            referencedColumnName: 'id'
        }
    })
    payments: Payment[]
}