export default function PricingCard({ name, price, period, subtitle, popular, features, buttonText, buttonStyle }) {
    
    return (
        
        <div className={`min-w-[280px] sm:min-w-[320px] flex-shrink-0 rounded-2xl bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 relative ${
            popular ? 'shadow-lg border-2 border-[#EAB308]' : 'shadow-sm border border-gray-100'
        }`}>
            {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#EAB308] px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                    Popular
                </span>
            )}
            <div>
                <span className="text-xs font-bold tracking-wider text-[#71796F] uppercase">{name}</span>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                    {price}<span className="text-sm font-normal text-[#71796F]">{period}</span>
                </h3>
                <p className="text-xs text-[#71796F] mt-1">{subtitle}</p>
                <ul className="mt-6 space-y-3 text-sm text-[#71796F]">
                    {features.map((feature, idx) => (
                        <li key={idx} className={`flex items-center gap-2 ${!feature.included ? 'text-gray-300' : ''}`}>
                            {feature.included ? '✓' : '✕'} {feature.text}
                        </li>
                    ))}
                </ul>
            </div>
            <button className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold shadow-sm transition-all duration-200 ${buttonStyle}`}>
                {buttonText}
            </button>
        </div>
    );
}