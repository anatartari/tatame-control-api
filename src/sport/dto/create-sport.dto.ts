import { IsString, IsNotEmpty, IsNumber, Min, IsArray } from 'class-validator';
import { DayOfWeekEnum } from 'src/global/enums/dayOfWeek.enum';

export class CreateSportDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    sensei: string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    price: number;

    @IsArray()
    @IsNotEmpty()
    dayOfWeek: DayOfWeekEnum[];

    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;
}
