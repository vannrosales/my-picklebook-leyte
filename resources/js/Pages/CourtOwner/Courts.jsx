import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourtStatsBar from '@/Components/CourtOwner/Courts/CourtStatsBar';
import CourtCard from '@/Components/CourtOwner/Courts/CourtCard';
import CourtModal from '@/Components/CourtOwner/Courts/CourtModal';

export default function CourtListing({ auth, courts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null);

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
        const options = {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        };

        if (editingCourt) {
            put(route('court.update', editingCourt.id), options);
        } else {
            post(route('court.store'), options);
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
                    
                    {/* Header */}
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

            {/* Modal Component */}
            <CourtModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingCourt={editingCourt}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submitForm}
            />
        </AuthenticatedLayout>
    );
}