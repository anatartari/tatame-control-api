export enum DayOfWeekEnum {
    SUN = 'SUN',
    MON = 'MON',
    TUES = 'TUES',
    WEDNES = 'WEDNES',
    THURS = 'THURS',
    FRI = 'FRI',
    SATUR = 'SATUR',
}

export const daysOfWeekArrayToString = (days: DayOfWeekEnum[] | DayOfWeekEnum): string => {
    if (Array.isArray(days)) {
        return days.join(',');
    }
    return days;
};

export const daysOfWeekStringToArray = (days: string): DayOfWeekEnum[] => {
    return days.split(',').map(day => day.trim() as DayOfWeekEnum);
};