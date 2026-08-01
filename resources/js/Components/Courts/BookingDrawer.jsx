import { useState } from 'react';

export default function BookingDrawer({ court, onClose }) {
    const [selectedDate, setSelectedDate] = useState('14');
    const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

    if (!court) return null;

    const dates = [
        { day: 'MON', date: '14' },
        { day: 'TUE', date: '15' },
        { day: 'WED', date: '16' },
        { day: 'THU', date: '17' },
    ];

    const slots = [
        { time: '08:00 AM', available: true },
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: true, selected: true },
        { time: '11:00 AM', available: false, label: '11:00 AM (Full)' },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: true },
    ];

    // Extract numeric rate from string like "₱400"
    const numericRate = parseInt(court.price.replace(/[^0-9]/g, '')) || 400;
    const serviceFee = 15;
    const total = numericRate + serviceFee;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs transition-opacity">
            <div className="w-full max-w-md bg-[#F8FAF6] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-gray-200 p-6 animate-in slide-in-from-right duration-300">
                
                {/* Header */}
                <div>
                    <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-gray-900">{court.name}</h2>
                            <p className="text-xs text-[#71796F] mt-0.5">{court.type} • {court.location}</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="rounded-full p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200/60 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Select Date */}
                    <div className="mb-6">
                        <label className="text-[11px] font-bold text-[#71796F] uppercase tracking-wider block mb-3">Select Date</label>
                        <div className="grid grid-cols-4 gap-3">
                            {dates.map((d, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(d.date)}
                                    className={`flex flex-col items-center justify-center py-3 rounded-xl border text-xs font-bold transition-all ${
                                        selectedDate === d.date 
                                            ? 'bg-[#1B6138] text-white border-[#1B6138] shadow-sm' 
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-[10px] opacity-80">{d.day}</span>
                                    <span className="text-base mt-0.5">{d.date}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Available Slots */}
                    <div className="mb-6">
                        <label className="text-[11px] font-bold text-[#71796F] uppercase tracking-wider block mb-3">Available Slots</label>
                        <div className="grid grid-cols-2 gap-3">
                            {slots.map((slot, idx) => (
                                <button
                                    key={idx}
                                    disabled={!slot.available}
                                    onClick={() => slot.available && setSelectedSlot(slot.time)}
                                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                                        !slot.available 
                                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                            : selectedSlot === slot.time
                                                ? 'bg-[#C6F6D5] text-[#1B6138] border-[#22C55E] shadow-sm'
                                                : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {slot.label || slot.time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Booking Summary Box */}
                    <div className="rounded-2xl bg-white p-5 border border-gray-200 space-y-3 mb-6 shadow-xs">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Booking Summary</h4>
                        <div className="flex justify-between text-xs text-[#71796F]">
                            <span>Rate (1 hour)</span>
                            <span className="font-semibold text-gray-900">₱{numericRate.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#71796F] border-b border-gray-100 pb-3">
                            <span>Service Fee</span>
                            <span className="font-semibold text-gray-900">₱{serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-1">
                            <span>Total</span>
                            <span className="text-[#1B6138]">₱{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-gray-200 pt-4 bg-[#F8FAF6]">
                    <button 
                        onClick={() => alert(`Successfully booked ${court.name} for ${selectedSlot}!`)}
                        className="w-full rounded-xl bg-[#1B6138] py-3.5 text-xs font-bold text-white hover:bg-[#154d2c] shadow-md flex items-center justify-center gap-2 transition"
                    >
                        <span>Confirm & Checkout</span>
                        <span>→</span>
                    </button>
                    <p className="text-[10px] text-center text-[#71796F] mt-2">Secure payment via GCash or Maya</p>
                </div>

            </div>
        </div>
    );
}