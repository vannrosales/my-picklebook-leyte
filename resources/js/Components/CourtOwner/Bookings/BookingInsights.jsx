export default function BookingInsights() {
    return (
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
            
            {/* Quick Summary Card */}
            <div className="lg:col-span-2 rounded-2xl bg-[#E8F5E9] p-6 sm:p-8 border border-[#22C55E]/20 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <div>
                    <span className="inline-block rounded-full bg-[#1B6138] px-3 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider mb-3 shadow-xs">
                        QUICK SUMMARY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1B6138] tracking-tight">
                        Court #02 is in high demand
                    </h3>
                    <p className="text-xs text-[#527960] mt-2 leading-relaxed max-w-xl">
                        Three overlapping requests detected for the 6 PM slot. Consider opening Court #05 for backup to maximize revenue.
                    </p>
                </div>
                
                <div className="mt-6">
                    <button className="text-xs font-bold text-[#1B6138] hover:underline flex items-center gap-1.5 transition-transform duration-200 hover:translate-x-1">
                        <span>View Conflicts</span>
                        <span>→</span>
                    </button>
                </div>
            </div>

            {/* Upcoming Slots Widget */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Upcoming Slots</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <span className="text-xs font-bold text-gray-700">08:00 PM</span>
                            <span className="rounded-full bg-[#E8F5E9] px-2.5 py-0.5 text-[9px] font-bold text-[#1B6138]">AVAILABLE</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <span className="text-xs font-bold text-gray-700">09:00 PM</span>
                            <span className="rounded-full bg-[#E8F5E9] px-2.5 py-0.5 text-[9px] font-bold text-[#1B6138]">AVAILABLE</span>
                        </div>
                        <div className="flex items-center justify-between pb-1">
                            <span className="text-xs font-bold text-gray-700">10:00 PM</span>
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[9px] font-bold text-gray-500">CLOSED</span>
                        </div>
                    </div>
                </div>

                <button className="mt-6 w-full rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-gray-800 hover:shadow-md transition-all duration-200">
                    MANAGE CALENDAR
                </button>
            </div>

        </div>
    );
}