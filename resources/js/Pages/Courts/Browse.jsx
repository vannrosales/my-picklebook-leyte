import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CourtCardBrowse from '@/Components/Courts/CourtCardBrowse';
import BookingDrawer from '@/Components/Courts/BookingDrawer';

export default function Browse({ auth, courts }) {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Courts');

    // Filter dynamic courts from the database
    const filteredCourts = activeFilter === 'All Courts' 
        ? courts 
        : courts.filter(c => c.type.toLowerCase().includes(activeFilter.toLowerCase()));

    return (
        <>
            <Head title="Browse Courts - PickleBook Tacloban" />
            <div className="min-h-screen bg-[#F8FAF6] text-[#71796F] font-sans flex flex-col justify-between">
                
                {/* Navbar Component */}
                <div className="bg-white border-b border-gray-200">
                    <Navbar auth={auth} />
                </div>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-6 py-10 flex-1 w-full">
                    
                    {/* Header & Filter Pills */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Available Courts</h1>
                            <p className="text-sm text-[#71796F] mt-1">Discover and book the best pickleball spots in Tacloban City.</p>
                        </div>

                        {/* Filter Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            {['All Courts', 'Indoor', 'Outdoor', 'Prime'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all shadow-xs ${
                                        activeFilter === filter
                                            ? 'bg-[#1B6138] text-white shadow-sm'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Courts Grid from Database */}
                    {filteredCourts.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredCourts.map((court) => (
                                <CourtCardBrowse 
                                    key={court.id} 
                                    court={court} 
                                    onSelect={(selected) => setSelectedCourt(selected)} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                            <p className="text-sm font-semibold text-gray-700">No courts found matching this filter.</p>
                            <p className="text-xs text-[#71796F] mt-1">Check back later or try a different filter category.</p>
                        </div>
                    )}

                </main>

                <Footer />

                {/* Booking Drawer Slide-In Modal */}
                {selectedCourt && (
                    <BookingDrawer 
                        court={selectedCourt} 
                        onClose={() => setSelectedCourt(null)} 
                    />
                )}

            </div>
        </>
    );
}