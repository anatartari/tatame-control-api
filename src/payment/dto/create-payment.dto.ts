import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    reference_month: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    registration_ids: string[];
}

