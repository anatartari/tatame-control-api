import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../global/entities/base.entity';
import { Registration } from '../../../registration/domain/entities/registration.entity';

@Entity()
export class Payment extends BaseEntity {
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ name: 'referenceMonth', type: 'integer' })
    referenceMonth: number;

    @ManyToMany(() => Registration, (registration) => registration.payments)
    registrations: Registration[];
}

