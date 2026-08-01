export default function UpcomingMatches() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Matches</h3>
                <a href="#" className="text-xs font-semibold text-[#22C55E] hover:underline">View All</a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {/* Match Card 1 */}
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    <div>
                        <div className="relative mb-3 overflow-hidden rounded-xl h-28">
                            <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#EAB308] px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs">TOMORROW</span>
                            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80" alt="Palo Sports Complex" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">Palo Sports Complex</h4>
                        <p className="text-[11px] text-[#71796F]">Court B • Indoor</p>
                        
                        <div className="mt-2.5 flex items-center gap-3 text-[11px] font-medium text-gray-700">
                            <span className="flex items-center gap-1">📅 Oct 25, 2024</span>
                            <span className="flex items-center gap-1">⏰ 08:00 AM</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <button className="flex-1 rounded-xl bg-[#1B6138] py-2 text-xs font-bold text-white hover:bg-[#154d2c] hover:shadow-md transition-all duration-200">
                            View Details
                        </button>
                        <button className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 12h.008v.008H12V12z"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Match Card 2 */}
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    <div>
                        <div className="relative mb-3 overflow-hidden rounded-xl h-28">
                            <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-gray-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs">OCT 28</span>
                            <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=400&q=80" alt="Tacloban City Arena" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">Tacloban City Arena</h4>
                        <p className="text-[11px] text-[#71796F]">Premium Court 1</p>
                        
                        <div className="mt-2.5 flex items-center gap-3 text-[11px] font-medium text-gray-700">
                            <span className="flex items-center gap-1">📅 Oct 28, 2024</span>
                            <span className="flex items-center gap-1">⏰ 06:00 PM</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <button className="flex-1 rounded-xl bg-[#1B6138] py-2 text-xs font-bold text-white hover:bg-[#154d2c] hover:shadow-md transition-all duration-200">
                            View Details
                        </button>
                        <button className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 12h.008v.008H12V12z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}