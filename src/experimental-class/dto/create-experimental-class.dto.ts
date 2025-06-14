import { IsString, IsEmail, IsEnum, IsDate, IsBoolean, IsOptional, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../../global/enums/gender.enum';

export class CreateExperimentalClassDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @Type(() => Date)
    @IsDate()
    birthday: Date;

    @IsBoolean()
    practiced_martial_arts: boolean;

    @IsString()
    @IsOptional()
    graduated_in_style?: string;

    @IsArray()
    @IsUUID(4, { each: true })
    sport_ids: string[];
} 