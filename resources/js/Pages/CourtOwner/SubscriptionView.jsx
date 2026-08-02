import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
        buttonText: "Get This Plan",
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

export default function SubscriptionView({ auth, currentSubscription }) {
    const { post, processing } = useForm();

    const handleSubscribe = (planName) => {
        post(route('owner.subscription.store'), {
            tier_name: planName,
        });
    };

    const isSubscribed = currentSubscription?.status === 'active';
    const currentTierName = currentSubscription?.tier_name?.toLowerCase() || '';

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Owner Subscription & Perks - PickleBook Leyte" />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                
                {/* Header Banner */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Subscription & Perks</h1>
                        <p className="text-xs text-[#71796F] mt-1">Review your current facility plan and explore available capacity tiers.</p>
                    </div>
                    <div className="bg-[#E8F5E9] border border-[#22C55E]/30 px-4 py-3 rounded-2xl flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-[#22C55E] text-white flex items-center justify-center font-bold text-xs">
                            ⭐
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[#1B6138] block">Current Plan Status</span>
                            <span className="text-xs font-extrabold text-gray-900 capitalize">
                                {isSubscribed ? `${currentSubscription?.tier_name} Active` : 'No Active Subscription'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pricing Plans Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {plans.map((plan, index) => {
                        const isCurrentPlan = currentTierName === plan.name.toLowerCase();

                        return (
                            <div 
                                key={index}
                                className={`rounded-3xl p-6 bg-white border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                    plan.popular || isCurrentPlan 
                                        ? 'border-[#22C55E] ring-2 ring-[#22C55E]/20 hover:border-[#22C55E]' 
                                        : 'border-gray-100 hover:border-gray-300'
                                }`}
                            >
                                {plan.popular && !isCurrentPlan && (
                                    <div className="absolute top-0 right-0 bg-[#22C55E] text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                {isCurrentPlan && (
                                    <div className="absolute top-0 right-0 bg-gray-900 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                        Active Plan
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900">{plan.name}</h3>
                                    <p className="text-xs text-[#71796F] mt-1">{plan.subtitle}</p>
                                    
                                    <div className="my-5">
                                        <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                                        <span className="text-xs text-[#71796F]">{plan.period}</span>
                                    </div>

                                    <ul className="space-y-2.5 text-xs text-gray-700 mb-6 border-t border-gray-100 pt-4">
                                        {plan.features.map((feat, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-2">
                                                <span>{feat.included ? '✅' : '❌'}</span>
                                                <span className={feat.included ? 'text-gray-800 font-medium' : 'text-gray-400 line-through'}>
                                                    {feat.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleSubscribe(plan.name)}
                                        disabled={processing || isCurrentPlan}
                                        className={`w-full rounded-2xl py-3 text-xs font-bold transition-all shadow-sm ${
                                            isCurrentPlan 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                : plan.buttonStyle
                                        }`}
                                    >
                                        {isCurrentPlan ? 'Current Active Plan' : plan.buttonText}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}