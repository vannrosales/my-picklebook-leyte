export default function CourtCard({ name, location, price, rating, img }) {
    return (
        <div className="group rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
            <div>
                <div className="relative mb-4 overflow-hidden rounded-xl h-40">
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-[#22C55E] px-2.5 py-1 text-xs font-bold text-white shadow-sm">Available Now</span>
                    <img 
                        src={img} 
                        alt={name} 
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                    />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#22C55E] transition-colors duration-200">{name}</h3>
                <p className="text-xs text-[#71796F] mt-1">📍 {location}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                    <span className="text-sm font-bold text-gray-900">{price}</span>
                    <div className="text-xs text-[#EAB308]">★ {rating}</div>
                </div>
                <button className="rounded-lg bg-[#22C55E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1eb053] hover:shadow-sm transition-all duration-200">
                    Book
                </button>
            </div>
        </div>
    );
}