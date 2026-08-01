import { Head, Link, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import PrimaryButton from '@/Components/PrimaryButton';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthCard>
            <Head title="Email Verification" />

            <div className="mb-4 text-xs text-[#71796F] text-center">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-xs font-medium text-green-600 text-center">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <PrimaryButton disabled={processing}>
                    Resend Verification Email
                </PrimaryButton>

                <div className="text-center mt-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs text-[#71796F] underline hover:text-gray-900"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}