import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/CourtOwner/Sidebar';
import StatsOverview from '@/Components/CourtOwner/StatsOverview';
import RecentActivityTable from '@/Components/CourtOwner/RecentActivityTable';
import CourtStatusWidget from '@/Components/CourtOwner/CourtStatusWidget';

export default function Dashboard({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Court Owner Dashboard" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                
                {/* Sidebar Component with mobile toggle control */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    
                    {/* Mobile Sidebar Toggle Button */}
                    <div className="mb-4 md:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm border border-gray-200"
                        >
                            <span>☰</span> Open Menu
                        </button>
                    </div>

                    {/* Top Overview Banner & Emergency Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Overview</h1>
                            <p className="text-xs text-[#71796F] mt-1">Manage your courts and track performance.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 bg-[#F8FAF6] px-4 py-2.5 rounded-xl border border-gray-200">
                            <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                                EMERGENCY CLOSURE
                            </span>
                            <span className="text-[10px] text-[#71796F] hidden sm:inline">Courts are currently ACTIVE</span>
                            <input type="checkbox" className="toggle accent-[#22C55E] cursor-pointer" />
                        </div>
                    </div>

                    {/* Stats Overview Cards Component */}
                    <StatsOverview />

                    {/* Grid Layout for Table and Status Widget */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 overflow-x-auto">
                            <RecentActivityTable />
                        </div>
                        <div>
                            <CourtStatusWidget />
                        </div>
                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}