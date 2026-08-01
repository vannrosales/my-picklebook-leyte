export default function RecentActivityTable() {
    const activities = [
        { user: 'Juan Dela Cruz', court: 'Court A (Indoor)', time: '09:00 AM', amount: '₱800.00', status: 'CONFIRMED' },
        { user: 'Maria Santos', court: 'Court B (Premium)', time: '10:30 AM', amount: '₱1,200.00', status: 'PENDING' },
        { user: 'Roberto Lim', court: 'Court A (Indoor)', time: '01:00 PM', amount: '₱800.00', status: 'CONFIRMED' },
        { user: 'Elena Vizcarra', court: 'Court C (Rooftop)', time: '04:00 PM', amount: '₱950.00', status: 'CONFIRMED' },
        { user: 'Dave Puno', court: 'Court B (Premium)', time: '07:00 PM', amount: '₱1,200.00', status: 'PENDING' },
    ];

    return (
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 tracking-tight">Recent Activity</h3>
                <a href="#" className="text-xs font-semibold text-[#22C55E] hover:underline transition-colors">View All</a>
            </div>

            {/* Table Container without scroll wrappers */}
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
                        {activities.map((item, idx) => (
                            <tr 
                                key={idx} 
                                className="transition-all duration-200 hover:bg-[#F8FAF6]/80 hover:scale-[1.002] group"
                            >
                                <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110">
                                        {item.user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="group-hover:text-[#1B6138] transition-colors">{item.user}</span>
                                </td>
                                <td className="py-4 px-6 text-[#71796F] font-medium">{item.court}</td>
                                <td className="py-4 px-6 text-[#71796F]">{item.time}</td>
                                <td className="py-4 px-6 font-bold text-gray-900">{item.amount}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 group-hover:scale-105 ${
                                        item.status === 'CONFIRMED' 
                                            ? 'bg-[#22C55E]/10 text-[#22C55E]' 
                                            : 'bg-[#EAB308]/10 text-[#EAB308]'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}