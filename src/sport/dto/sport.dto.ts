import { DayOfWeekEnum, daysOfWeekStringToArray } from "src/global/enums/dayOfWeek.enum";
import { Sport } from "../entities/sport.entity";

export class SportDto {
    id: string;
    name: string;
    sensei: string;
    price: number;
    dayOfWeek: DayOfWeekEnum[];
    startTime: string;
    endTime: string;

    static convertToDto(sport: Sport): SportDto {
        return {
            id: sport.id,
            name: sport.name,
            sensei: sport.sensei,
            price: sport.price,
            dayOfWeek: daysOfWeekStringToArray(sport.dayOfWeek),
            startTime: sport.startTime,
            endTime: sport.endTime,
        };
    }
}