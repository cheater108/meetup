import { timeslots } from "./data";

function isWithinDaysLimit(no_of_days: number, date: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const limitDays = limitDate(no_of_days);
    const givenDate = new Date(date);

    return givenDate <= limitDays && givenDate >= today;
}

function limitDate(no_of_days: number) {
    const limitDay = new Date();
    limitDay.setHours(0, 0, 0, 0);
    let days = no_of_days;

    while (days > 0) {
        if (limitDay.getDay() === 0 || limitDay.getDay() === 6) {
            limitDay.setDate(limitDay.getDate() + 1);
            continue;
        }
        if (days === 1 && limitDay.getDay() === 5) {
            limitDay.setDate(limitDay.getDate() + 3);
            days--;
            continue;
        }
        limitDay.setDate(limitDay.getDate() + 1);
        days--;
    }
    return limitDay;
}

function getInitialDateData(date: string) {
    const data = {
        date,
        slots: timeslots,
        available: 16,
    };

    return data;
}

export { isWithinDaysLimit, getInitialDateData, limitDate };
