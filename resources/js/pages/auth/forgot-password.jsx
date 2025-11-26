import { useState } from 'react';
import { router } from '@inertiajs/react';
import { ArrowLeft, Check, Eye, EyeOff, Key, Lock, Mail, ShoppingBag } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // 1 = Email input, 2 = Success, 3 = OTP verification, 4 = Reset form
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [resetMethod, setResetMethod] = useState('');
    const [errors, setErrors] = useState({});
    const [otpResendCount, setOtpResendCount] = useState(0);
    const [canResendOtp, setCanResendOtp] = useState(true);
    const [resendTimer, setResendTimer] = useState(0);

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post(
            route('password.email'),
            { email },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setCurrentStep(2);
                },
                onError: (err) => {
                    setErrors(err);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post(
            route('password.verify-otp'),
            { email, otp },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setCurrentStep(4);
                },
                onError: (err) => {
                    setErrors(err);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post(
            route('password.store'),
            {
                email,
                otp,
                password: newPassword,
                password_confirmation: newPassword,
            },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setCurrentStep(5);
                },
                onError: (err) => {
                    setErrors(err);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const resendOTP = async () => {
        if (!canResendOtp) return;

        setIsSubmitting(true);
        setErrors({});

        try {
            await router.post(route('password.email'), { email });

            setOtpResendCount((prev) => prev + 1);
            setCanResendOtp(false);
            setResendTimer(30);

            const timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCanResendOtp(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            setErrors(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <ShoppingBag className="h-12 w-12 text-indigo-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* Step 1: Email Input */}
                    {currentStep === 1 && (
                        <div>
                            <p className="mb-6 text-center text-sm text-gray-600">
                                Enter your email to receive a password reset OTP and link
                            </p>
                            
                            <form onSubmit={handleSubmitEmail} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200"
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? 'Sending...' : 'Send OTP & Reset Link'}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center justify-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 mx-auto"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to login
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Email Sent Confirmation with Options */}
                    {currentStep === 2 && (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Check Your Email!</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                We've sent a 6-digit OTP and a password reset link to <span className="font-medium">{email}</span>.
                            </p>

                            <div className="mt-6 space-y-4">
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        setResetMethod('otp');
                                        setCurrentStep(3);
                                    }}
                                >
                                    Verify OTP
                                </button>

                                <p className="text-sm text-gray-500">OR</p>

                                <div className="rounded-lg bg-blue-50 p-3 text-left">
                                    <p className="text-sm text-blue-800">
                                        <strong>Prefer to use the link?</strong> Check your inbox for the password reset link.
                                        <br />
                                        <button onClick={() => setCurrentStep(1)} className="font-medium text-blue-600 hover:underline">
                                            Resend link
                                        </button>{' '}
                                        if you didn't receive it.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setCurrentStep(1)}
                                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 mx-auto"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to email input
                            </button>
                        </div>
                    )}

                    {/* Step 3: OTP Verification */}
                    {currentStep === 3 && (
                        <div>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="mb-4 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>

                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Key className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Verify OTP</h3>
                                <p className="text-sm text-gray-600">Enter the 6-digit code sent to {email}</p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                        OTP Code
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="otp"
                                            name="otp"
                                            type="text"
                                            maxLength={6}
                                            required
                                            className={`block w-full pl-10 pr-3 py-2 border ${errors.otp ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            placeholder="6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    {errors.otp && <p className="mt-2 text-sm text-red-600">{errors.otp}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-4 text-center text-sm text-gray-500">
                                {canResendOtp ? (
                                    <>
                                        Didn't receive OTP?{' '}
                                        <button
                                            onClick={resendOTP}
                                            disabled={isSubmitting}
                                            className="font-medium text-indigo-600 hover:underline disabled:text-gray-400"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-500">Resend OTP available in {resendTimer} seconds</span>
                                )}
                                {otpResendCount > 0 && (
                                    <div className="mt-2 text-xs text-gray-400">
                                        Resent {otpResendCount} time{otpResendCount !== 1 ? 's' : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Password Reset Form */}
                    {currentStep === 4 && (
                        <div>
                            <button
                                onClick={() => setCurrentStep(resetMethod === 'otp' ? 3 : 2)}
                                className="mb-4 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>

                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Lock className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
                                <p className="text-sm text-gray-600">Enter your new password below</p>
                            </div>

                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="new-password"
                                            required
                                            className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <button
                                                type="button"
                                                className="h-5 w-5 text-gray-400 hover:text-gray-500"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? 'Updating...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 5: Password Reset Success */}
                    {currentStep === 5 && (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Password Updated!</h3>
                            <p className="mt-2 text-sm text-gray-600">Your password has been successfully reset.</p>
                            <div className="mt-6">
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => (window.location.href = '/login')}
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;