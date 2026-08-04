export const courts = [
    { 
        name: 'Leyte Sports Center', 
        location: 'Downtown Tacloban', 
        price: '₱350/hr', 
        rating: '4.9', 
        img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80' 
    },
    { 
        name: 'The Smash Hub', 
        location: 'Marasbaras District', 
        price: '₱500/hr', 
        rating: '4.7', 
        img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=500&q=80' 
    },
    { 
        name: 'V&G Club Courts', 
        location: 'V&G Subdivision', 
        price: '₱300/hr', 
        rating: '4.6', 
        img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=500&q=80' 
    },
    { 
        name: 'Summit Skycourt', 
        location: 'Real Street', 
        price: '₱450/hr', 
        rating: '4.8', 
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80' 
    },
];

export const plans = [
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