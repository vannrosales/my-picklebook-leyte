import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CourtCardBrowse from '@/Components/Courts/CourtCardBrowse';
import BookingDrawer from '@/Components/Courts/BookingDrawer';

export default function Browse({ auth }) {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Courts');

    const courts = [
        { name: 'Pickleball Hub Tacloban', type: 'Indoor', location: 'Tacloban Bypass Road, Tacloban City', price: '₱350', rating: '4.9', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80' },
        { name: 'EVRGC Court', type: 'Outdoor', location: 'Real Street Extension, Tacloban City', price: '₱280', rating: '4.7', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80' },
        { name: 'Downtown Smash Arena', type: 'Prime Indoor', location: 'Downtown, Tacloban City', price: '₱400', rating: '4.9', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80' },
        { name: 'Leyte Sports Complex', type: 'Outdoor', location: 'Sta. Cruz, Tacloban City', price: '₱250', rating: '4.5', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
        { name: 'V&G Community Court', type: 'Outdoor', location: 'V&G Subdivision, Tacloban City', price: '₱250', rating: '4.6', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
        { name: 'San Jose Smash', type: 'Indoor', location: 'San Jose, Tacloban City', price: '₱320', rating: '4.8', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80' },
    ];

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
                            {['All Courts', 'Indoor', 'Outdoor', 'Prime Indoor'].map((filter) => (
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

                    {/* Courts Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCourts.map((court, idx) => (
                            <CourtCardBrowse 
                                key={idx} 
                                court={court} 
                                onSelect={(selected) => setSelectedCourt(selected)} 
                            />
                        ))}
                    </div>

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