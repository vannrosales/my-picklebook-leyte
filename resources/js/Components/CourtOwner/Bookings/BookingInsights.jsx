export default function BookingInsights({ insights = {} }) {
    const popularCourt = insights.popularCourt || 'Your Court';
    const pendingCount = insights.pendingCount || 0;
    const upcomingSlots = insights.upcomingSlots || [];

    return (
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
            
            {/* Quick Summary Card */}
            <div className="lg:col-span-2 rounded-2xl bg-[#E8F5E9] p-6 sm:p-8 border border-[#22C55E]/20 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <div>
                    <span className="inline-block rounded-full bg-[#1B6138] px-3 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider mb-3 shadow-xs">
                        QUICK SUMMARY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1B6138] tracking-tight">
                        {popularCourt} is in high demand
                    </h3>
                    <p className="text-xs text-[#527960] mt-2 leading-relaxed max-w-xl font-medium">
                        {pendingCount > 0 
                            ? `You have ${pendingCount} pending booking requests waiting for confirmation. Review them to maximize facility revenue.`
                            : `All recent schedules are running smoothly with steady activity across your active facilities.`}
                    </p>
                </div>
                
                <div className="mt-6">
                    <a href={route('court.bookings')} className="text-xs font-bold text-[#1B6138] hover:underline flex items-center gap-1.5 transition-transform duration-200 hover:translate-x-1 w-fit">
                        <span>View All Bookings</span>
                        <span>→</span>
                    </a>
                </div>
            </div>

            {/* Upcoming Slots Widget */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-extrabold text-gray-900 text-sm tracking-tight">Upcoming Slots</h4>
                        <span className="text-[10px] font-bold text-[#71796F] bg-gray-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                    </div>

                    <div className="space-y-3.5">
                        {upcomingSlots.length > 0 ? (
                            upcomingSlots.map((slot) => {
                                const isBooked = slot.is_booked;
                                const courtName = slot.court?.name || 'Court Facility';
                                
                                // Extracts the day (e.g. "Monday") if you have a date column or day column on your slot, fallback to slot.day or 'Today'
                                const slotDay = slot.day_of_week || slot.day || (slot.date ? new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long' }) : 'Today');

                                return (
                                    <div key={slot.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-none last:pb-1">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-extrabold text-gray-900">{slot.start_time}</span>
                                                <span className="text-[10px] font-bold text-[#1B6138] bg-[#E8F5E9]/60 px-1.5 py-0.5 rounded">
                                                    {slotDay}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-[#71796F] font-semibold mt-0.5">{courtName}</span>
                                        </div>

                                        <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-wider uppercase ${
                                            isBooked ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-[#E8F5E9] text-[#1B6138] border border-[#22C55E]/20'
                                        }`}>
                                            {isBooked ? 'Booked' : 'Available'}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-xs text-[#71796F] font-medium">No upcoming slots found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <a href={route('court.schedules')} className="mt-6 block text-center rounded-xl bg-gray-900 py-3 text-xs font-extrabold text-white hover:bg-gray-800 hover:shadow-md transition-all duration-200 tracking-wider">
                    MANAGE CALENDAR
                </a>
            </div>

        </div>
    );
}