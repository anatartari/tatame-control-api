import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../global/entities/base.entity';

@Entity('medicalInfo')
export class MedicalInfo extends BaseEntity {

    @Column({ name: 'preExistingCondition', type: 'text', nullable: true })
    preExistingCondition?: string;

    @Column({ name: 'seriousInjury', type: 'text', nullable: true })
    seriousInjury?: string;

    @Column({ name: 'medicalRestriction', type: 'text', nullable: true })
    medicalRestriction?: string;

    @Column({ name: 'heartCondition', type: 'text', nullable: true })
    heartCondition?: string;

    @Column({ name: 'respiratoryIssues', type: 'text', nullable: true })
    respiratoryIssues?: string;

    @Column({ name: 'faintingEpisodes', type: 'text', nullable: true })
    faintingEpisodes?: string;

    @Column({ name: 'recentInjury', type: 'text', nullable: true })
    recentInjury?: string;

    @Column({ name: 'jointProblems', type: 'text', nullable: true })
    jointProblems?: string;

    @Column({ name: 'prosthetics', type: 'text', nullable: true })
    prosthetics?: string;

    @Column({ name: 'allergies', type: 'text', nullable: true })
    allergies?: string;

    @Column({ name: 'continuousMedication', type: 'text', nullable: true })
    continuousMedication?: string;

    @Column({ name: 'emergencyMedication', type: 'text', nullable: true })
    emergencyMedication?: string;

    @Column({ name: 'seizureHistory', type: 'text', nullable: true })
    seizureHistory?: string;

    @Column({ name: 'majorSurgery', type: 'text', nullable: true })
    majorSurgery?: string;

    @Column({ name: 'physicalLimitation', type: 'text', nullable: true })
    physicalLimitation?: string;

    @Column({ name: 'emergencyContactName', length: 255 })
    emergencyContactName: string;

    @Column({ name: 'emergencyContactNumber', length: 30 })
    emergencyContactNumber: string;

    @Column({ name: 'fitnessDeclaration' })
    fitnessDeclaration: boolean;
}

