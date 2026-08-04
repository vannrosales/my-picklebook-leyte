import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeroSection from '@/Components/HeroSection';
import Pickleball101 from '@/Components/Pickleball101';
import CourtCard from '@/Components/CourtCard';
import PricingCard from '@/Components/PricingCard';
import Footer from '@/Components/Footer';
import { courts, plans } from '@/Data/welcomeData';

export default function Welcome({ auth }) {
    const user = auth?.user || usePage().props.auth?.user;

    const pageContent = (
        <div className="min-h-screen bg-[#F8FAF6] text-[#71796F] font-sans selection:bg-[#22C55E] selection:text-white">
            <HeroSection />
            <Pickleball101 />

            {/* Top Courts Section */}
            <section id="browse" className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Top Courts in Tacloban</h2>
                        <p className="text-sm text-[#71796F]">Highly-rated venues curated for your best performance.</p>
                    </div>
                    <a href="#" className="text-sm font-semibold text-[#22C55E] hover:underline hover:text-[#1eb053] transition-colors">View All</a>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {courts.map((court, idx) => (
                        <CourtCard key={idx} {...court} />
                    ))}
                </div>
            </section>

            {/* Subscription Sliding Section */}
            <section id="subscription" className="mx-auto max-w-7xl px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Join the Community</h2>
                    <p className="text-sm text-[#71796F] mt-1">Flexible plans for players and court owners alike. Scroll horizontally to view all options.</p>
                </div>

                <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
                    {plans.map((plan, idx) => (
                        <div key={idx} className="snap-start">
                            <PricingCard {...plan} />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );

    return (
        <>
            <Head title="Welcome to PickleBook Leyte" />
            
            {user ? (
                <AuthenticatedLayout>
                    {pageContent}
                </AuthenticatedLayout>
            ) : (
                <div className="min-h-screen bg-[#F8FAF6]">
                    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                            <Link href="/" className="text-xl font-bold text-[#22C55E] tracking-tight">
                                PickleBook Leyte
                            </Link>
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="text-sm font-semibold text-gray-700 hover:text-[#22C55E]">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="rounded-xl bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1eb053] transition">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </nav>
                    {pageContent}
                </div>
            )}
        </>
    );
}