import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Determine correct dashboard route based on user role
    const dashboardRoute = user?.role === 'court_owner' ? route('dashboard') : route('player.dashboard');
    const isDashboardActive = user?.role === 'court_owner' ? route().current('dashboard') : route().current('player.dashboard');

    return (
        <div className="min-h-screen bg-[#F8FAF6] text-[#71796F] font-sans selection:bg-[#22C55E] selection:text-white">
            
            {/* Custom Brand Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    
                    {/* Logo / Brand Name */}
                    <div className="flex items-center gap-2">
                        <Link href={dashboardRoute} className="inline-block">
                            <span className="text-xl font-bold text-[#22C55E] tracking-tight hover:opacity-90 transition-opacity">
                                PickleBook Leyte
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link 
                            href={dashboardRoute} 
                            className={`transition-colors duration-200 ${isDashboardActive ? 'text-[#22C55E] font-bold' : 'text-black hover:text-[#22C55E]'}`}
                        >
                            Dashboard
                        </Link>
                        <Link href={route('courts.browse')} className="text-black hover:text-[#22C55E] transition-colors duration-200">Browse Courts</Link>
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
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu Button */}
                    <div className="-me-2 flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none transition"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                </div>

                {/* Mobile Navigation Dropdown Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1'}>
                    <ResponsiveNavLink href={dashboardRoute} active={isDashboardActive}>
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('courts.browse')}>
                        Browse Courts
                    </ResponsiveNavLink>
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

            {/* Optional Header Section */}
            {header && (
                <header className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>

        </div>
    );
}