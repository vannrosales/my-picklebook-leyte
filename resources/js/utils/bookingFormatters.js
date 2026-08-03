/**
 * Transforms a raw booking record into a formatted object ready for BookingRow consumption.
 */
export function formatBookingRowData(booking) {
    const customerName = booking.customer?.fullname || booking.customer?.name || 'Guest User';
    const initials = customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const courtName = booking.court?.name || 'Assigned Court';
    const startTime = booking.time_slot?.start_time || booking.start_time || 'N/A';
    const endTime = booking.time_slot?.end_time || booking.end_time || '';
    const timeStr = endTime ? `${startTime} - ${endTime}` : startTime;
    const rawStatus = (booking.status || 'pending').toUpperCase();

    let statusText = rawStatus;
    let statusColor = 'bg-[#FEF3C7] text-[#B45309]'; // Pending default

    if (rawStatus === 'CONFIRMED') {
        statusText = 'CONFIRMED';
        statusColor = 'bg-[#E8F5E9] text-[#1B6138]';
    } else if (rawStatus === 'COMPLETED') {
        statusText = 'COMPLETED';
        statusColor = 'bg-blue-50 text-blue-600';
    } else if (rawStatus === 'CANCELLED') {
        statusText = 'CANCELLED';
        statusColor = 'bg-rose-50 text-rose-600';
    }

    return {
        id: booking.id,
        avatar: initials,
        name: customerName,
        membership: `₱${Number(booking.total_amount || 0).toLocaleString()} • Total`,
        time: timeStr,
        date: new Date(booking.created_at).toLocaleDateString(),
        court: courtName,
        status: statusText,
        statusColor: statusColor
    };
}