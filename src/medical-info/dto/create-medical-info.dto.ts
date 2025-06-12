import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMedicalInfoDto {
  @IsString()
  preExistingCondition: string;

  @IsOptional()
  @IsString()
  preExistingConditionDetails?: string;

  @IsString()
  seriousInjury: string;

  @IsString()
  medicalRestriction: string;

  @IsString()
  heartCondition: string;

  @IsString()
  respiratoryIssues: string;

  @IsString()
  faintingEpisodes: string;

  @IsString()
  recentInjury: string;

  @IsString()
  jointProblems: string;

  @IsString()
  prosthetics: string;

  @IsString()
  allergies: string;

  @IsString()
  continuousMedication: string;

  @IsString()
  emergencyMedication: string;

  @IsString()
  seizureHistory: string;

  @IsString()
  majorSurgery: string;

  @IsString()
  physicalLimitation: string;

  @IsString()
  emergencyNameContact: string;

  @IsString()
  emergencyNumberContact: string;

  @IsBoolean()
  fitnessDeclaration: boolean;
} 