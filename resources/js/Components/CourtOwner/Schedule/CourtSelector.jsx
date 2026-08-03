export default function CourtSelector({ courts, currentCourtId, onChange }) {
    if (!courts || courts.length === 0) return null;

    return (
        <div className="w-full sm:w-64">
            <label className="block text-[10px] font-bold uppercase text-[#71796F] mb-1">Select Venue</label>
            <select 
                value={currentCourtId}
                onChange={(e) => onChange(e.target.value)} 
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-900 shadow-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
            >
                {courts.map(court => (
                    <option key={court.id} value={court.id}>{court.name}</option>
                ))}
            </select>
        </div>
    );
}