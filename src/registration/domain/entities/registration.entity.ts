import { Entity, ManyToOne, Column, Unique, JoinTable, ManyToMany, JoinColumn } from 'typeorm';
import { Student } from '../../../student/domain/entities/student.entity';
import { Sport } from '../../../sport/domain/entities/sport.entity';
import { Payment } from '../../../payment/domain/entities/payment.entity';
import { BaseEntity } from '../../../global/entities/base.entity';
import { RegistrationStatusEnum } from '../../../global/enums/registrationStatus.enum';

@Entity()
@Unique(['student', 'sport'])
export class Registration extends BaseEntity {

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student: Student;

    @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sportId' })
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
        name: 'registrationPayment',
        joinColumn: {
            name: 'registrationId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'paymentId',
            referencedColumnName: 'id'
        }
    })
    payments: Payment[]
}

