export default function CourtCard({ court, onEdit, onDelete }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div>
                {/* Court Image Preview */}
                <div className="relative mb-4 overflow-hidden rounded-xl h-36">
                    <span className={`absolute top-2.5 left-2.5 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs ${court.statusBadgeColor}`}>
                        {court.status.toUpperCase()}
                    </span>
                    <img 
                        src={court.image} 
                        alt={court.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                </div>

                <h4 className="font-extrabold text-gray-900 text-base group-hover:text-[#1B6138] transition-colors">{court.name}</h4>
                <p className="text-xs text-[#71796F] mt-0.5">{court.surfaceType}</p>
                
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-[#71796F] uppercase tracking-wider block font-bold">Hourly Rate</span>
                        <span className="text-lg font-black text-gray-900">{court.rate}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-[#71796F] uppercase tracking-wider block font-bold">Utilization</span>
                        <span className="text-sm font-extrabold text-[#22C55E]">{court.utilization}</span>
                    </div>
                </div>
            </div>

            {/* Actions: Edit & Delete */}
            <div className="mt-6 flex items-center gap-2">
                <button 
                    onClick={() => onEdit(court)}
                    className="flex-1 rounded-xl bg-[#1B6138] py-2.5 text-xs font-bold text-white hover:bg-[#154d2c] hover:shadow-md transition-all duration-200"
                >
                    Edit Court
                </button>
                <button 
                    onClick={() => onDelete(court.id)}
                    className="rounded-xl border border-red-200 bg-white p-2.5 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                    title="Delete Court"
                >
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                </button>
            </div>
        </div>
    );
}