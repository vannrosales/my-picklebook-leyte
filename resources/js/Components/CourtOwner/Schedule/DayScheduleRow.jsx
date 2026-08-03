export default function DayScheduleRow({ day, dayConfig, onToggle, onChange }) {
    return (
        <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8FAF6]/60 transition-colors">
            
            {/* Day Name & Toggle */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${dayConfig.is_open ? 'bg-[#22C55E]' : 'bg-gray-300'}`}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${dayConfig.is_open ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className="font-extrabold text-sm text-gray-900 w-28">{day}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${dayConfig.is_open ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-gray-100 text-gray-400'}`}>
                    {dayConfig.is_open ? 'Open' : 'Closed'}
                </span>
            </div>

            {/* Time Pickers */}
            {dayConfig.is_open ? (
                <div className="flex items-center gap-3">
                    {/* Opening */}
                    <div>
                        <span className="block text-[9px] font-bold uppercase text-[#71796F] mb-0.5">Opening</span>
                        <div className="flex items-center gap-1">
                            <input 
                                type="time" 
                                value={dayConfig.opening_time}
                                onChange={(e) => onChange(day, 'opening_time', e.target.value)}
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                            />
                            <select
                                value={dayConfig.opening_period}
                                onChange={(e) => onChange(day, 'opening_period', e.target.value)}
                                className="rounded-xl border border-gray-200 px-2 py-1.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    <span className="text-gray-400 mt-4">to</span>

                    {/* Closing */}
                    <div>
                        <span className="block text-[9px] font-bold uppercase text-[#71796F] mb-0.5">Closing</span>
                        <div className="flex items-center gap-1">
                            <input 
                                type="time" 
                                value={dayConfig.closing_time}
                                onChange={(e) => onChange(day, 'closing_time', e.target.value)}
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                            />
                            <select
                                value={dayConfig.closing_period}
                                onChange={(e) => onChange(day, 'closing_period', e.target.value)}
                                className="rounded-xl border border-gray-200 px-2 py-1.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-xs text-gray-400 italic font-medium py-2">No operating hours set</div>
            )}

        </div>
    );
}