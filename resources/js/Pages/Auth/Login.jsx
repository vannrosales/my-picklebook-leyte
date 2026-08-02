import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }) {
    const [userType, setUserType] = useState('Customer'); // Customer or Court Owner
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        user_type: 'Customer',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthCard>
            {/* Clickable Brand Logo linking back to Welcome page */}
            <div className="text-center mb-6">
                <Link href='/' className="inline-block">
                    <span className="text-xl font-bold text-[#22C55E] tracking-tight hover:opacity-90 transition-opacity">
                        PickleBook Leyte
                    </span>
                </Link>
            </div>
            <Head title="Log in" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back</h2>
                <p className="text-xs text-[#71796F] mt-1">Sign in to book your next pickleball match.</p>
            </div>
            {/* Role Switcher Tabs */}
            <div className="flex rounded-full bg-[#F8FAF6] p-1 mb-8 border border-gray-200">
                <button
                    type="button"
                    onClick={() => { setUserType('Customer'); setData('user_type', 'Customer'); }}
                    className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
                        userType === 'Customer' ? 'bg-[#22C55E] text-white shadow-sm' : 'text-[#71796F] hover:text-gray-900'
                    }`}
                >
                    Customer
                </button>
                <button
                    type="button"
                    onClick={() => { setUserType('Court Owner'); setData('user_type', 'Court Owner'); }}
                    className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
                        userType === 'Court Owner' ? 'bg-[#22C55E] text-white shadow-sm' : 'text-[#71796F] hover:text-gray-900'
                    }`}
                >
                    Court Owner
                </button>
            </div>

            {/* Sign In / Register sub-header switch */}
            <div className="flex gap-6 border-b border-gray-200 pb-3 mb-6 text-sm font-bold">
                <span className="text-[#22C55E] border-b-2 border-[#22C55E] pb-3 -mb-3">SIGN IN</span>
                <Link href={route('register')} className="text-[#71796F] hover:text-gray-900 transition">REGISTER</Link>
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Email Address" />
                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="name@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <InputLabel value="Password" />
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-xs font-semibold text-[#22C55E] hover:underline">
                                Forgot Password?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    SIGN IN
                </PrimaryButton>
            </form>
        </AuthCard>
    );
}