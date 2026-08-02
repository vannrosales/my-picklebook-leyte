export default function CourtStatusWidget({ courts = [] }) {
    return (
        <div className="space-y-6">
            
            {/* Court Status Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <h3 className="font-extrabold text-gray-900 mb-4 tracking-tight">Court Status</h3>
                <div className="space-y-3">
                    
                    {courts.length > 0 ? (
                        courts.map((court) => {
                            const courtName = court.name || 'Court';
                            const surfaceType = court.surface_type ? `(${court.surface_type})` : '';
                            const rawStatus = (court.status || 'active').toLowerCase();

                            // Determine color mapping based on status
                            let badgeStyle = 'bg-[#22C55E]/10 text-[#22C55E]';
                            let displayStatus = 'READY';

                            if (rawStatus === 'maintenance' || rawStatus === 'cleaning') {
                                badgeStyle = 'bg-[#FF8B7C]/10 text-[#FF8B7C]';
                                displayStatus = 'MAINTENANCE';
                            } else if (rawStatus === 'in_play' || rawStatus === 'booked') {
                                badgeStyle = 'bg-[#EAB308]/10 text-[#EAB308]';
                                displayStatus = 'IN PLAY';
                            } else if (rawStatus === 'inactive') {
                                badgeStyle = 'bg-gray-200 text-gray-600';
                                displayStatus = 'INACTIVE';
                            }

                            return (
                                <div 
                                    key={court.id} 
                                    className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-200 hover:bg-[#F8FAF6] hover:scale-[1.01] group"
                                >
                                    <span className="text-sm font-semibold text-gray-900 group-hover:text-[#1B6138] transition-colors">
                                        {courtName} <span className="text-xs text-[#71796F] font-normal">{surfaceType}</span>
                                    </span>
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 group-hover:scale-105 ${badgeStyle}`}>
                                        {displayStatus}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-xs text-[#71796F] text-center py-4">No courts found.</p>
                    )}

                </div>
            </div>

            {/* Assistance Card */}
            <div className="rounded-2xl bg-[#1B6138] p-6 text-white shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

                <h3 className="font-extrabold text-lg mb-2 tracking-tight">Need Assistance?</h3>
                <p className="text-xs text-white/80 mb-6 leading-relaxed">
                    Contact the Tacloban admin office for billing or court technical support.
                </p>
                <button className="w-full rounded-xl bg-white py-3 text-xs font-bold text-[#1B6138] shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200">
                    Message Support
                </button>
            </div>

        </div>
    );
}