export default function HeroSection() {
    return (
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Your Game, Just a Tap Away
            </h1>
            <p className="mt-4 text-lg text-[#71796F]">
                The easiest way to discover, book, and play pickleball in Leyte.<br />
                From local court clubs to private venues.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <a href="#browse" className="rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1eb053] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    Find a Court
                </a>
                <a href="#learn-more" className="rounded-full border border-[#22C55E] px-6 py-3 text-sm font-semibold text-[#22C55E] hover:bg-[#22C55E]/10 hover:-translate-y-0.5 transition-all duration-200">
                    Learn More
                </a>
            </div>
        </section>
    );
}