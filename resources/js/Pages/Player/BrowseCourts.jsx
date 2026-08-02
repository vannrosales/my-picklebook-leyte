import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlayerSidebar from '@/Components/Player/PlayerSidebar';
import PlayerBrowseHeader from '@/Components/Player/Browse/PlayerBrowseHeader';
import PlayerCourtCard from '@/Components/Player/Browse/PlayerCourtCard';
import BookingDrawer from '@/Components/Courts/BookingDrawer';

export default function BrowseCourts({ auth, courts = [] }) {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Courts');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter dynamic courts from database based on category tab and search input query
    const filteredCourts = courts.filter((court) => {
        const typeMatch = activeFilter === 'All Courts' 
            || (court.surface_type || court.type || '').toLowerCase().includes(activeFilter.toLowerCase());

        const query = searchQuery.toLowerCase();
        const nameMatch = (court.name || '').toLowerCase().includes(query);
        const locationMatch = (court.location || court.address || '').toLowerCase().includes(query);

        return typeMatch && (nameMatch || locationMatch);
    });

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Browse Courts - Player Portal" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                
                

                {/* Main View Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    
                    {/* Mobile Menu Toggle Button */}
                    <div className="mb-4 md:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-gray-800 shadow-sm border border-gray-200"
                        >
                            <span>☰</span> Open Menu
                        </button>
                    </div>

                    {/* Header with Search and Filter Tabs */}
                    <PlayerBrowseHeader 
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Courts Grid from Real Database Data */}
                    {filteredCourts.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredCourts.map((court) => (
                                <PlayerCourtCard 
                                    key={court.id} 
                                    court={court} 
                                    onSelect={(courtData) => setSelectedCourt(courtData)} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                            <p className="text-sm font-bold text-gray-800">No courts found matching your search criteria.</p>
                            <p className="text-xs text-[#71796F] mt-1">Try searching a different keyword or switching filter tabs.</p>
                        </div>
                    )}

                </main>
            </div>

            {/* Booking Drawer Slide-In Modal */}
            {selectedCourt && (
                <BookingDrawer 
                    court={selectedCourt} 
                    onClose={() => setSelectedCourt(null)} 
                />
            )}
        </AuthenticatedLayout>
    );
}