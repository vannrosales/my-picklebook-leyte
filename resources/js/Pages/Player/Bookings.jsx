import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlayerSidebar from '@/Components/Player/PlayerSidebar'; 
import { useState } from 'react';

export default function PlayerBookings({ auth, bookings = [] }) {
    const [filter, setFilter] = useState('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const filteredBookings = bookings.filter((booking) => {
        if (filter === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
        if (filter === 'completed') return booking.status === 'completed';
        if (filter === 'cancelled') return booking.status === 'cancelled';
        return true;
    });

    const handleCancel = (bookingId) => {
        if (confirm('Are you sure you want to cancel this booking? The slot will be made available to other players.')) {
            router.delete(route('player.bookings.destroy', bookingId), {
                preserveScroll: true,
            });
        }
    };

    // Helper function to format dates nicely (e.g., "August 2, 2026")
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not specified';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Bookings - PickleBook" />

            <div className="flex min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans">
                
                {/* Sidebar Component */}
                <PlayerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                    
                    {/* Mobile Header Toggle Bar */}
                    <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#22C55E]">Player Portal</span>
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
                        
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
                                    Player Portal
                                </span>
                                <h1 className="text-2xl font-extrabold text-gray-900 mt-2 tracking-tight">
                                    My Court Reservations
                                </h1>
                                <p className="text-xs text-[#71796F] mt-1">
                                    Track your upcoming matches, view schedules, and manage past bookings.
                                </p>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-xs self-start">
                                {['all', 'upcoming', 'completed', 'cancelled'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setFilter(tab)}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                                            filter === tab
                                                ? 'bg-[#1B6138] text-white shadow-xs'
                                                : 'text-[#71796F] hover:text-gray-900'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bookings List / Grid */}
                        {filteredBookings.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredBookings.map((booking) => {
                                    const statusColors = {
                                        confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                                        pending: 'bg-amber-50 text-amber-700 border-amber-200',
                                        completed: 'bg-blue-50 text-blue-700 border-blue-200',
                                        cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
                                    };


                                    const bookingDate = booking.booking_date || booking.date || booking.schedule_date || booking.time_slot?.date;
                                    const startTime = booking.time_slot?.start_time || booking.start_time;
                                    const endTime = booking.time_slot?.end_time || booking.end_time;

                                    return (
                                        <div
                                            key={booking.id}
                                            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:border-gray-200 relative overflow-hidden"
                                        >
                                            {/* Top Accent Stripe */}
                                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1B6138]"></div>

                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${statusColors[booking.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                        {booking.status}
                                                    </span>
                                                    <span className="text-sm font-extrabold text-[#1B6138]">
                                                        ₱{Number(booking.total_price || booking.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>

                                                <h3 className="font-extrabold text-gray-900 text-lg mb-1 tracking-tight">
                                                    {booking.court?.name || 'Pickleball Court'}
                                                </h3>
                                                <p className="text-xs text-[#71796F] mb-5 flex items-center gap-1">
                                                    <span>📍</span> {booking.court?.location || 'Location unavailable'}
                                                </p>

                                                <div className="space-y-2.5 text-xs text-gray-700 bg-[#F8FAF6] p-4 rounded-2xl border border-[#1B6138]/10 mb-6">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[#71796F] font-medium">Reservation Date</span>
                                                        <span className="font-bold text-gray-900">{formatDate(bookingDate)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-t border-gray-200/60 pt-2">
                                                        <span className="text-[#71796F] font-medium">Time Slot</span>
                                                        <span className="font-bold text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded-md">
                                                            {startTime && endTime ? `${startTime} - ${endTime}` : (startTime || 'Time not specified')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <span className="text-[11px] text-gray-400">
                                                    Booked on {formatDate(booking.created_at)}
                                                </span>
                                                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                                    <button
                                                        onClick={() => handleCancel(booking.id)}
                                                        className="text-xs font-bold text-rose-600 hover:text-white transition-all bg-rose-50 hover:bg-rose-600 px-3.5 py-1.5 rounded-xl border border-rose-100 shadow-xs"
                                                    >
                                                        Cancel Reservation
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto">
                                <div className="w-12 h-12 bg-emerald-50 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                                    📅
                                </div>
                                <h3 className="font-extrabold text-gray-900 text-base">No bookings found</h3>
                                <p className="text-xs text-[#71796F] mt-1 mb-6">
                                    You haven't made any reservations under this filter category yet.
                                </p>
                                <a
                                    href={route('courts.browse')}
                                    className="inline-block rounded-xl bg-[#1B6138] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154d2c] transition-all"
                                >
                                    Browse Courts & Book Now
                                </a>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}