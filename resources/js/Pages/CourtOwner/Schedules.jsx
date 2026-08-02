import { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Helper function: Converts 24-hour time ("14:30") to 12-hour object ({ time: "02:30", period: "PM" })
const to12HourFormat = (time24) => {
    if (!time24) return { time: '08:00', period: 'AM' };
    let [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    let period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return {
        time: `${String(h).padStart(2, '0')}:${minutes || '00'}`,
        period: period
    };
};

// Helper function: Converts 12-hour state back to 24-hour string ("14:30") for backend submission
const to24HourFormat = (time12, period) => {
    if (!time12) return '08:00';
    let [h, m] = time12.split(':');
    let hours = parseInt(h, 10);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${m || '00'}`;
};

export default function Schedules({ auth, courts, selectedCourtId, daysOfWeek, schedules }) {
    
    const [currentCourtId, setCurrentCourtId] = useState(selectedCourtId || courts[0]?.id || '');


    // Initialize form state for all 7 days with 12-hour structured values
    const initialSchedulesState = daysOfWeek.reduce((acc, day) => {
        const existing = schedules[day];
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

    const { data, setData, post, processing } = useForm({
        court_id: currentCourtId,
        schedules: initialSchedulesState,
    });

    // Handle court switcher dropdown change
    const handleCourtChange = (e) => {
        const newCourtId = e.target.value;
        setCurrentCourtId(newCourtId);
        router.get(route('court.schedules'), { court_id: newCourtId }, { preserveState: true });
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

        // Format data back to 24-hour strings before dispatching payload to backend
        const formattedSchedules = {};
        Object.keys(data.schedules).forEach((day) => {
            const item = data.schedules[day];
            formattedSchedules[day] = {
                day_of_week: item.day_of_week,
                is_open: item.is_open,
                opening_time: to24HourFormat(item.opening_time, item.opening_period),
                closing_time: to24HourFormat(item.closing_time, item.closing_period),
            };
        });

        post(route('court.schedules.store'), {
            data: {
                court_id: data.court_id,
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
                    
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Operating Schedules</h1>
                            <p className="text-xs text-[#71796F] mt-1 font-medium">Set weekly operating hours and availability templates for your venues.</p>
                        </div>

                        {/* Court Dropdown Switcher */}
                        {courts.length > 0 && (
                            <div className="w-full sm:w-64">
                                <label className="block text-[10px] font-bold uppercase text-[#71796F] mb-1">Select Venue</label>
                                <select 
                                    value={currentCourtId}
                                    onChange={handleCourtChange}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-900 shadow-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                >
                                    {courts.map(court => (
                                        <option key={court.id} value={court.id}>{court.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {courts.length > 0 ? (
                        <form onSubmit={submitSchedules} className="space-y-4">
                            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="font-extrabold text-gray-900 tracking-tight">Weekly Hours Template (12-Hour Format)</h3>
                                    <p className="text-xs text-[#71796F] mt-0.5">Slots will automatically generate based on these opening and closing times.</p>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {daysOfWeek.map((day) => {
                                        const dayConfig = data.schedules[day];
                                        return (
                                            <div key={day} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8FAF6]/60 transition-colors">
                                                
                                                {/* Day Name & Toggle */}
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDayToggle(day)}
                                                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${dayConfig.is_open ? 'bg-[#22C55E]' : 'bg-gray-300'}`}
                                                    >
                                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${dayConfig.is_open ? 'translate-x-6' : 'translate-x-0'}`} />
                                                    </button>
                                                    <span className="font-extrabold text-sm text-gray-900 w-28">{day}</span>
                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${dayConfig.is_open ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-gray-100 text-gray-400'}`}>
                                                        {dayConfig.is_open ? 'Open' : 'Closed'}
                                                    </span>
                                                </div>

                                                {/* Opening and Closing Time Pickers with AM/PM */}
                                                {dayConfig.is_open ? (
                                                    <div className="flex items-center gap-3">
                                                        {/* Opening Time Box */}
                                                        <div>
                                                            <span className="block text-[9px] font-bold uppercase text-[#71796F] mb-0.5">Opening</span>
                                                            <div className="flex items-center gap-1">
                                                                <input 
                                                                    type="time" 
                                                                    value={dayConfig.opening_time}
                                                                    onChange={(e) => handleTimeFieldChange(day, 'opening_time', e.target.value)}
                                                                    className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                                                />
                                                                <select
                                                                    value={dayConfig.opening_period}
                                                                    onChange={(e) => handleTimeFieldChange(day, 'opening_period', e.target.value)}
                                                                    className="rounded-xl border border-gray-200 px-2 py-1.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                                                >
                                                                    <option value="AM">AM</option>
                                                                    <option value="PM">PM</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <span className="text-gray-400 mt-4">to</span>

                                                        {/* Closing Time Box */}
                                                        <div>
                                                            <span className="block text-[9px] font-bold uppercase text-[#71796F] mb-0.5">Closing</span>
                                                            <div className="flex items-center gap-1">
                                                                <input 
                                                                    type="time" 
                                                                    value={dayConfig.closing_time}
                                                                    onChange={(e) => handleTimeFieldChange(day, 'closing_time', e.target.value)}
                                                                    className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                                                />
                                                                <select
                                                                    value={dayConfig.closing_period}
                                                                    onChange={(e) => handleTimeFieldChange(day, 'closing_period', e.target.value)}
                                                                    className="rounded-xl border border-gray-200 px-2 py-1.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                                                >
                                                                    <option value="AM">AM</option>
                                                                    <option value="PM">PM</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-gray-400 italic font-medium py-2">No operating hours set</div>
                                                )}

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Save Button Bar */}
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