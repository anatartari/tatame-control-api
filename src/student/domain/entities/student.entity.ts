import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../global/entities/base.entity';
import { Address } from '../../../address/domain/entities/address.entity';
import { MedicalInfo } from '../../../medical-info/domain/entities/medical-info.entity';

@Entity()
export class Student extends BaseEntity {

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 50, nullable: true })
    gender?: string;

    @Column({ type: 'date' })
    birthday: Date;

    @Column({ name: 'allowSocialMedia', default: false })
    allowSocialMedia: boolean;

    @Column({ length: 255, nullable: true })
    instagram?: string;

    @Column({ name: 'practicedMartialArts', nullable: true })
    practicedMartialArts?: boolean;

    @Column({ name: 'graduatedInStyle', length: 255, nullable: true })
    graduatedInStyle?: string;

    @ManyToOne(() => Address, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'addressId' })
    address?: Address;

    @ManyToOne(() => MedicalInfo, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'medicalInfoId' })
    medicalInfo?: MedicalInfo;
}

