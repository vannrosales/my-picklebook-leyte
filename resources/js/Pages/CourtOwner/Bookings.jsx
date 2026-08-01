import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/CourtOwner/Sidebar';
import BookingStats from '@/Components/CourtOwner/Bookings/BookingStats';
import BookingRow from '@/Components/CourtOwner/Bookings/BookingRow';
import BookingInsights from '@/Components/CourtOwner/Bookings/BookingInsights';

export default function Bookings({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Pending');

    const bookings = [
        { avatar: 'RM', name: 'Ricardo Mercado', membership: 'Member • 12 bookings', time: '04:00 PM - 05:30 PM', date: 'TODAY, OCT 24', court: 'Court #02', status: 'PENDING APPROVAL', statusColor: 'bg-[#FEF3C7] text-[#B45309]' },
        { avatar: 'SA', name: 'Sofia Abad', membership: 'Guest • First time', time: '06:00 PM - 07:00 PM', date: 'TODAY, OCT 24', court: 'Court #04', status: 'PENDING APPROVAL', statusColor: 'bg-[#FEF3C7] text-[#B45309]' },
        { avatar: 'LC', name: 'Liam Castillo', membership: 'Member • 5 bookings', time: '07:30 PM - 09:00 PM', date: 'TODAY, OCT 24', court: 'Court #01', status: 'PRIME TIME', statusColor: 'bg-[#E8F5E9] text-[#1B6138]' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Booking Management - Court Owner" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                
                {/* Responsive Sidebar */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    
                    {/* Mobile Menu Toggle */}
                    <div className="mb-4 md:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-gray-800 shadow-sm border border-gray-200"
                        >
                            <span>☰</span> Open Menu
                        </button>
                    </div>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Booking Management</h1>
                    </div>

                    {/* Stats Overview Cards */}
                    <BookingStats />

                    {/* Tabs and Filter Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {['Pending', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        activeTab === tab
                                            ? 'bg-[#1B6138] text-white shadow-sm'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search customer or court..." 
                                    className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                                />
                            </div>
                            <button className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50">
                                ⚙️
                            </button>
                        </div>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                        {bookings.map((booking, idx) => (
                            <BookingRow key={idx} booking={booking} />
                        ))}
                    </div>

                    {/* Bottom Summary & Insights Widget */}
                    <BookingInsights />

                </main>
            </div>
        </AuthenticatedLayout>
    );
}