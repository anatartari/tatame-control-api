import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMedicalInfoDto {
  @IsOptional()
  @IsString()
  preExistingCondition?: string;

  @IsOptional()
  @IsString()
  preExistingConditionDetails?: string;

  @IsOptional()
  @IsString()
  seriousInjury?: string;

  @IsOptional()
  @IsString()
  medicalRestriction?: string;

  @IsOptional()
  @IsString()
  heartCondition?: string;

  @IsOptional()
  @IsString()
  respiratoryIssues?: string;

  @IsOptional()
  @IsString()
  faintingEpisodes?: string;

  @IsOptional()
  @IsString()
  recentInjury?: string;

  @IsOptional()
  @IsString()
  jointProblems?: string;

  @IsOptional()
  @IsString()
  prosthetics?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  continuousMedication?: string;

  @IsOptional()
  @IsString()
  emergencyMedication?: string;

  @IsOptional()
  @IsString()
  seizureHistory?: string;
  
  @IsOptional()
  @IsString()
  majorSurgery?: string;

  @IsOptional()
  @IsString()
  physicalLimitation?: string;

  @IsString()
  emergencyContactName: string;

  @IsString()
  emergencyContactNumber: string;

  @IsBoolean()
  fitnessDeclaration: boolean;
} 