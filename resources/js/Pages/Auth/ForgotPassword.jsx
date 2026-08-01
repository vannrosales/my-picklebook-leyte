import { Head, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthCard>
            <Head title="Forgot Password" />

            <div className="mb-4 text-xs text-[#71796F] text-center">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600 text-center">{status}</div>}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Email Address" />
                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        isFocused={true}
                        placeholder="name@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    Email Password Reset Link
                </PrimaryButton>
            </form>
        </AuthCard>
    );
}