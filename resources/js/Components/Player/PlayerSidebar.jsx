import { Link } from '@inertiajs/react';

export default function PlayerSidebar({ isOpen, onClose }) {
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
                min-h-[calc(100vh-5rem)]
            `}>
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Player Center</h2>
                        </div>
                        {/* Close button for mobile screens */}
                        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-900 text-lg font-bold">
                            ✕
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {/* Dashboard */}
                        <a href="#" className="flex items-center gap-3 rounded-xl bg-[#22C55E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1faff5] hover:scale-[1.02]">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
                            </svg>
                            Dashboard
                        </a>

                        {/* My Bookings */}
                        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1 transition-all duration-200">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z"></path>
                            </svg>
                            My Bookings
                        </a>

                        {/* Find Courts */}
                        <Link href={route('courts.browse')} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1 transition-all duration-200">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                            </svg>
                            Find Courts
                        </Link>

                        {/* Settings */}
                        <Link href={route('profile.edit')} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#71796F] hover:bg-white hover:text-gray-900 hover:shadow-xs hover:translate-x-1 transition-all duration-200">
                            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l.074.04c.328.18.724.162 1.036-.058l1.1-.79c.47-.34 1.106-.217 1.433.284l1.297 1.983c.327.5.21 1.169-.262 1.505l-.948.675c-.308.22-.44.604-.336.966.082.285.127.587.127.896 0 .309-.045.611-.127.896-.104.362.028.746.336.966l.948.675c.472.336.59 1.005.262 1.505l-1.297 1.983c-.327.502-.963.625-1.433.284l-1.1-.79c-.312-.22-.708-.238-1.036-.058l-.074.04c-.332.184-.582.496-.645.87l-.213 1.281z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Settings
                        </Link>
                    </nav>
                </div>

                {/* Prime Membership Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] p-4 border border-[#F59E0B]/30 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider block mb-1">Prime Membership</span>
                    <p className="text-[11px] text-gray-800 mb-3 leading-relaxed">Access exclusive morning slots and 15% discount.</p>
                    <button className="w-full rounded-xl bg-[#92400E] py-2 text-xs font-bold text-white shadow-sm hover:bg-[#78350F] hover:shadow-md transition-all duration-200">
                        Upgrade Now
                    </button>
                </div>
            </aside>
        </>
    );
}