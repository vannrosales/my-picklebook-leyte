export const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

/**
 * Generates the calendar matrix cells and bookings index map for a given date and set of bookings.
 */
export function buildCalendarData(currentDate, bookings, selectedCourtId) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 1. Filter bookings based on selected court dropdown
    const filteredBookings = bookings.filter(b => {
        if (selectedCourtId === 'all') return true;
        return String(b.court_id) === String(selectedCourtId);
    });

    // 2. Map bookings by date string
    const bookingsByDate = {};
    filteredBookings.forEach(b => {
        const rawDate = b.time_slot?.booking_date || b.time_slot?.date || b.booking_date || b.date || b.created_at || '';
        if (!rawDate) return;

        const dateKey = String(rawDate).substring(0, 10);
        if (!bookingsByDate[dateKey]) {
            bookingsByDate[dateKey] = [];
        }
        bookingsByDate[dateKey].push(b);
    });

    // 3. Calculate calendar grid cells
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarCells = [];

    for (let i = 0; i < firstDayIndex; i++) {
        calendarCells.push({ type: 'empty', id: `empty-${i}` });
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        const dateString = `${year}-${formattedMonth}-${formattedDay}`;

        calendarCells.push({
            type: 'day',
            dayNumber: day,
            dateString: dateString,
            id: dateString,
            bookings: bookingsByDate[dateString] || []
        });
    }

    return {
        currentMonthLabel: `${monthNames[month]} ${year}`,
        calendarCells
    };
}