export default function StatsOverview() {
    return (
        <div className="grid gap-6 md:grid-cols-3 mb-8">
            
            {/* Total Revenue */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-[#71796F]">Total Revenue</span>
                    <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-0.5 text-xs font-bold text-[#22C55E] transition-transform duration-300 group-hover:scale-105">+12%</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 group-hover:text-[#1B6138] transition-colors">₱15,200</div>
                <p className="text-xs text-[#71796F] mt-1">vs last 30 days</p>
            </div>

            {/* Active Bookings */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-[#71796F]">Active Bookings</span>
                    <span className="text-xs font-semibold text-[#71796F] bg-gray-100 px-2 py-0.5 rounded-full transition-colors group-hover:bg-[#22C55E]/10 group-hover:text-[#22C55E]">12 Active</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 group-hover:text-[#1B6138] transition-colors">12</div>
                <p className="text-xs text-[#71796F] mt-1">Currently scheduled today</p>
            </div>

            {/* Court Utilization */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-[#71796F]">Court Utilization</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#22C55E] h-1.5 rounded-full transition-all duration-500 group-hover:w-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 group-hover:text-[#1B6138] transition-colors">85%</div>
                <p className="text-xs text-[#71796F] mt-1">Optimized court hours</p>
            </div>

        </div>
    );
}