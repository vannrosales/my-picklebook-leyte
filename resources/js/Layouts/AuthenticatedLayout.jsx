import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/CourtOwner/Sidebar';
import PlayerSidebar from '@/Components/Player/PlayerSidebar';
import Alert from '@/Components/Alert';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isOwner = user?.role === 'court_owner';
    const dashboardRoute = isOwner ? route('dashboard') : route('player.dashboard');
    const isDashboardActive = isOwner ? route().current('dashboard') : route().current('player.dashboard');

    return (
        <div className="min-h-screen bg-[#F8FAF6] text-[#71796F] font-sans selection:bg-[#22C55E] selection:text-white flex flex-col">
            
            {/* Fixed Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    
                    {/* Logo & Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden text-gray-700 hover:text-black focus:outline-none p-1.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-xs"
                            aria-label="Open Sidebar Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                            </svg>
                        </button>
                        <Link href={dashboardRoute} className="inline-block">
                            <span className="text-xl font-bold text-[#22C55E] tracking-tight hover:opacity-90 transition-opacity">
                                PickleBook Leyte
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links (Role-Based Conditional Display) */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link 
                            href={dashboardRoute} 
                            className={`transition-colors duration-200 ${isDashboardActive ? 'text-[#22C55E] font-bold' : 'text-black hover:text-[#22C55E]'}`}
                        >
                            Dashboard
                        </Link>

                        {isOwner ? (
                            <>
                                <Link 
                                    href={route('court.calendar')} 
                                    className={`transition-colors duration-200 ${route().current('court.calendar') ? 'text-[#22C55E] font-bold' : 'text-black hover:text-[#22C55E]'}`}
                                >
                                    Calendar
                                </Link>
                                <Link 
                                    href={route('owner.subscription.show')} 
                                    className={`transition-colors duration-200 ${route().current('owner.subscription.create') ? 'text-[#22C55E] font-bold' : 'text-black hover:text-[#22C55E]'}`}
                                >
                                    Subscription
                                </Link>
                            </>
                        ) : (
                            <Link 
                                href={route('courts.browse')} 
                                className={`transition-colors duration-200 ${route().current('courts.browse') ? 'text-[#22C55E] font-bold' : 'text-black hover:text-[#22C55E]'}`}
                            >
                                Browse Courts
                            </Link>
                        )}
                    </div>

                    {/* Desktop User Profile Dropdown */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none transition"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-xs">
                                                {user?.fullname?.[0] || user?.name?.[0] || 'U'}
                                            </div>
                                            <span>{user.fullname || user.name}</span>
                                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile Profile Toggle Trigger */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm"
                        >
                            <div className="h-5 w-5 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-[10px]">
                                {user?.fullname?.[0] || user?.name?.[0] || 'U'}
                            </div>
                            <span>Menu</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown Menu (Role-Based Conditional Display) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1'}>
                    <ResponsiveNavLink href={dashboardRoute} active={isDashboardActive}>
                        Dashboard
                    </ResponsiveNavLink>

                    {isOwner ? (
                        <ResponsiveNavLink href={route('court.calendar')} active={route().current('court.calendar')}>
                            Calendar
                        </ResponsiveNavLink>
                    ) : (
                        <ResponsiveNavLink href={route('courts.browse')} active={route().current('courts.browse')}>
                            Browse Courts
                        </ResponsiveNavLink>
                    )}

                    <div className="border-t border-gray-200 pt-4 pb-1 px-4">
                        <div className="text-base font-bold text-gray-800">{user.fullname || user.name}</div>
                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* Main Application Shell */}
            <div className="flex flex-1 pt-[73px] min-h-screen">
                
                {/* Sidebar wrapper */}
                <div className="sticky top-[73px] h-[calc(100vh-73px)] z-40">
                    {isOwner ? (
                        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    ) : (
                        <PlayerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    )}
                </div>

                {/* Main Content Viewport */}
                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                    {header && (
                        <header className="bg-white border-b border-gray-100 shadow-sm">
                            <div className="mx-auto max-w-7xl px-6 py-6">
                                {header}
                            </div>
                        </header>
                    )}
                    <Alert flash={usePage().props.flash} />
                    <main className="flex-1">{children}</main>
                </div>
            </div>

        </div>
    );
}