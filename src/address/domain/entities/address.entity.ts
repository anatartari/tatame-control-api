import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../global/entities/base.entity';

@Entity()
export class Address extends BaseEntity {   

    @Column({ length: 255 })
    street: string;

    @Column({ length: 255 })
    neighborhood: string;

    @Column({ length: 20 })
    cep: string;

    @Column({ length: 100, nullable: true })
    city?: string;

    @Column({ length: 50, nullable: true })
    state?: string;

    @Column({ length: 20, nullable: true })
    number?: string;

    @Column({ length: 100, nullable: true })
    complement?: string;
}

