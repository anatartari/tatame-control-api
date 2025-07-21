// src/medical-info/entities/medical-info.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';

@Entity('medical_info')
export class MedicalInfo extends BaseEntity {

    @Column({ name: 'pre_existing_condition', type: 'text', nullable: true })
    preExistingCondition?: string;

    @Column({ name: 'serious_injury', type: 'text', nullable: true })
    seriousInjury?: string;

    @Column({ name: 'medical_restriction', type: 'text', nullable: true })
    medicalRestriction?: string;

    @Column({ name: 'heart_condition', type: 'text', nullable: true })
    heartCondition?: string;

    @Column({ name: 'respiratory_issues', type: 'text', nullable: true })
    respiratoryIssues?: string;

    @Column({ name: 'fainting_episodes', type: 'text', nullable: true })
    faintingEpisodes?: string;

    @Column({ name: 'recent_injury', type: 'text', nullable: true })
    recentInjury?: string;

    @Column({ name: 'joint_problems', type: 'text', nullable: true })
    jointProblems?: string;

    @Column({ name: 'prosthetics', type: 'text', nullable: true })
    prosthetics?: string;

    @Column({ name: 'allergies', type: 'text', nullable: true })
    allergies?: string;

    @Column({ name: 'continuous_medication', type: 'text', nullable: true })
    continuousMedication?: string;

    @Column({ name: 'emergency_medication', type: 'text', nullable: true })
    emergencyMedication?: string;

    @Column({ name: 'seizure_history', type: 'text', nullable: true })
    seizureHistory?: string;

    @Column({ name: 'major_surgery', type: 'text', nullable: true })
    majorSurgery?: string;

    @Column({ name: 'physical_limitation', type: 'text', nullable: true })
    physicalLimitation?: string;

    @Column({ name: 'emergency_contact_name', length: 255 })
    emergencyContactName: string;

    @Column({ name: 'emergency_contact_number', length: 30 })
    emergencyContactNumber: string;

    @Column({ name: 'fitness_declaration' })
    fitnessDeclaration: boolean;
}