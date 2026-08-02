import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';

export default function BookingDrawer({ court, onClose }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [closedMessage, setClosedMessage] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        court_id: court.id,
        time_slot_id: '',
        payment_method: 'gcash',
    });

    // Fetch live slots matching the court's schedule templates whenever date changes
    useEffect(() => {
        setLoading(true);
        setSelectedSlot(null);
        setData('time_slot_id', '');
        setClosedMessage('');

        axios.get(route('courts.slots', court.id), { params: { date: selectedDate } })
            .then(response => {
                setSlots(response.data.slots);
                if (response.data.slots.length === 0) {
                    setClosedMessage(response.data.message || 'Court is closed on this day.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching slots:", error);
                setLoading(false);
            });
    }, [selectedDate, court.id]);

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setData('time_slot_id', slot.id);
    };

    const submitBooking = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-extrabold text-gray-900">Book {court.name}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                    </div>

                    {/* Date Picker */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Select Date</label>
                        <input 
                            type="date" 
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                        />
                    </div>

                    {/* Time Slots Grid */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Available Time Slots</label>
                        {loading ? (
                            <p className="text-xs text-[#71796F] py-6 text-center">Checking operating schedule...</p>
                        ) : slots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {slots.map((slot) => {
                                    const isSelected = selectedSlot?.id === slot.id;
                                    return (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            disabled={slot.is_booked}
                                            onClick={() => handleSlotClick(slot)}
                                            className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                                                slot.is_booked 
                                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through' 
                                                    : isSelected 
                                                        ? 'bg-[#1B6138] text-white border-[#1B6138] shadow-sm' 
                                                        : 'bg-white text-gray-800 border-gray-200 hover:border-[#22C55E]'
                                            }`}
                                        >
                                            {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                            {slot.is_booked && <span className="block text-[9px] uppercase tracking-wider text-red-500 font-semibold mt-0.5">Booked</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-center">
                                <p className="text-xs text-red-600 font-bold">{closedMessage || 'Court is closed on this day.'}</p>
                                <p className="text-[11px] text-red-400 mt-0.5">Please choose another date.</p>
                            </div>
                        )}
                        {errors.time_slot_id && <span className="text-xs text-red-500 mt-2 block">{errors.time_slot_id}</span>}
                    </div>

                    {/* Payment Method Selector */}
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Payment Method</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['gcash', 'credit_card', 'debit_card'].map((method) => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setData('payment_method', method)}
                                    className={`py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                                        data.payment_method === method
                                            ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#1B6138]'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {method.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Proceed Button */}
                <form onSubmit={submitBooking} className="border-t border-gray-100 pt-4 mt-6">
                    <button 
                        type="submit"
                        disabled={!selectedSlot || processing}
                        className="w-full rounded-xl bg-[#22C55E] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#1eb054] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Processing...' : 'Confirm & Pay Slot'}
                    </button>
                </form>
            </div>
        </div>
    );
}