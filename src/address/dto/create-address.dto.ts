import { IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;
} 