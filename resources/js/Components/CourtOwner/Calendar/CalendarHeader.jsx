export default function CalendarHeader({ 
    courts = [], 
    selectedCourtId, 
    onCourtChange, 
    currentMonthLabel, 
    onPrevMonth, 
    onNextMonth, 
    onToday 
}) {
    return (
        <div className="space-y-4 mb-6">
            {/* Page Title & Court Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Facility Calendar</h1>
                    <p className="text-xs text-[#71796F] mt-1">Inspect daily scheduled reservations per court facility.</p>
                </div>

                {/* Dropdown Court Selector */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-700">Filter Court:</span>
                    <select
                        value={selectedCourtId}
                        onChange={(e) => onCourtChange(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-[#F8FAF6] px-4 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    >
                        <option value="all">All Courts ({courts.length})</option>
                        {courts.map(court => (
                            <option key={court.id} value={court.id}>
                                {court.name} {court.surface_type ? `(${court.surface_type})` : ''}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Calendar Month Navigation Toolbar */}
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-extrabold text-gray-900">{currentMonthLabel}</h2>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onPrevMonth}
                        className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        ← Prev
                    </button>
                    <button 
                        onClick={onToday}
                        className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Today
                    </button>
                    <button 
                        onClick={onNextMonth}
                        className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}