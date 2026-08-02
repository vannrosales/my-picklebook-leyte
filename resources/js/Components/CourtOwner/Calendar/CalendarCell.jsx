export default function CalendarCell({ cell }) {
    if (cell.type === 'empty') {
        return <div className="min-h-[120px] bg-gray-50/30 p-2"></div>;
    }

    const { dayNumber, bookings = [] } = cell;
    const hasBookings = bookings.length > 0;

    return (
        <div className={`min-h-[130px] p-2 sm:p-3 flex flex-col transition-colors ${
            hasBookings ? 'bg-[#F8FAF6]/60 hover:bg-[#E8F5E9]/20' : 'bg-white hover:bg-gray-50/50'
        }`}>
            <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-extrabold ${hasBookings ? 'text-[#1B6138]' : 'text-gray-700'}`}>
                    {dayNumber}
                </span>
                {hasBookings && (
                    <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">
                        {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
                    </span>
                )}
            </div>

            {/* Bookings Stack inside cell */}
            <div className="space-y-1.5 overflow-y-auto max-h-[90px] pr-1">
                {bookings.map((b) => {
                    const customerName = b.customer?.fullname || b.customer?.name || 'Guest User';
                    const courtLabel = b.court?.name || 'Court';
                    const startTime = b.time_slot?.start_time || b.start_time || '';
                    const endTime = b.time_slot?.end_time || b.end_time || '';
                    const timeDisplay = startTime ? `${startTime}${endTime ? ` - ${endTime}` : ''}` : '';

                    return (
                        <div 
                            key={b.id} 
                            className="rounded-lg bg-white p-1.5 border border-[#22C55E]/20 shadow-2xs text-[10px] leading-tight"
                        >
                            <p className="font-extrabold text-gray-900 truncate">{customerName}</p>
                            <div className="flex items-center justify-between text-[#71796F] mt-0.5">
                                <span className="font-semibold text-[#1B6138]">{courtLabel}</span>
                                {timeDisplay && <span className="font-bold">{timeDisplay}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}