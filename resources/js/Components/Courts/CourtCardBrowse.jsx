export default function CourtCardBrowse({ court, onSelect }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
                <div className="relative mb-4 overflow-hidden rounded-xl h-48">
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-[#22C55E]/90 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                        {court.type}
                    </span>
                    <img 
                        src={court.img} 
                        alt={court.name} 
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-base">{court.name}</h3>
                    <span className="text-xs font-bold text-[#EAB308] flex items-center gap-1">★ {court.rating}</span>
                </div>
                <p className="text-xs text-[#71796F] mt-1">📍 {court.location}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                    <span className="text-base font-extrabold text-gray-900">{court.price}</span>
                    <span className="text-xs text-[#71796F]"> / hr</span>
                </div>
                <button 
                    onClick={() => onSelect(court)}
                    className="rounded-xl bg-[#1B6138] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#154d2c] shadow-sm transition-all"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}