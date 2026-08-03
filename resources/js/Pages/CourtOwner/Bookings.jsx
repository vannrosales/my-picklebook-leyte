import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookingStats from '@/Components/CourtOwner/Bookings/BookingStats';
import BookingRow from '@/Components/CourtOwner/Bookings/BookingRow';
import BookingInsights from '@/Components/CourtOwner/Bookings/BookingInsights';
import { formatBookingRowData } from '@/utils/bookingFormatters';

export default function Bookings({ auth, bookings = [], insights = {}, stats = {} }) {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    // Handle pagination slices based on filtered results
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Handlers for updating status via backend route
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
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setCurrentPage(1);
                                    }}
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
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search customer or court..." 
                                    className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bookings List Rendered via BookingRow Component */}
                    <div className="space-y-4">
                        {paginatedBookings.length > 0 ? (
                            paginatedBookings.map((booking) => (
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

                    {/* Pagination Controls Bar */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm gap-4 mt-6">
                            <span className="text-xs text-[#71796F]">
                                Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredBookings.length)}</span> of <span className="font-bold text-gray-900">{filteredBookings.length}</span> entries
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>

                                <span className="text-xs font-bold text-gray-800 px-3">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8">
                        <BookingInsights insights={insights} />
                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}