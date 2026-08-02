import CalendarCell from './CalendarCell';

export default function CalendarGrid({ calendarCells }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Days of the Week Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50 text-center text-[11px] font-extrabold uppercase text-[#71796F] tracking-wider py-3">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>

            {/* Days Matrix Grid */}
            <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-gray-100">
                {calendarCells.map((cell) => (
                    <CalendarCell key={cell.id} cell={cell} />
                ))}
            </div>
        </div>
    );
}