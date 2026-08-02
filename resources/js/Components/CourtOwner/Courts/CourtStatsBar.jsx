export default function CourtStatsBar({ courts = [] }) {
    const totalCourts = courts.length;
    const activeCourts = courts.filter(c => c.status.toLowerCase() === 'available').ltrim 
    ? courts.filter(c => c.status.toLowerCase() === 'available').length : courts.filter(c => c.status.toLowerCase() === 'available').length;
    const maintenanceCourts = courts.filter(c => c.status.toLowerCase() === 'maintenance').length;

    return (
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Total Venues</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">{totalCourts} {totalCourts === 1 ? 'Court' : 'Courts'}</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Active & Ready</span>
                <div className="text-3xl font-extrabold text-[#22C55E] mt-1">{activeCourts} {activeCourts === 1 ? 'Court' : 'Courts'}</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71796F]">Under Maintenance</span>
                <div className="text-3xl font-extrabold text-[#EAB308] mt-1">{maintenanceCourts} {maintenanceCourts === 1 ? 'Court' : 'Courts'}</div>
            </div>
        </div>
    );
}