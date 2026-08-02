import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlayerSidebar from '@/Components/Player/PlayerSidebar';
import PlayerStats from '@/Components/Player/PlayerStats';
import UpcomingMatches from '@/Components/Player/UpcomingMatches';
import RecentHistoryWidget from '@/Components/Player/RecentHistoryWidget';
import QuickBookCard from '@/Components/Player/QuickBookCard';
import ProProgressCard from '@/Components/Player/ProProgressCard';

export default function PlayerDashboard({ auth }) {
    
    const userName = auth.user?.fullname || auth.user?.name || 'Carlos';

    return (
        <AuthenticatedLayout>
            <Head title="Player Center Dashboard" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">
                
                

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden w-full">
                    
                   
                    {/* Greeting Header */}
                    <div className="mb-8">
                        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Hello, {userName}! Ready for your next match?
                        </h1>
                        <p className="text-xs text-[#71796F] mt-1 font-medium">Tacloban City • Thursday, Oct 24</p>
                    </div>

                    {/* Stats Overview Cards */}
                    <PlayerStats />

                    {/* Middle Section */}
                    <div className="grid gap-8 lg:grid-cols-3 mb-8 items-start">
                        <div className="lg:col-span-2">
                            <UpcomingMatches />
                        </div>
                        <div>
                            <RecentHistoryWidget />
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid gap-8 lg:grid-cols-3 items-center">
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Quick Book Near You</h3>
                                <Link href={route('courts.browse')} className="text-xs font-semibold text-[#22C55E] hover:underline">Explore All</Link>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <QuickBookCard 
                                    court={{
                                        name: 'Downtown Courts',
                                        status: 'Available Now',
                                        badgeColor: 'text-[#22C55E]',
                                        price: '₱450',
                                        img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=200&q=80'
                                    }} 
                                />
                                <QuickBookCard 
                                    court={{
                                        name: 'The Hub Sports',
                                        status: 'Prime Time',
                                        badgeColor: 'text-[#EAB308]',
                                        price: '₱600',
                                        img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=200&q=80'
                                    }} 
                                />
                            </div>
                        </div>

                        <div>
                            <ProProgressCard />
                        </div>
                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}