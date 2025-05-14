import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, Code, Eye, EyeOff, Lock, Mail, Palette, Rocket, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const SignupPage = () => {
    // const [data, setData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    const { data, setData, post, reset } = useForm({
        name: '',
        username:'',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        {
            icon: <Rocket className="h-5 w-5" />,
            title: 'Launch your freelance career',
            description: 'Get started in minutes and begin your professional journey',
        },
        {
            icon: <Code className="h-5 w-5" />,
            title: 'Connect with top tech talent',
            description: 'Find skilled developers and designers for your projects',
        },
        {
            icon: <Palette className="h-5 w-5" />,
            title: 'Find creative professionals',
            description: 'Discover artists, writers, and multimedia experts',
        },
        {
            icon: <BarChart className="h-5 w-5" />,
            title: 'Grow your business metrics',
            description: 'Track performance and improve your outcomes',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Validate form
        const newErrors = {};
        if (!data.name) newErrors.name = 'Name is required';
        if (!data.username) newErrors.username = 'Username is required';
        if (!data.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
        if (!data.password) newErrors.password = 'Password is required';
        else if (data.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = "Passwords don't match";
        }

        setErrors(newErrors);

        post(route('register'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
                {/* Left side - Sign Up Form */}
                <div className="w-full p-6 md:w-1/2 md:p-8 lg:p-10">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Create Your Account</h1>
                        <p className="mt-2 text-gray-500">Sign up and start your journey today</p>
                    </div>

                    <div className="space-y-5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">

                                <div className="grid gap-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            className={`w-full rounded-lg border py-3 pr-4 pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} transition-all duration-200 focus:border-transparent`}
                                            value={data.name}
                                            onChange={handleChange}
                                            disabled={processing}
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="User Name"
                                            className={`w-full rounded-lg border py-3 pr-4 pl-10 ${errors.username ? 'border-red-500 focus:ring-red-500' :
                                                'border-gray-300 focus:ring-blue-500'} transition-all duration-200 focus:border-transparent`}
                                            value={data.username}
                                            onChange={handleChange}
                                            disabled={processing}
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            className={`w-full rounded-lg border py-3 pr-4 pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} transition-all duration-200 focus:border-transparent`}
                                            value={data.email}
                                            onChange={handleChange}
                                            disabled={processing}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            className={`w-full rounded-lg border py-3 pr-10 pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} transition-all duration-200 focus:border-transparent`}
                                            value={data.password}
                                            onChange={handleChange}
                                            disabled={processing}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            placeholder="Confirm Password"
                                            className={`w-full rounded-lg border py-3 pr-10 pl-10 ${errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} transition-all duration-200 focus:border-transparent`}
                                            value={data.password_confirmation}
                                            onChange={handleChange}
                                            disabled={processing}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>}
                                </div>
                            </div>

                            {/*<button*/}
                            {/*    onClick={handleSubmit}*/}
                            {/*    disabled={processing}*/}
                            {/*    className={`mt-2 flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}*/}
                            {/*>*/}
                            {/*    {processing ? <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> : null}*/}
                            {/*    Create Account {!processing && <ArrowRight className="ml-2 h-4 w-4" />}*/}
                            {/*</button>*/}

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
                                        Register <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right side - Feature Showcase */}
                <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:flex md:p-10">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-white">
                        <h2 className="mb-6 text-3xl font-bold">Build your professional profile</h2>
                        <p className="mb-10 text-blue-100">Join thousands of professionals on our platform</p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 rounded-lg bg-white/10 p-2">{features[currentFeature].icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold">{features[currentFeature].title}</h3>
                                    <p className="mt-1 text-blue-100">{features[currentFeature].description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center space-x-2">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentFeature(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${currentFeature === index ? 'w-6 bg-white' : 'bg-blue-300/50'}`}
                                    aria-label={`Feature ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
