import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsBoolean, 
  IsDate, 
  IsArray, 
  ValidateNested,
  IsUUID 
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateMedicalInfoDto } from 'src/medical-info/dto/create-medical-info.dto';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsBoolean()
  allowSocialMedia?: boolean;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsBoolean()
  practicedMartialArts?: boolean;

  @IsOptional()
  @IsString()
  graduatedInStyle?: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ValidateNested()
  @Type(() => CreateMedicalInfoDto)
  medicalInfo: CreateMedicalInfoDto;

} 