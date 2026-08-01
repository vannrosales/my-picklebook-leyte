import { Head, useForm } from '@inertiajs/react';
import AuthCard from '@/Components/AuthCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthCard>
            <Head title="Confirm Password" />

            <div className="mb-4 text-xs text-[#71796F] text-center">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Password" />
                    <TextInput
                        type="password"
                        value={data.password}
                        className="mt-1"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <PrimaryButton className="mt-2" disabled={processing}>
                    Confirm
                </PrimaryButton>
            </form>
        </AuthCard>
    );
}