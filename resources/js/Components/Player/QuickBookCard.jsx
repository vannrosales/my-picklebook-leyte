import { Link } from '@inertiajs/react';

export default function QuickBookCard({ court }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-xl w-14 h-14 shrink-0">
                    <img 
                        src={court.img} 
                        alt={court.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#22C55E] transition-colors">{court.name}</h4>
                    <p className={`text-[10px] font-semibold mt-0.5 ${court.badgeColor}`}>{court.status}</p>
                    <p className="text-xs font-extrabold text-gray-800 mt-1">
                        {court.price}<span className="text-[10px] font-normal text-[#71796F]">/hr</span>
                    </p>
                </div>
            </div>
            <Link 
                href={route('courts.browse')} 
                className="rounded-xl bg-[#1B6138] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#154d2c] hover:shadow-md transition-all duration-200 shrink-0"
            >
                Book
            </Link>
        </div>
    );
}