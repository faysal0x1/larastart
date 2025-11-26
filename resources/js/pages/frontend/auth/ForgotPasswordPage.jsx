import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPasswordPage({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
           <Head>
                <title>Sign In Assistance</title>

           </Head>

            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="mx-auto mb-8 flex h-16 w-32 items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-600">
                        <span className="text-2xl font-bold text-white">Tbz</span>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-lg border text-black bg-white px-6 py-8 shadow-sm">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Sign in Assistance</h2>
                    </div>

                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Enter the email address and we will send you a verification code for you to enter before creating a new password.
                        </p>
                    </div>

                    {/* Success Message */}
                    {status && (
                        <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3">
                            <p className="text-sm text-green-600">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full"
                                placeholder="puqakehi@diu.edu.bd"
                                required
                                autoComplete="username"
                                autoFocus
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-md bg-orange-500 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-orange-600"
                        >
                            {processing ? 'SENDING CODE...' : 'REQUEST VERIFICATION CODE'}
                        </Button>
                    </form>

                    {/* Customer Service Link */}
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">Need Help? </span>
                        <Link href="#" className="font-medium text-gray-800 underline hover:text-gray-900">
                            Contact Customer Service
                        </Link>
                    </div>

                    {/* Back to Sign In */}
                    <div className="mt-4 text-center">
                        <Link href={route('login.page')} className="text-sm text-blue-600 hover:underline">
                            ← Back to Sign In
                        </Link>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="text-center text-sm text-gray-500">
                    <p>Secure password reset with SSL encryption</p>
                </div>
            </div>
        </div>
    );
}
