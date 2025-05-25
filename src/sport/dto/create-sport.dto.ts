import { IsString, IsNotEmpty, IsNumber, MaxLength, Min } from 'class-validator';
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

    @MaxLength(5)
    @IsNotEmpty()
    day_of_week: DayOfWeekEnum[];

    @IsString()
    @IsNotEmpty()
    start_time: string;

    @IsString()
    @IsNotEmpty()
    end_time: string;
}
