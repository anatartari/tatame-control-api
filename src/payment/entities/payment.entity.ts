import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';

@Entity()
export class Payment extends BaseEntity {

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @Column({ type: 'date' })
    date: Date;
}