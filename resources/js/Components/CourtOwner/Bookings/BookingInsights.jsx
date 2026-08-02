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
                    <p className="text-xs text-[#527960] mt-2 leading-relaxed max-w-xl">
                        {pendingCount > 0 
                            ? `You have ${pendingCount} pending booking requests waiting for confirmation. Review them to maximize facility revenue.`
                            : `All recent schedules are running smoothly with steady activity across your active facilities.`}
                    </p>
                </div>
                
                <div className="mt-6">
                    <a href={route('court.bookings')} className="text-xs font-bold text-[#1B6138] hover:underline flex items-center gap-1.5 transition-transform duration-200 hover:translate-x-1">
                        <span>View All Bookings</span>
                        <span>→</span>
                    </a>
                </div>
            </div>

            {/* Upcoming Slots Widget */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Upcoming Slots</h4>
                    <div className="space-y-3">
                        {upcomingSlots.length > 0 ? (
                            upcomingSlots.map((slot) => {
                                const isBooked = slot.is_booked;
                                return (
                                    <div key={slot.id} className="flex items-center justify-between border-b border-gray-100 pb-2.5 last:border-none last:pb-1">
                                        <span className="text-xs font-bold text-gray-700">{slot.start_time}</span>
                                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                                            isBooked ? 'bg-rose-50 text-rose-600' : 'bg-[#E8F5E9] text-[#1B6138]'
                                        }`}>
                                            {isBooked ? 'BOOKED' : 'AVAILABLE'}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-xs text-[#71796F] text-center py-4">No upcoming slots found.</p>
                        )}
                    </div>
                </div>

                <a href={route('court.schedules')} className="mt-6 block text-center rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-gray-800 hover:shadow-md transition-all duration-200">
                    MANAGE CALENDAR
                </a>
            </div>

        </div>
    );
}