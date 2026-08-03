/**
 * Converts 24-hour time ("14:30") to 12-hour object ({ time: "02:30", period: "PM" })
 */
export function to12HourFormat(time24) {
    if (!time24) return { time: '08:00', period: 'AM' };
    let [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    let period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return {
        time: `${String(h).padStart(2, '0')}:${minutes || '00'}`,
        period: period
    };
}

/**
 * Converts 12-hour state back to 24-hour string ("14:30") for backend submission
 */
export function to24HourFormat(time12, period) {
    if (!time12) return '08:00';
    let [h, m] = time12.split(':');
    let hours = parseInt(h, 10);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${m || '00'}`;
}