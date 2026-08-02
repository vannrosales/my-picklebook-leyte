import { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/CourtOwner/Sidebar';
import CourtStatsBar from '@/Components/CourtOwner/Courts/CourtStatsBar';
import CourtCard from '@/Components/CourtOwner/Courts/CourtCard';

export default function CourtListing({ auth, courts }) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null);
    
    const { flash } = usePage().props;
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        surface_type: '',
        hourly_rate: '',
        status: 'available',
    });

    const openAddModal = () => {
        setEditingCourt(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (court) => {
        setEditingCourt(court);
        setData({
            name: court.name,
            description: court.description || '',
            surface_type: court.surfaceType,
            hourly_rate: court.hourly_rate,
            status: court.status,
        });
        setIsModalOpen(true);
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingCourt) {
            put(route('court.update', editingCourt.id), {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        } else {
            post(route('court.store'), {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            });
        }
    };

    const deleteCourt = (id) => {
        if (confirm('Are you sure you want to delete this court?')) {
            router.delete(route('court.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Court Management - PickleBook Tacloban" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] text-[#71796F] font-sans flex relative">


                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full relative">
                    
                    {showAlert && (
                        <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#E8F5E9] border border-[#22C55E]/30 p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                                <span className="text-xs sm:text-sm font-extrabold text-[#1B6138]">{flash.success}</span>
                            </div>
                            <button onClick={() => setShowAlert(false)} className="text-[#1B6138] hover:text-gray-900 font-bold p-1">✕</button>
                        </div>
                    )}

                    

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Court Management</h1>
                            <p className="text-xs text-[#71796F] mt-1 font-medium">Manage your active venues, surface profiles, and pricing rates.</p>
                        </div>
                        <button onClick={openAddModal} className="rounded-xl bg-[#1B6138] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#154d2c] hover:shadow-md transition-all duration-200 shrink-0">
                            + Add New Court
                        </button>
                    </div>

                    <CourtStatsBar courts={courts} />

                    {courts.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {courts.map((court) => (
                                <CourtCard 
                                    key={court.id} 
                                    court={court} 
                                    onEdit={openEditModal} 
                                    onDelete={deleteCourt} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                            <p className="text-sm font-semibold text-gray-700">No courts listed yet.</p>
                            <p className="text-xs text-[#71796F] mt-1">Click "+ Add New Court" to get your venue up and running.</p>
                        </div>
                    )}

                </main>
            </div>

            {/* Modal Form for Adding / Editing a Court */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-extrabold text-gray-900">{editingCourt ? 'Edit Court' : 'Add New Court'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                        </div>

                        <form onSubmit={submitForm} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Court Name</label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g., Court A (Indoor)" 
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                />
                                {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Surface Type</label>
                                <input 
                                    type="text" 
                                    value={data.surface_type} 
                                    onChange={e => setData('surface_type', e.target.value)}
                                    placeholder="e.g., Indoor Acrylic, Concrete" 
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                />
                                {errors.surface_type && <span className="text-xs text-red-500 mt-1 block">{errors.surface_type}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Hourly Rate (₱)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={data.hourly_rate} 
                                    onChange={e => setData('hourly_rate', e.target.value)}
                                    placeholder="800.00" 
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                />
                                {errors.hourly_rate && <span className="text-xs text-red-500 mt-1 block">{errors.hourly_rate}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Status</label>
                                <select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none bg-white"
                                >
                                    <option value="available">Available / Ready</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Description (Optional)</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Brief amenities or lighting notes..." 
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#22C55E] focus:outline-none"
                                    rows="2"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="rounded-xl bg-[#1B6138] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#154d2c] transition shadow-sm disabled:opacity-50">
                                    {processing ? 'Saving...' : (editingCourt ? 'Update Court' : 'Save Court')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}