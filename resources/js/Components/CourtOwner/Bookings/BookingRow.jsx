
const formatTo12Hour = (timeString) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length < 2) return timeString;
    
    let hour = parseInt(parts[0], 10);
    const minute = parts[1];
    const period = hour >= 12 ? 'PM' : 'AM';
    
    hour = hour % 12 || 12; 
    return `${String(hour).padStart(2, '0')}:${minute} ${period}`;
};

export default function BookingRow({ booking }) {
   
    const formatScheduleTime = (timeStr) => {
        if (!timeStr) return 'N/A';
        if (timeStr.includes('-')) {
            const [start, end] = timeStr.split('-').map(t => t.trim());
            return `${formatTo12Hour(start)} - ${formatTo12Hour(end)}`;
        }
        return formatTo12Hour(timeStr);
    };

    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md">
            
            {/* Left: Customer Info */}
            <div className="flex items-center gap-3.5 flex-1">
                <div className="h-11 w-11 rounded-2xl bg-[#E8F5E9] text-[#1B6138] flex items-center justify-center font-extrabold text-xs shrink-0">
                    {booking.avatar}
                </div>
                <div>
                    <h4 className="text-sm font-extrabold text-gray-900">{booking.name}</h4>
                    <p className="text-[11px] text-[#71796F] font-medium">{booking.membership}</p>
                </div>
            </div>

            {/* Middle: Details Group (Time & Court) */}
            <div className="flex flex-wrap items-center gap-6 lg:border-x lg:border-gray-100 lg:px-6">
                <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-0.5">Schedule</span>
                    <p className="text-xs font-extrabold text-gray-900">{formatScheduleTime(booking.time)}</p>
                    <p className="text-[10px] text-[#71796F]">{booking.date}</p>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-0.5">Facility</span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-800 border border-gray-100">
                        {booking.court}
                    </span>
                </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                <span className={`rounded-xl px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${booking.statusColor}`}>
                    {booking.status}
                </span>
            </div>

        </div>
    );
}