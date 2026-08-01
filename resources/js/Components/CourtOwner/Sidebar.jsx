import { Link } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div 
                    onClick={onClose} 
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
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
                            <h2 className="text-xl font-bold text-gray-900">Court Owner</h2>
                            <p className="text-xs text-[#71796F]">Tacloban Branch</p>
                        </div>
                        {/* Close button for mobile */}
                        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-900 font-bold">
                            ✕
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {/* Overview / Dashboard */}
                        <Link 
                            href={route('dashboard')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                route().current('dashboard') 
                                    ? 'bg-[#22C55E] text-white shadow-sm' 
                                    : 'text-[#71796F] hover:bg-gray-100'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
                            </svg>
                            Overview
                        </Link>

                        {/* Bookings Management */}
                        <Link 
                            href={route('court.bookings')} 
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                route().current('court.bookings') 
                                    ? 'bg-[#22C55E] text-white shadow-sm' 
                                    : 'text-[#71796F] hover:bg-gray-100'
                            }`}
                        >
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z"></path>
                            </svg>
                            Bookings
                        </Link>

                        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-gray-100 transition">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l.074.04c.328.18.724.162 1.036-.058l1.1-.79c.47-.34 1.106-.217 1.433.284l1.297 1.983c.327.5.21 1.169-.262 1.505l-.948.675c-.308.22-.44.604-.336.966.082.285.127.587.127.896 0 .309-.045.611-.127.896-.104.362.028.746.336.966l.948.675c.472.336.59 1.005.262 1.505l-1.297 1.983c-.327.502-.963.625-1.433.284l-1.1-.79c-.312-.22-.708-.238-1.036-.058l-.074.04c-.332.184-.582.496-.645.87l-.213 1.281z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Setup
                        </a>
                        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-gray-100 transition">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h15.75a2.25 2.25 0 012.25 2.25v12.75a2.25 2.25 0 01-2.25 2.25H3.75a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z"></path>
                            </svg>
                            Payouts
                        </a>
                    </nav>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-700 transition w-full text-left"
                    >
                        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                        </svg>
                        Sign Out
                    </Link>
                </div>
            </aside>
        </>
    );
}