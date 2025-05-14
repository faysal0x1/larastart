import { ArrowRight, BarChart, Code, Eye, EyeOff, Lock, Mail, Palette, Rocket } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TextLink from '@/components/text-link.jsx';
import { useForm } from '@inertiajs/react';



export default function Login({ status, canResetPassword, socialLoginConfig }) {
    const [showPassword, setShowPassword] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const features = [
        { icon: <Rocket className="h-5 w-5" />, text: 'Launch your freelance career' },
        { icon: <Code className="h-5 w-5" />, text: 'Connect with top tech talent' },
        { icon: <Palette className="h-5 w-5" />, text: 'Find creative professionals' },
        { icon: <BarChart className="h-5 w-5" />, text: 'Grow your business metrics' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
        //     <Head title="Log in" />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
                {/* Left side - Feature Showcase */}
                <div className="relative flex w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:w-1/2 md:p-10">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-white">
                        <h2 className="mb-6 text-3xl font-bold">Join the world's largest freelancing platform</h2>
                        <p className="mb-10 text-blue-100">Connect with clients and grow your business on our trusted platform</p>

                        <div className="space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentFeature}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="mt-1 flex-shrink-0">{features[currentFeature].icon}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{features[currentFeature].text}</h3>
                                        <p className="mt-1 text-blue-100">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-12 flex justify-center space-x-2">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentFeature(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${currentFeature === index ? 'w-4 bg-white' : 'bg-blue-400'}`}
                                    aria-label={`Feature ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full p-8 md:w-1/2 md:p-10"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                        <p className="mt-2 text-gray-500">Login to access your freelancer dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} py-3 pr-4 pl-10 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} py-3 pr-10 pl-10 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            {canResetPassword && (
                                <div className="text-sm">
                                    <a href={route('password.request')} className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={processing}
                            className={`flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {processing ? (
                                <svg
                                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                <>
                                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <motion.div whileHover={{ y: -2 }} className="transition-all duration-200">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </motion.div>
                            <motion.div whileHover={{ y: -2 }} className="transition-all duration-200">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </motion.div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <TextLink href={route('register')} className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                                    Sign up
                                </TextLink>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        // </AuthLayout>
    );
}
