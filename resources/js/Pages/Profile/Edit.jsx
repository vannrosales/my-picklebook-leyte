import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900">
                    Profile Management
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="min-h-[calc(100vh-5rem)] bg-[#F8FAF6] py-12 text-[#71796F] font-sans">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Top Section: Profile Information & Password Update Grid */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        
                        {/* Profile Information Card */}
                        <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 rounded-2xl flex flex-col justify-between">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full max-w-none"
                            />
                        </div>

                        {/* Update Password Card */}
                        <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 rounded-2xl flex flex-col justify-between">
                            <UpdatePasswordForm className="w-full max-w-none" />
                        </div>

                    </div>

                    {/* Bottom Section: Danger Zone / Delete User Account (Max Width Full Layout) */}
                    <div className="bg-white p-6 sm:p-8 shadow-sm border border-red-100 rounded-2xl">
                        <DeleteUserForm className="w-full max-w-none" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}