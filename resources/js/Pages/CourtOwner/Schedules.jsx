import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourtSelector from '@/Components/CourtOwner/Schedule/CourtSelector';
import DayScheduleRow from '@/Components/CourtOwner/Schedule/DayScheduleRow';
import { buildSchedulesState, formatSchedulesForSubmission } from '@/utils/scheduleHelpers';

export default function Schedules({ auth, courts, selectedCourtId, daysOfWeek, schedules }) {
    
    const [currentCourtId, setCurrentCourtId] = useState(selectedCourtId || courts[0]?.id || '');

    const { data, setData, post, processing } = useForm({
        court_id: currentCourtId,
        schedules: buildSchedulesState(daysOfWeek, schedules),
    });

    // Real-time sync: Updates form state whenever server props change on court switch
    useEffect(() => {
        setCurrentCourtId(selectedCourtId);
        setData({
            court_id: selectedCourtId,
            schedules: buildSchedulesState(daysOfWeek, schedules),
        });
    }, [selectedCourtId, schedules]);

    // Triggers background fetch for the newly selected court
    const handleCourtChange = (newCourtId) => {
        setCurrentCourtId(newCourtId);

        router.get(
            route('court.schedules'), 
            { court_id: newCourtId }, 
            { 
                preserveState: true, 
                preserveScroll: true,
                only: ['schedules', 'selectedCourtId'] 
            }
        );
    };

    const handleDayToggle = (day) => {
        setData('schedules', {
            ...data.schedules,
            [day]: {
                ...data.schedules[day],
                is_open: !data.schedules[day].is_open,
            }
        });
    };

    const handleTimeFieldChange = (day, field, value) => {
        setData('schedules', {
            ...data.schedules,
            [day]: {
                ...data.schedules[day],
                [field]: value,
            }
        });
    };

    const submitSchedules = (e) => {
        e.preventDefault();

        const formattedSchedules = formatSchedulesForSubmission(data.schedules);

        post(route('court.schedules.store'), {
            data: {
                court_id: currentCourtId,
                schedules: formattedSchedules,
            },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Court Schedules - PickleBook Tacloban" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full relative">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Operating Schedules</h1>
                            <p className="text-xs text-[#71796F] mt-1 font-medium">Set weekly operating hours and availability templates for your venues.</p>
                        </div>
                        <CourtSelector 
                            courts={courts} 
                            currentCourtId={currentCourtId} 
                            onChange={handleCourtChange} 
                        />
                    </div>

                    {courts.length > 0 ? (
                        <form onSubmit={submitSchedules} className="space-y-4">
                            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="font-extrabold text-gray-900 tracking-tight">Weekly Hours Template (12-Hour Format)</h3>
                                    <p className="text-xs text-[#71796F] mt-0.5">Slots will automatically generate based on these opening and closing times.</p>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {daysOfWeek.map((day) => (
                                        <DayScheduleRow
                                            key={day}
                                            day={day}
                                            dayConfig={data.schedules[day] || { is_open: false, opening_time: '08:00', opening_period: 'AM', closing_time: '10:00', closing_period: 'PM' }}
                                            onToggle={() => handleDayToggle(day)}
                                            onChange={handleTimeFieldChange}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="rounded-xl bg-[#1B6138] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#154d2c] hover:shadow-md transition-all duration-200 disabled:opacity-50"
                                >
                                    {processing ? 'Saving Schedules...' : 'Save Schedule Templates'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                            <p className="text-sm font-semibold text-gray-700">No courts available.</p>
                            <p className="text-xs text-[#71796F] mt-1">Please add a court venue first before setting schedules.</p>
                        </div>
                    )}

                </main>
            </div>
        </AuthenticatedLayout>
    );
}