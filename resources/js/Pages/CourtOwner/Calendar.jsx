import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CalendarHeader from '@/Components/CourtOwner/Calendar/CalendarHeader';
import CalendarGrid from '@/Components/CourtOwner/Calendar/CalendarGrid';
import { buildCalendarData } from '@/utils/calendarHelpers';

export default function Calendar({ auth, courts = [], bookings = [], selectedCourtId: initialCourtId = 'all' }) {
    const [selectedCourtId, setSelectedCourtId] = useState(initialCourtId);
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    // Handle real-time court switcher change via Inertia
    const handleCourtChange = (newCourtId) => {
        setSelectedCourtId(newCourtId);
        
        router.get(
            route('court.calendar'), // Adjust route name to match your backend web.php route
            { court_id: newCourtId }, 
            { 
                preserveState: true, 
                preserveScroll: true,
                only: ['bookings', 'selectedCourtId'] 
            }
        );
    };

    const { currentMonthLabel, calendarCells } = buildCalendarData(currentDate, bookings, selectedCourtId);

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Court Calendar - Court Owner" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    
                    <CalendarHeader 
                        courts={courts}
                        selectedCourtId={selectedCourtId}
                        onCourtChange={handleCourtChange}
                        currentMonthLabel={currentMonthLabel}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        onToday={handleToday}
                    />

                    <CalendarGrid calendarCells={calendarCells} />

                </main>
            </div>
        </AuthenticatedLayout>
    );
}