import InputError from '@/components/input-error';
import SocialLogin from '@/components/SocialLogin';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoginPage({ status, canResetPassword, socialLoginConfig }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login.page'), {
            onFinish: () => reset('ForgotPasswordPage'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Sign In" />

            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="mx-auto mb-8 flex h-16 w-32 items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-600">
                        <span className="text-2xl font-bold text-white">Tzb E-commerce</span>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-white text-black px-6 py-8 shadow-sm">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Sign In</h2>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3">
                            <p className="text-sm text-green-600">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <Label htmlFor="email" className="mb-2 block text-sm font-medium text-black">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full"
                                placeholder="Email Address"
                                required
                                autoComplete="username"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <Label htmlFor="password" className="mb-2 block text-sm font-medium text-black">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pr-10"
                                    placeholder="Password"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-4 w-4 text-black" /> : <EyeIcon className="h-4 w-4 text-black" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                />
                                <Label htmlFor="remember" className="cursor-pointer text-sm text-gray-700">
                                    Keep me signed in
                                </Label>
                            </div>

                            <div>
                                <Link href={route('forgot.password')} className="text-sm text-blue-600 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-md bg-orange-500 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-orange-600"
                        >
                            {processing ? 'Signing In...' : 'SIGN IN'}
                        </Button>
                    </form>

                    {/* One-Time Sign In Code Button */}
                    {/* <div className="mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-md border-blue-300 px-4 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50"
                            onClick={() => {
                                // Handle one-time sign in code logic
                                alert('One-time sign in code feature not implemented yet');
                            }}
                        >
                            GET ONE-TIME SIGN IN CODE
                        </Button>
                        <div className="mt-2 text-center">
                            <Link href="#" className="text-sm text-gray-500 hover:underline">
                                What's the One-Time Code?
                            </Link>
                        </div>
                    </div> */}

                    {/* Social Login */}
                    <SocialLogin socialLoginConfig={socialLoginConfig} />

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">New to Newegg? </span>
                        <Link href={route('register.page')} className="font-medium text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="text-center text-sm text-gray-500">
                    <p>Secure Sign In with SSL encryption</p>
                </div>
            </div>
        </div>
    );
}
