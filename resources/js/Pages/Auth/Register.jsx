import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const [userType, setUserType] = useState('customer'); 

    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
    });

    const handleRoleChange = (roleValue, labelType) => {
        setUserType(labelType);
        setData('role', roleValue);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthCard>
            <Head title="Register" />

            {/* Clickable Brand Logo linking back to Welcome page */}
            <div className="text-center mb-6">
                <Link href='/welcome' className="inline-block">
                    <span className="text-xl font-bold text-[#22C55E] tracking-tight hover:opacity-90 transition-opacity">
                        PickleBook Leyte
                    </span>
                </Link>
            </div>

            {/* Role Switcher Tabs (customer vs court_owner) */}
            <div className="flex rounded-full bg-[#F8FAF6] p-1 mb-8 border border-gray-200">
                <button
                    type="button"
                    onClick={() => handleRoleChange('customer', 'Customer')}
                    className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
                        userType === 'Customer' ? 'bg-[#22C55E] text-white shadow-sm' : 'text-[#71796F] hover:text-gray-900'
                    }`}
                >
                    Customer
                </button>
                <button
                    type="button"
                    onClick={() => handleRoleChange('court_owner', 'Court Owner')}
                    className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
                        userType === 'Court Owner' ? 'bg-[#22C55E] text-white shadow-sm' : 'text-[#71796F] hover:text-gray-900'
                    }`}
                >
                    Court Owner
                </button>
            </div>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Create Account</h2>
                <p className="text-xs text-[#71796F] mt-1">
                    {userType === 'Customer' 
                        ? 'Join PickleBook Leyte to book courts instantly.' 
                        : 'Register your venue and manage court listings.'}
                </p>
            </div>

            {/* Sign In / Register sub-header switch */}
            <div className="flex gap-6 border-b border-gray-200 pb-3 mb-6 text-sm font-bold">
                <Link href='/login' className="text-[#71796F] hover:text-gray-900 transition">SIGN IN</Link>
                <span className="text-[#22C55E] border-b-2 border-[#22C55E] pb-3 -mb-3">REGISTER</span>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Full Name" />
                    <TextInput
                        type="text"
                        value={data.fullname}
                        className="mt-1"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="John Doe"
                        onChange={(e) => setData('fullname', e.target.value)}
                    />
                    {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
                </div>

                <div>
                    <InputLabel value="Email Address" />
                    <TextInput
                        type="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        placeholder="name@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <InputLabel value="Phone Number" />
                    <TextInput
                        type="text"
                        value={data.phone_number}
                        className="mt-1"
                        autoComplete="tel"
                        placeholder="09123456789"
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />
                    {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                </div>

                <div>
                    <InputLabel value="Password" />
                    <TextInput
                        type="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="new-password"
                        placeholder="••••••••"
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
                        placeholder="••••••••"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    REGISTER
                </PrimaryButton>
            </form>
        </AuthCard>
    );
}