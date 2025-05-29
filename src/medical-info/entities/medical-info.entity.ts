// src/medical-info/entities/medical-info.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';

@Entity('medical_info')
export class MedicalInfo extends BaseEntity {

    @Column({ name: 'pre_existing_condition', length: 10 })
    preExistingCondition: string;

    @Column({ name: 'pre_existing_condition_details', type: 'text', nullable: true })
    preExistingConditionDetails?: string;

    @Column({ name: 'serious_injury', length: 10 })
    seriousInjury: string;

    @Column({ name: 'serious_injury_details', type: 'text', nullable: true })
    seriousInjuryDetails?: string;

    @Column({ name: 'medical_restriction', length: 10 })
    medicalRestriction: string;

    @Column({ name: 'medical_restriction_details', type: 'text', nullable: true })
    medicalRestrictionDetails?: string;

    @Column({ name: 'heart_condition', length: 10 })
    heartCondition: string;

    @Column({ name: 'heart_condition_details', type: 'text', nullable: true })
    heartConditionDetails?: string;

    @Column({ name: 'respiratory_issues', length: 10 })
    respiratoryIssues: string;

    @Column({ name: 'respiratory_issues_details', type: 'text', nullable: true })
    respiratoryIssuesDetails?: string;

    @Column({ name: 'fainting_episodes', length: 10 })
    faintingEpisodes: string;

    @Column({ name: 'fainting_episodes_details', type: 'text', nullable: true })
    faintingEpisodesDetails?: string;

    @Column({ name: 'recent_injury', length: 10 })
    recentInjury: string;

    @Column({ name: 'recent_injury_details', type: 'text', nullable: true })
    recentInjuryDetails?: string;

    @Column({ name: 'joint_problems', length: 10 })
    jointProblems: string;

    @Column({ name: 'joint_problems_details', type: 'text', nullable: true })
    jointProblemsDetails?: string;

    @Column({ name: 'prosthetics', length: 10 })
    prosthetics: string;

    @Column({ name: 'prosthetics_details', type: 'text', nullable: true })
    prostheticsDetails?: string;

    @Column({ name: 'allergies', length: 10 })
    allergies: string;

    @Column({ name: 'allergies_details', type: 'text', nullable: true })
    allergiesDetails?: string;

    @Column({ name: 'continuous_medication', length: 10 })
    continuousMedication: string;

    @Column({ name: 'continuous_medication_details', type: 'text', nullable: true })
    continuousMedicationDetails?: string;

    @Column({ name: 'emergency_medication', length: 10 })
    emergencyMedication: string;

    @Column({ name: 'emergency_medication_details', type: 'text', nullable: true })
    emergencyMedicationDetails?: string;

    @Column({ name: 'seizure_history', length: 10 })
    seizureHistory: string;

    @Column({ name: 'seizure_history_details', type: 'text', nullable: true })
    seizureHistoryDetails?: string;

    @Column({ name: 'major_surgery', length: 10 })
    majorSurgery: string;

    @Column({ name: 'major_surgery_details', type: 'text', nullable: true })
    majorSurgeryDetails?: string;

    @Column({ name: 'physical_limitation', length: 10 })
    physicalLimitation: string;

    @Column({ name: 'physical_limitation_details', type: 'text', nullable: true })
    physicalLimitationDetails?: string;

    @Column({ name: 'emergency_name_contact', length: 255 })
    emergencyNameContact: string;

    @Column({ name: 'emergency_number_contact', length: 30 })
    emergencyNumberContact: string;

    @Column({ name: 'fitness_declaration' })
    fitnessDeclaration: boolean;
}