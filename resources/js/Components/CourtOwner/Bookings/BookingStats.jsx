export default function BookingStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Total Requests</span>
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-gray-900">24</span>
                    <span className="text-xs font-bold text-[#22C55E]">+12%</span>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Pending Today</span>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-3xl font-extrabold text-gray-900">08</span>
                    <span className="text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-2.5 py-1 rounded-full">Action Req.</span>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Court Utilization</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">84%</div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Rev. Projection</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">₱12.4k</div>
            </div>
        </div>
    );
}