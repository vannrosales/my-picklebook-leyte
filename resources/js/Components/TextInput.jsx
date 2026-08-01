import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-xl bg-[#F8FAF6] border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#22C55E] focus:ring-[#22C55E] focus:bg-white transition-all outline-none ' +
                className
            }
            ref={input}
        />
    );
});