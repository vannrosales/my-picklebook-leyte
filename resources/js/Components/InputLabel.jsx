export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-bold text-xs uppercase tracking-wider text-[#71796F] ${className}`}>
            {value ? value : children}
        </label>
    );
}