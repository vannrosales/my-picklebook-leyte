import { to12HourFormat, to24HourFormat } from './timeFormatters';

/**
 * Builds the initial 12-hour structured form state for all days of the week.
 */
export function buildSchedulesState(daysOfWeek, currentSchedules) {
    return daysOfWeek.reduce((acc, day) => {
        const existing = currentSchedules?.[day];
        const open24 = existing ? existing.opening_time.slice(0, 5) : '08:00';
        const close24 = existing ? existing.closing_time.slice(0, 5) : '22:00';
        
        const open12 = to12HourFormat(open24);
        const close12 = to12HourFormat(close24);

        acc[day] = {
            day_of_week: day,
            is_open: !!existing,
            opening_time: open12.time,
            opening_period: open12.period,
            closing_time: close12.time,
            closing_period: close12.period,
        };
        return acc;
    }, {});
}

/**
 * Formats the 12-hour frontend schedule states back into 24-hour database payloads.
 */
export function formatSchedulesForSubmission(schedulesData) {
    const formattedSchedules = {};
    Object.keys(schedulesData).forEach((day) => {
        const item = schedulesData[day];
        formattedSchedules[day] = {
            day_of_week: item.day_of_week,
            is_open: item.is_open,
            opening_time: to24HourFormat(item.opening_time, item.opening_period),
            closing_time: to24HourFormat(item.closing_time, item.closing_period),
        };
    });
    return formattedSchedules;
}