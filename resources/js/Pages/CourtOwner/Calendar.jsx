import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/CourtOwner/Sidebar';
import CalendarHeader from '@/Components/CourtOwner/Calendar/CalendarHeader';
import CalendarGrid from '@/Components/CourtOwner/Calendar/CalendarGrid';

export default function Calendar({ auth, courts = [], bookings = [] }) {
    const [selectedCourtId, setSelectedCourtId] = useState('all');
    
    // Month & Year state navigation
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0 - 11

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthLabel = `${monthNames[month]} ${year}`;

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    // Calculate Days in Month grid
    const firstDayIndex = new Date(year, month, 1).getDay(); 
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Filter bookings based on selected court dropdown
    const filteredBookings = bookings.filter(b => {
        if (selectedCourtId === 'all') return true;
        return String(b.court_id) === String(selectedCourtId);
    });

    // Map bookings by date string (prioritizing timeSlot date details or booking columns)
    const bookingsByDate = {};
    filteredBookings.forEach(b => {
        // Look for the date string inside the timeSlot relationship or booking row fields
        const rawDate = b.time_slot?.booking_date || b.time_slot?.date || b.booking_date || b.date || b.created_at || '';
        
        if (!rawDate) return;

        // Extract strictly the YYYY-MM-DD substring safely
        const dateKey = String(rawDate).substring(0, 10);

        if (!bookingsByDate[dateKey]) {
            bookingsByDate[dateKey] = [];
        }
        bookingsByDate[dateKey].push(b);
    });

    // Build calendar matrix cells
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

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Court Calendar - Court Owner" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    

                    {/* Header Component */}
                    <CalendarHeader 
                        courts={courts}
                        selectedCourtId={selectedCourtId}
                        onCourtChange={setSelectedCourtId}
                        currentMonthLabel={currentMonthLabel}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        onToday={handleToday}
                    />

                    {/* Calendar Grid Component */}
                    <CalendarGrid calendarCells={calendarCells} />

                </main>
            </div>
        </AuthenticatedLayout>
    );
}