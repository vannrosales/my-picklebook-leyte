export default function Pickleball101() {
    return (
        <section id="learn-more" className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">Pickleball 101</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#22C55E] transition-transform duration-300 hover:scale-110">🏆</div>
                    <h3 className="text-lg font-bold text-gray-900">Easy to Start</h3>
                    <p className="mt-2 text-sm text-[#71796F]">Combines elements of tennis, badminton, and ping-pong. Simple rules make it accessible for all ages.</p>
                </div>
                <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAB308]/10 text-[#EAB308] transition-transform duration-300 hover:scale-110">👥</div>
                    <h3 className="text-lg font-bold text-gray-900">Social & Fun</h3>
                    <p className="mt-2 text-sm text-[#71796F]">Typically played in doubles, making it a highly social sport that fosters community spirit in Leyte.</p>
                </div>
                <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#22C55E] transition-transform duration-300 hover:scale-110">⚡</div>
                    <h3 className="text-lg font-bold text-gray-900">Stay Active</h3>
                    <p className="mt-2 text-sm text-[#71796F]">A low-impact, high-intensity workout that keeps your heart healthy and your reflexes sharp.</p>
                </div>
            </div>
        </section>
    );
}