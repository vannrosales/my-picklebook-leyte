import { Link } from '@inertiajs/react';

export default function RecentActivityTable({ bookings = [] }) {
    return (
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 tracking-tight">Recent Activity</h3>
                <Link 
                    href={route('dashboard')} 
                    className="text-xs font-semibold text-[#22C55E] hover:underline transition-colors"
                >
                    View All
                </Link>
            </div>

            {/* Table Container */}
            <div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-[11px] font-bold text-[#71796F] uppercase tracking-wider bg-gray-50/50">
                            <th className="py-3.5 px-6">User</th>
                            <th className="py-3.5 px-6">Court</th>
                            <th className="py-3.5 px-6">Time</th>
                            <th className="py-3.5 px-6">Amount</th>
                            <th className="py-3.5 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {bookings.length > 0 ? (
                            bookings.slice(0, 5).map((item) => {
                                const userName = item.customer?.fullname || 'Guest User';
                                const courtName = item.court?.name || 'Pickleball Court';
                                const startTime = item.time_slot?.start_time || item.start_time || 'N/A';
                                const endTime = item.time_slot?.end_time || item.end_time || '';
                                const amount = Number(item.total_amount || 0);
                                const status = (item.status || 'pending').toUpperCase();

                                return (
                                    <tr 
                                        key={item.id} 
                                        className="transition-all duration-200 hover:bg-[#F8FAF6]/80 hover:scale-[1.002] group"
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110">
                                                {userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                            </div>
                                            <span className="group-hover:text-[#1B6138] transition-colors">{userName}</span>
                                        </td>
                                        <td className="py-4 px-6 text-[#71796F] font-medium">{courtName}</td>
                                        <td className="py-4 px-6 text-[#71796F]">
                                            {startTime} {endTime ? `- ${endTime}` : ''}
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-900">
                                            ₱{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 group-hover:scale-105 ${
                                                status === 'CONFIRMED' || status === 'COMPLETED'
                                                    ? 'bg-[#22C55E]/10 text-[#22C55E]' 
                                                    : status === 'CANCELLED'
                                                    ? 'bg-rose-50 text-rose-600'
                                                    : 'bg-[#EAB308]/10 text-[#EAB308]'
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-xs text-[#71796F]">
                                    No recent activity found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}