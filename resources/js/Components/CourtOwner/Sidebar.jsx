import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div 
                    onClick={onClose} 
                    className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
                ></div>
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#F8FAF6] border-r border-gray-200 p-6 flex flex-col justify-between 
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Court Owner</h2>
                            <p className="text-xs text-[#71796F]">Tacloban Branch</p>
                        </div>
                        {/* Close button for mobile */}
                        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-900 font-bold p-1">
                            ✕
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {/* Overview / Dashboard */}
                        <Link 
                            href={route('dashboard')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                                route().current('dashboard') 
                                    ? 'bg-[#22C55E] text-white shadow-sm scale-[1.02]' 
                                    : 'text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
                            </svg>
                            Overview
                        </Link>

                        {/* Bookings Management */}
                        <Link 
                            href={route('court.bookings')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                                route().current('court.bookings') 
                                    ? 'bg-[#22C55E] text-white shadow-sm scale-[1.02]' 
                                    : 'text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z"></path>
                            </svg>
                            Bookings
                        </Link>

                        {/* Courts Management Tab */}
                        <Link 
                            href={route('court.listings')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                                route().current('court.listings') 
                                    ? 'bg-[#22C55E] text-white shadow-sm scale-[1.02]' 
                                    : 'text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.37 3h13.26a1.5 1.5 0 011.052.44l3.588 3.619a3 3 0 01-.621 4.72l-1.35 1.015"></path>
                            </svg>
                            Courts
                        </Link>

                        {/* Schedules Tab */}
                        <Link 
                            href={route('court.schedules')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                                route().current('court.schedules') 
                                    ? 'bg-[#22C55E] text-white shadow-sm scale-[1.02]' 
                                    : 'text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Schedules
                        </Link>

                        {/* Calendar Tab */}
                        <Link 
                            href={route('court.calendar')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                                route().current('court.calendar') 
                                    ? 'bg-[#22C55E] text-white shadow-sm scale-[1.02]' 
                                    : 'text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z"></path>
                            </svg>
                            Calendar
                        </Link>

                        {/* Setup Link */}
                        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1 transition-all duration-200 group">
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l.074.04c.328.18.724.162 1.036-.058l1.1-.79c.47-.34 1.106-.217 1.433.284l1.297 1.983c.327.5.21 1.169-.262 1.505l-.948.675c-.308.22-.44.604-.336.966.082.285.127.587.127.896 0 .309-.045.611-.127.896-.104.362.028.746.336.966l.948.675c.472.336.59 1.005.262 1.505l-1.297 1.983c-.327.502-.963.625-1.433.284l-1.1-.79c-.312-.22-.708-.238-1.036-.058l-.074.04c-.332.184-.582.496-.645.87l-.213 1.281z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Setup
                        </a>

                        {/* Payouts Link */}
                        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1 transition-all duration-200 group">
                            <svg className="w-5 h-5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h15.75a2.25 2.25 0 012.25 2.25v12.75a2.25 2.25 0 01-2.25 2.25H3.75a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z"></path>
                            </svg>
                            Payouts
                        </a>
                    </nav>
                </div>
            </aside>
        </>
    );
}