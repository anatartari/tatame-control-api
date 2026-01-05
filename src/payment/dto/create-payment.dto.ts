import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    referenceMonth: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    registrationIds: string[];
}

