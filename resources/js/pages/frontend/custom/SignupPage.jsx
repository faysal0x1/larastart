import { useState, useEffect } from 'react';
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, Rocket, Code, Palette, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import '../../../../css/loader.css'

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: <Rocket className="w-5 h-5" />, text: "Launch your freelance career" },
    { icon: <Code className="w-5 h-5" />, text: "Connect with top tech talent" },
    { icon: <Palette className="w-5 h-5" />, text: "Find creative professionals" },
    { icon: <BarChart className="w-5 h-5" />, text: "Grow your business metrics" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign up functionality would connect to your backend');
    }, 1500);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Sign up and start your freelance journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href={route('loginEx')} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Login
              </a>
            </p>
          </div>
        </motion.div>


        {/* Right side - Feature Showcase (hidden on small screens) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-10 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Build your freelance presence</h2>
            <p className="text-blue-100 mb-10">Create your profile and start getting work</p>

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
                  <div className="flex-shrink-0 mt-1">
                    {features[currentFeature].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{features[currentFeature].text}</h3>
                    <p className="text-blue-100 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex space-x-2 justify-center">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all ${currentFeature === index ? 'bg-white w-4' : 'bg-blue-400'}`}
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
