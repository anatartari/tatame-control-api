import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';
import { Registration } from 'src/registration/entities/registration.entity';

@Entity()
export class Payment extends BaseEntity {
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'integer' })
    reference_month: number;

    @ManyToMany(() => Registration, (registration) => registration.payments)
    @JoinTable()
    registrations: Registration[];
}