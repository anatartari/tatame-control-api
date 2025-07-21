// src/student/student.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { MedicalInfo } from '../../medical-info/entities/medical-info.entity';
import { BaseEntity } from '../../global/entities/base.entity';

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

    @Column({ default: false })
    allow_social_media: boolean;

    @Column({ length: 255, nullable: true })
    instagram?: string;

    @Column({ nullable: true })
    practiced_martial_arts?: boolean;

    @Column({ length: 255, nullable: true })
    graduated_in_style?: string;

    @ManyToOne(() => Address, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'address_id' })
    address?: Address;

    @ManyToOne(() => MedicalInfo, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'medical_info_id' })
    medicalInfo?: MedicalInfo;
}