export default function PlayerBrowseHeader({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
    const filters = ['All Courts', 'Indoor', 'Outdoor', 'Prime'];

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 mb-8">
            <div>
                <span className="inline-block rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-extrabold text-[#1B6138] uppercase tracking-wider mb-2">
                    PLAYER DISCOVERY
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Explore & Reserve Courts</h1>
                <p className="text-xs text-[#71796F] mt-1">Find available pickleball courts, check real-time slots, and book your games instantly.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search court name or location..." 
                        className="w-full sm:w-64 rounded-2xl border border-gray-200 bg-[#F8FAF6] px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                    />
                </div>

                {/* Filter Badges */}
                <div className="flex items-center gap-1.5 bg-[#F8FAF6] p-1 rounded-2xl border border-gray-200 overflow-x-auto">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeFilter === filter
                                    ? 'bg-[#1B6138] text-white shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}