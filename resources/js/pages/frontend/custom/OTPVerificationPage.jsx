import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, Check, ArrowLeft, RotateCw } from 'lucide-react';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('user@example.com'); // Pre-filled from previous step
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) { // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteData.length, 3)].focus();
    }
  };

  // Resend OTP
  const handleResend = () => {
    setIsResending(true);
    setCountdown(30);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
    }, 1000);
  };

  // Submit OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationSuccess(true);
    }, 1500);
  };

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.2,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              transition: {
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!verificationSuccess ? (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <button
                onClick={() => window.history.back()}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Mail className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
                <p className="text-gray-500 mt-2">
                  We sent a code to <span className="font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center space-x-3">
                  {[0, 1, 2, 3].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                      whileFocus={{ y: -2 }}
                    >
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        className="w-16 h-16 text-3xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={otp[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        required
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      Resend code in {countdown}s
                    </p>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1 mx-auto"
                    >
                      {isResending ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RotateCw className="w-4 h-4" />
                          Resend code
                        </>
                      )}
                    </motion.button>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || otp.some(digit => !digit)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isSubmitting || otp.some(digit => !digit)
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.6 }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => window.location.href = '/loginEx'} // Redirect to dashboard
              >
                Continue to Dashboard
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OTPVerificationPage;