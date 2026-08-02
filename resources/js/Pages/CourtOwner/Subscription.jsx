import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Subscription({ auth, tiers }) {
    const { data, setData, post, processing } = useForm({
        tier_name: 'Single Court',
        monthly_price: 550.00,
    });

    const selectTier = (tier) => {
        setData({
            tier_name: tier.name,
            monthly_price: tier.price,
        });
    };

    const submitSubscription = (e) => {
        e.preventDefault();
        post(route('owner.subscription.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Choose Subscription - PickleBook Tacloban" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex flex-col items-center justify-center p-6">
                <div className="max-w-3xl w-full text-center mb-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">Required Action</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">Activate Your Court Owner Plan</h1>
                    <p className="text-xs text-[#71796F] mt-1">Select a subscription tier matching your venue count to unlock listings and schedules.</p>
                </div>

                <form onSubmit={submitSubscription} className="max-w-6xl w-full">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {tiers.map((tier) => {
                            const isSelected = data.tier_name === tier.name;
                            return (
                                <div 
                                    key={tier.name}
                                    onClick={() => selectTier(tier)}
                                    className={`rounded-2xl p-5 bg-white border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                                        isSelected ? 'border-[#22C55E] shadow-md scale-[1.02]' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                                    }`}
                                >
                                    <div>
                                        <h3 className="font-extrabold text-gray-900 text-base">{tier.name}</h3>
                                        <div className="text-xl font-black text-[#1B6138] mt-1">
                                            ₱{tier.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-[10px] text-[#71796F] font-normal">/mo</span>
                                        </div>
                                        <p className="text-xs text-[#71796F] mt-3 leading-relaxed">{tier.features}</p>
                                    </div>
                                    <div className="mt-5">
                                        <span className={`block text-center rounded-xl py-2 text-xs font-bold transition-all ${
                                            isSelected ? 'bg-[#22C55E] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}>
                                            {isSelected ? 'Selected Plan' : 'Choose Plan'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="rounded-xl bg-[#1B6138] px-8 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#154d2c] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Processing Activation...' : 'Confirm Subscription & Unlock Dashboard'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}