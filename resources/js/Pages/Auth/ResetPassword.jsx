import { Head, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthCard>
            <Head title="Reset Password" />

            <div className="text-center mb-6">
                <h2 className="text-xl font-extrabold text-gray-900">Reset Password</h2>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Email Address" />
                    <TextInput
                        type="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <InputLabel value="New Password" />
                    <TextInput
                        type="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                    <InputLabel value="Confirm Password" />
                    <TextInput
                        type="password"
                        value={data.password_confirmation}
                        className="mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    Reset Password
                </PrimaryButton>
            </form>
        </AuthCard>
    );
}