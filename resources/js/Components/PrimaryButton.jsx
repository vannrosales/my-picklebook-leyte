export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `w-full rounded-xl bg-[#22C55E] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#1eb053] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 transition-all duration-200 ${
                    disabled && 'opacity-25'
                } ${className}`
            }
        >
            {children}
        </button>
    );
}