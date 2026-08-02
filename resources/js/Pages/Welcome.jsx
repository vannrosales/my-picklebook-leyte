import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeroSection from '@/Components/HeroSection';
import Pickleball101 from '@/Components/Pickleball101';
import CourtCard from '@/Components/CourtCard';
import PricingCard from '@/Components/PricingCard';
import Footer from '@/Components/Footer';

export default function Welcome({ auth }) {
    
    const user = auth?.user || usePage().props.auth?.user;

    const courts = [
        { name: 'Leyte Sports Center', location: 'Downtown Tacloban', price: '₱350/hr', rating: '4.9', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80' },
        { name: 'The Smash Hub', location: 'Marasbaras District', price: '₱500/hr', rating: '4.7', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=500&q=80' },
        { name: 'V&G Club Courts', location: 'V&G Subdivision', price: '₱300/hr', rating: '4.6', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=500&q=80' },
        { name: 'Summit Skycourt', location: 'Real Street', price: '₱450/hr', rating: '4.8', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80' },
    ];

    const plans = [
        {
            name: "For Players",
            price: "Free",
            period: "",
            subtitle: "No monthly fee, pay-per-use",
            popular: false,
            features: [
                { text: "Access to all public courts", included: true },
                { text: "Instant booking confirmations", included: true },
                { text: "Multi-court management", included: false }
            ],
            buttonText: "Get Started",
            buttonStyle: "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"
        },
        {
            name: "Single Court",
            price: "₱550",
            period: "/mo",
            subtitle: "Essential tools for single court owners",
            popular: true,
            features: [
                { text: "Basic scheduling dashboard", included: true },
                { text: "Manage 1 court listing", included: true },
                { text: "Customer support", included: true }
            ],
            buttonText: "Upgrade Now",
            buttonStyle: "bg-[#22C55E] hover:bg-[#1eb053] text-white"
        },
        {
            name: "Dual Courts",
            price: "₱1,050",
            period: "/mo",
            subtitle: "Tools for growing operators",
            popular: false,
            features: [
                { text: "Standard analytics", included: true },
                { text: "Manage up to 2 court listings", included: true },
                { text: "Priority support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "3 Courts Tier",
            price: "₱1,550",
            period: "/mo",
            subtitle: "Optimized for 3-court venues",
            popular: false,
            features: [
                { text: "Advanced analytics", included: true },
                { text: "Manage up to 3 court listings", included: true },
                { text: "Priority support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "4 Courts Tier",
            price: "₱2,050",
            period: "/mo",
            subtitle: "Built for medium complexes",
            popular: false,
            features: [
                { text: "Comprehensive reporting", included: true },
                { text: "Manage up to 4 court listings", included: true },
                { text: "Priority support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "5 Courts Tier",
            price: "₱2,550",
            period: "/mo",
            subtitle: "Expanded multi-court setup",
            popular: false,
            features: [
                { text: "Multi-court dashboard", included: true },
                { text: "Manage up to 5 court listings", included: true },
                { text: "Priority support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "6 Courts Tier",
            price: "₱3,050",
            period: "/mo",
            subtitle: "High-capacity facility plan",
            popular: false,
            features: [
                { text: "Advanced revenue tracking", included: true },
                { text: "Manage up to 6 court listings", included: true },
                { text: "Priority support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "7 Courts Tier",
            price: "₱3,550",
            period: "/mo",
            subtitle: "Extensive operation tools",
            popular: false,
            features: [
                { text: "Full enterprise analytics", included: true },
                { text: "Manage up to 7 court listings", included: true },
                { text: "Dedicated support", included: true }
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        },
        {
            name: "8 Courts Tier",
            price: "₱4,050",
            period: "/mo",
            subtitle: "Maximum court capacity plan",
            popular: false,
            features: [
                { text: "Full enterprise analytics suite", included: true },
                { text: "Manage up to 8 court listings", included: true },
                { text: "Dedicated 24/7 support", included: true }
            ],
            buttonText: "Go Pro",
            buttonStyle: "bg-white hover:bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
        }
    ];

    // Page content shared between both states
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
                // If logged in, wrap landing page content with the AuthenticatedLayout
                <AuthenticatedLayout>
                    {pageContent}
                </AuthenticatedLayout>
            ) : (
                // If guest, show public navigation or a guest-tailored wrapper layout
                <div className="min-h-screen bg-[#F8FAF6]">
                    {/* Public Header / Navbar for Guests */}
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