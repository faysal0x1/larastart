import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [subscribe, setSubscribe] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Password validation checks
    const passwordRequirements = {
        hasUppercase: /[A-Z]/.test(data.password),
        hasLowercase: /[a-z]/.test(data.password),
        hasNumber: /\d/.test(data.password),
        hasSpecial: /[@#$%^&*!]/.test(data.password),
        hasMinLength: data.password.length >= 8 && data.password.length <= 30,
    };

    const getValidRequirementsCount = () => {
        return Object.values(passwordRequirements).filter(Boolean).length;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Create Account" />
            
            <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="mx-auto w-32 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-8">
                        <span className="text-white font-bold text-2xl">Tzb</span>
                    </div>
                </div>
        
                {/* Form */}
                <div className="bg-white text-black py-8 px-6 shadow-sm rounded-lg border">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
                    </div>

                    <form onSubmit={submit} className="space-y-6 ">
                        {/* Name Field */}
                        <div>
                            <Label htmlFor="name" className="block text-sm font-medium text-black  mb-2">
                                First and Last Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full"
                                placeholder="First and Last Name"
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Email Field */}
                        <div>
                            <Label htmlFor="email" className="block text-sm font-mediu  mb-2">
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
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    Mobile Phone Number (optional)
                                </Label>
                                <InfoIcon className="h-4 w-4 " />
                            </div>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full"
                                placeholder="Mobile Phone Number"
                            />
                            <InputError message={errors.phone} className="mt-1" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4 " />
                                    ) : (
                                        <EyeIcon className="h-4 w-4 " />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Requirements */}
                            <div className="mt-3 text-sm">
                                <div className="flex items-center justify-between text-gray-600 mb-2">
                                    <span>Including 3 of the following:</span>
                                    <span>Must contain:</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="space-y-1">
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${passwordRequirements.hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                ✓
                                            </span>
                                            ABC
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasLowercase ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${passwordRequirements.hasLowercase ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                ✓
                                            </span>
                                            abc
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${passwordRequirements.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                ✓
                                            </span>
                                            123
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasSpecial ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${passwordRequirements.hasSpecial ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                ✓
                                            </span>
                                            @#$
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${passwordRequirements.hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                ✓
                                            </span>
                                            8-30 Chars
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Subscribe Checkbox */}
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="subscribe"
                                checked={subscribe}
                                onCheckedChange={setSubscribe}
                                className="mt-1"
                            />
                            <div className="text-sm">
                                <Label htmlFor="subscribe" className="text-gray-700 cursor-pointer">
                                    Subscribe for exclusive e-mail offers and discounts
                                </Label>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="text-sm text-gray-600 text-center">
                            By creating an account, you agree to Newegg's{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Privacy Notice
                            </Link>{' '}
                            and{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Terms of Use
                            </Link>
                            .
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md font-medium text-base transition-colors"
                        >
                            {processing ? 'Creating Account...' : 'SIGN UP'}
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">Have an account? </span>
                        <Link
                            href={route('login.page')}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}