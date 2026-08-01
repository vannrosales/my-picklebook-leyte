export default function PlayerStats() {
    return (
        <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* Total Games Played */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-gray-200 relative group">
                <div className="flex justify-between items-center mb-3">
                    <div className="p-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E] transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 00-5.007 0m5.007 0V5.25A2.25 2.25 0 0012.75 3h-1.5a2.25 2.25 0 00-2.25 2.25v10.5m5.007 0H9.497"></path></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F] bg-gray-100 px-2.5 py-1 rounded-full">Monthly</span>
                </div>
                <span className="text-xs font-bold text-[#71796F] uppercase tracking-wider">Total Games Played</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">24 Matches</div>
            </div>

            {/* Upcoming Matches */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-gray-200 relative group">
                <div className="flex justify-between items-center mb-3">
                    <div className="p-2 rounded-xl bg-[#EAB308]/10 text-[#EAB308] transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z"></path></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full">Confirmed</span>
                </div>
                <span className="text-xs font-bold text-[#71796F] uppercase tracking-wider">Upcoming Matches</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">3 Booked</div>
            </div>

            {/* Membership Status */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-gray-200 relative group">
                <div className="flex justify-between items-center mb-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Active</span>
                </div>
                <span className="text-xs font-bold text-[#71796F] uppercase tracking-wider">Membership Status</span>
                <div className="text-2xl font-extrabold text-gray-900 mt-1">Regular Member</div>
            </div>
        </div>
    );
}