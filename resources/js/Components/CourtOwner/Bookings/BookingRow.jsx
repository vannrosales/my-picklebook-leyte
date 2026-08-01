export default function BookingRow({ booking }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
            
            {/* Customer Info */}
            <div className="flex items-center gap-4 min-w-[220px]">
                <div className="h-10 w-10 rounded-full bg-[#E8F5E9] text-[#1B6138] flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {booking.avatar}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1B6138] transition-colors">{booking.name}</h4>
                    <p className="text-[11px] text-[#71796F]">{booking.membership}</p>
                </div>
            </div>

            {/* Time Slot */}
            <div className="min-w-[180px]">
                <p className="text-xs font-extrabold text-gray-900">{booking.time}</p>
                <p className="text-[10px] text-[#71796F] mt-0.5">{booking.date}</p>
            </div>

            {/* Court # */}
            <div>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-800 transition-colors group-hover:bg-gray-200">
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path></svg>
                    {booking.court}
                </span>
            </div>

            {/* Status Badge */}
            <div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${booking.statusColor}`}>
                    {booking.status}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:shadow-xs transition-all duration-200">
                    Decline
                </button>
                <button className="rounded-xl bg-[#1B6138] px-4 py-2 text-xs font-bold text-white hover:bg-[#154d2c] hover:shadow-md transition-all duration-200">
                    Approve
                </button>
            </div>

        </div>
    );
}