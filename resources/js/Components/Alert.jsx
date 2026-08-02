import React, { useEffect, useState } from 'react';

export default function Alert({ flash = {} }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }

        // Auto-dismiss after 5 seconds
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    const isSuccess = type === 'success';

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center justify-between gap-6 rounded-2xl px-6 py-4 text-white shadow-2xl transition-all duration-300 max-w-md ${
            isSuccess ? 'bg-emerald-600' : 'bg-rose-600'
        }`}>
            <div className="flex items-center gap-3.5">
                {isSuccess ? (
                    <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
                <span className="text-sm sm:text-base font-bold leading-snug">{message}</span>
            </div>
            <button 
                onClick={() => setVisible(false)} 
                className="text-white/80 hover:text-white font-extrabold text-base p-1"
            >
                ✕
            </button>
        </div>
    );
}