export default function RecentHistoryWidget() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-gray-900 mb-4">Recent History</h3>
                <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900">Metro Tacloban Court</h4>
                                <p className="text-[10px] text-[#71796F]">Oct 20, 2024 • 2hrs</p>
                            </div>
                        </div>
                        <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">COMPLETED</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900">The Hub Sports</h4>
                                <p className="text-[10px] text-[#71796F]">Oct 18, 2024 • 1hr</p>
                            </div>
                        </div>
                        <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">COMPLETED</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-red-50 text-red-500">
                                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900">Palo Sports Complex</h4>
                                <p className="text-[10px] text-[#71796F]">Oct 15, 2024 • Cancelled</p>
                            </div>
                        </div>
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600">CANCELLED</span>
                    </div>
                </div>
            </div>

            <button className="mt-6 w-full rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition">
                Download Report
            </button>
        </div>
    );
}