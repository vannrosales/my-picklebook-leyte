import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import BookingStats from '@/Components/CourtOwner/Bookings/BookingStats';
import BookingRow from '@/Components/CourtOwner/Bookings/BookingRow';
import BookingInsights from '@/Components/CourtOwner/Bookings/BookingInsights';

export default function Bookings({ auth, bookings = [], insights = {}, stats = {} }) {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Pending', 'Upcoming', 'Completed', 'Cancelled'];

    // Filter real database bookings based on tab and search keyword
    const filteredBookings = bookings.filter((item) => {
        const status = (item.status || '').toLowerCase();
        
        let matchesTab = true;
        if (activeTab === 'Pending') matchesTab = status === 'pending';
        if (activeTab === 'Upcoming') matchesTab = status === 'confirmed';
        if (activeTab === 'Completed') matchesTab = status === 'completed';
        if (activeTab === 'Cancelled') matchesTab = status === 'cancelled';

        const customerName = (item.customer?.fullname || item.customer?.name || '').toLowerCase();
        const courtName = (item.court?.name || '').toLowerCase();
        const query = searchQuery.toLowerCase();
        const matchesSearch = customerName.includes(query) || courtName.includes(query);

        return matchesTab && matchesSearch;
    });

    // Handlers for updating status via backend route (e.g., /bookings/{id}/status)
    const handleApprove = (bookingId) => {
        router.put(route('bookings.update-status', bookingId), { status: 'confirmed' }, {
            preserveScroll: true,
        });
    };

    const handleDecline = (bookingId) => {
        router.put(route('bookings.update-status', bookingId), { status: 'cancelled' }, {
            preserveScroll: true,
        });
    };

    const formatBookingRowData = (booking) => {
        const customerName = booking.customer?.fullname || booking.customer?.name || 'Guest User';
        const initials = customerName.split(' ').map(n => n[0]).join('').substring(0, 2);
        const courtName = booking.court?.name || 'Assigned Court';
        const startTime = booking.time_slot?.start_time || booking.start_time || 'N/A';
        const endTime = booking.time_slot?.end_time || booking.end_time || '';
        const timeStr = endTime ? `${startTime} - ${endTime}` : startTime;
        const rawStatus = (booking.status || 'pending').toUpperCase();

        let statusText = rawStatus;
        let statusColor = 'bg-[#FEF3C7] text-[#B45309]';

        if (rawStatus === 'CONFIRMED') {
            statusText = 'CONFIRMED';
            statusColor = 'bg-[#E8F5E9] text-[#1B6138]';
        } else if (rawStatus === 'COMPLETED') {
            statusText = 'COMPLETED';
            statusColor = 'bg-blue-50 text-blue-600';
        } else if (rawStatus === 'CANCELLED') {
            statusText = 'CANCELLED';
            statusColor = 'bg-rose-50 text-rose-600';
        }

        return {
            id: booking.id,
            avatar: initials,
            name: customerName,
            membership: `₱${Number(booking.total_amount || 0).toLocaleString()} • Total`,
            time: timeStr,
            date: new Date(booking.created_at).toLocaleDateString(),
            court: courtName,
            status: statusText,
            statusColor: statusColor
        };
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Booking Management - Court Owner" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    

                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Booking Management</h1>
                    </div>

                    <BookingStats stats={stats}/>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {tabs.map((tab) => (
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

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search customer or court..." 
                                    className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bookings List Rendered via BookingRow Component */}
                    <div className="space-y-4">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <BookingRow 
                                    key={booking.id} 
                                    booking={formatBookingRowData(booking)} 
                                    onApprove={handleApprove}
                                    onDecline={handleDecline}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-xs text-[#71796F]">
                                No bookings found under "{activeTab}".
                            </div>
                        )}
                    </div>

                    <BookingInsights insights={insights} />

                </main>
            </div>
        </AuthenticatedLayout>
    );
}