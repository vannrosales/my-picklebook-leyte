export default function PlayerCourtCard({ court, onSelect }) {
    const courtName = court.name || 'Pickleball Court';
    const surface = court.surface_type || court.type || 'Standard';
    const hourlyRate = Number(court.hourly_rate || court.price || 0);
    const location = court.location || court.address || 'Tacloban City';
    const image = court.img || court.image || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80';
    const status = court.status || 'available';

    return (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group">
            
            {/* Top Image & Floating Status Container */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img 
                    src={image} 
                    alt={courtName} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Surface Tag */}
                <span className="absolute top-3 left-3 rounded-xl bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1B6138] shadow-xs">
                    {surface}
                </span>

                {/* Status Indicator */}
                <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs ${
                    status === 'available' ? 'bg-[#22C55E]' : 'bg-amber-500'
                }`}>
                    {status}
                </span>

                {/* Floating Rating on Image */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl text-white text-[10px] font-bold">
                    <span>⭐</span> 4.9 (Verified)
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-extrabold text-gray-900 group-hover:text-[#1B6138] transition-colors line-clamp-1">
                        {courtName}
                    </h3>
                    <p className="text-xs text-[#71796F] mt-1 flex items-center gap-1">
                        <span>📍</span> {location}
                    </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-[#71796F] uppercase tracking-wider block">Hourly rate</span>
                        <span className="text-lg font-extrabold text-gray-900">
                            ₱{hourlyRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <button
                        onClick={() => onSelect(court)}
                        className="rounded-2xl bg-[#1B6138] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154d2c] hover:shadow-md transition-all duration-200"
                    >
                        Book Slot
                    </button>
                </div>
            </div>
        </div>
    );
}