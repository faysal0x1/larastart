// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Check, ArrowLeft, Key, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
//
// const ForgotPasswordPage = () => {
//   // resend otp
//   const [otpResendCount, setOtpResendCount] = useState(0);
//   const [canResendOtp, setCanResendOtp] = useState(true);
//   const [resendTimer, setResendTimer] = useState(0);
//   // end
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1); // 1 = Email input, 2 = Success, 3 = OTP verification, 4 = Reset form
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [resetMethod, setResetMethod] = useState(''); // 'otp' or 'link'
//
//
//   // Resend OTP function
//   const resendOTP = async () => {
//     if (!canResendOtp) return;
//
//     setIsSubmitting(true);
//
//     // Simulate API call to resend OTP
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
//
//       // In a real app, you would call your API here
//       // await api.resendOTP(email);
//
//       // Update state
//       setOtpResendCount(prev => prev + 1);
//       setCanResendOtp(false);
//       setResendTimer(30); // 30 seconds cooldown
//
//       // Start countdown timer
//       const timer = setInterval(() => {
//         setResendTimer(prev => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             setCanResendOtp(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//
//       // Show success message (you might want to use a toast in a real app)
//       alert(`New OTP sent to ${email}`);
//     } catch (error) {
//       alert('Failed to resend OTP. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // end here
//
//   const handleSubmitEmail = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//
//     // Simulate API call to send OTP and reset link
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setCurrentStep(2); // Show success message with options
//     }, 1500);
//   };
//
//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//
//     // Simulate OTP verification
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setCurrentStep(4); // Move to password reset form
//     }, 1500);
//   };
//
//   const handleResetPassword = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//
//     // Simulate API call to reset password
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setCurrentStep(5); // Show final success
//     }, 1500);
//   };
//
//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
//
//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 }
//   };
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{
//               x: Math.random() * 100,
//               y: Math.random() * 100,
//               opacity: 0.2,
//               scale: Math.random() * 0.5 + 0.5
//             }}
//             animate={{
//               x: [null, Math.random() * 100],
//               y: [null, Math.random() * 100],
//               transition: {
//                 duration: Math.random() * 15 + 10,
//                 repeat: Infinity,
//                 repeatType: 'reverse'
//               }
//             }}
//             className="absolute rounded-full bg-blue-400/20"
//             style={{
//               width: `${Math.random() * 10 + 5}px`,
//               height: `${Math.random() * 10 + 5}px`,
//             }}
//           />
//         ))}
//       </div>
//
//       {/* Main card */}
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl z-10 overflow-hidden"
//       >
//         <AnimatePresence mode="wait">
//           {/* Step 1: Email Input */}
//           {currentStep === 1 && (
//             <motion.div
//               key="email-step"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-8"
//             >
//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: 'spring', stiffness: 200 }}
//                   className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
//                 >
//                   <Key className="w-8 h-8 text-blue-600" />
//                 </motion.div>
//                 <h1 className="text-2xl font-bold text-gray-800">Forgot Password?</h1>
//                 <p className="text-gray-500 mt-2">
//                   Enter your email to receive a reset OTP and link
//                 </p>
//               </div>
//
//               <motion.form
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 onSubmit={handleSubmitEmail}
//                 className="space-y-6"
//               >
//                 <motion.div variants={item}>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       placeholder="Your email address"
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </motion.div>
//
//                 <motion.div variants={item}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                       }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                         Sending...
//                       </>
//                     ) : (
//                       'Send OTP & Reset Link'
//                     )}
//                   </motion.button>
//                 </motion.div>
//               </motion.form>
//
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="mt-6 text-center"
//               >
//                 <button
//                   onClick={() => window.history.back()}
//                   className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1 mx-auto"
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                   Back to login
//                 </button>
//               </motion.div>
//             </motion.div>
//           )}
//
//           {/* Step 2: Email Sent Confirmation with Options */}
//           {currentStep === 2 && (
//             <motion.div
//               key="success-step"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-8 text-center"
//             >
//               <motion.div
//                 animate={{
//                   rotate: [0, 10, -10, 0],
//                   scale: [1, 1.1, 1]
//                 }}
//                 transition={{ duration: 0.5 }}
//                 className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
//               >
//                 <Check className="w-10 h-10 text-green-600" />
//               </motion.div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email!</h2>
//               <p className="text-gray-600 mb-6">
//                 We've sent a 6-digit OTP and a password reset link to <span className="font-medium">{email}</span>.
//               </p>
//
//               <div className="space-y-4 mb-6">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg"
//                   onClick={() => {
//                     setResetMethod('otp');
//                     setCurrentStep(3);
//                   }}
//                 >
//                   Verify OTP
//                 </motion.button>
//
//                 <p className="text-gray-500 text-sm">OR</p>
//
//                 <div className="bg-blue-50 p-4 rounded-lg text-left">
//                   <p className="text-sm text-blue-800">
//                     <strong>Prefer to use the link?</strong> Check your inbox for the password reset link.
//                     <br />
//                     <button
//                       onClick={() => setCurrentStep(1)}
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       Resend link
//                     </button> if you didn't receive it.
//                   </p>
//                 </div>
//               </div>
//
//               <button
//                 onClick={() => setCurrentStep(1)}
//                 className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1 mx-auto"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to email input
//               </button>
//             </motion.div>
//           )}
//
//           {/* Step 3: OTP Verification */}
//           {/* {currentStep === 3 && (
//             <motion.div
//               key="otp-step"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-8"
//             > */}
//           {/* // Update the OTP verification step to include the resend functionality */}
//           {currentStep === 3 && (
//             <motion.div
//               key="otp-step"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-8"
//             >
//               <button
//                 onClick={() => setCurrentStep(2)}
//                 className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1 mb-6"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </button>
//
//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: 'spring' }}
//                   className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
//                 >
//                   <Key className="w-8 h-8 text-blue-600" />
//                 </motion.div>
//                 <h1 className="text-2xl font-bold text-gray-800">Verify OTP</h1>
//                 <p className="text-gray-500 mt-2">
//                   Enter the 6-digit code sent to {email}
//                 </p>
//               </div>
//
//               <motion.form
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 onSubmit={handleVerifyOtp}
//                 className="space-y-6"
//               >
//                 <motion.div variants={item}>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Key className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="6-digit OTP"
//                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       maxLength={6}
//                       required
//                     />
//                   </div>
//                 </motion.div>
//
//                 <motion.div variants={item}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                       }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                         Verifying...
//                       </>
//                     ) : (
//                       'Verify & Continue'
//                     )}
//                   </motion.button>
//                 </motion.div>
//               </motion.form>
//
//               <div className="mt-4 text-center text-sm text-gray-500">
//                 {canResendOtp ? (
//                   <>
//                     Didn't receive OTP?{' '}
//                     <button
//                       onClick={resendOTP}
//                       disabled={isSubmitting}
//                       className="text-blue-600 hover:underline font-medium disabled:text-gray-400"
//                     >
//                       {isSubmitting ? 'Sending...' : 'Resend OTP'}
//                     </button>
//                   </>
//                 ) : (
//                   <span className="text-gray-500">
//                     Resend OTP available in {resendTimer} seconds
//                   </span>
//                 )}
//                 {otpResendCount > 0 && (
//                   <div className="mt-2 text-xs text-gray-400">
//                     Resent {otpResendCount} time{otpResendCount !== 1 ? 's' : ''}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//
//           {/* Step 4: Password Reset Form */}
//           {currentStep === 4 && (
//             <motion.div
//               key="reset-step"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-8"
//             >
//               <button
//                 onClick={() => setCurrentStep(resetMethod === 'otp' ? 3 : 2)}
//                 className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1 mb-6"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </button>
//
//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: 'spring' }}
//                   className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
//                 >
//                   <Lock className="w-8 h-8 text-blue-600" />
//                 </motion.div>
//                 <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
//                 <p className="text-gray-500 mt-2">
//                   Enter your new password below
//                 </p>
//               </div>
//
//               <motion.form
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 onSubmit={handleResetPassword}
//                 className="space-y-6"
//               >
//                 <motion.div variants={item}>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="New password"
//                       className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//
//                 <motion.div variants={item}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                       }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                         Updating...
//                       </>
//                     ) : (
//                       'Reset Password'
//                     )}
//                   </motion.button>
//                 </motion.div>
//               </motion.form>
//             </motion.div>
//           )}
//
//           {/* Step 5: Password Reset Success */}
//           {currentStep === 5 && (
//             <motion.div
//               key="reset-success"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="p-8 text-center"
//             >
//               <motion.div
//                 animate={{
//                   rotate: [0, 10, -10, 0],
//                   scale: [1, 1.2, 1]
//                 }}
//                 transition={{ duration: 0.6 }}
//                 className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
//               >
//                 <Check className="w-10 h-10 text-green-600" />
//               </motion.div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Updated!</h2>
//               <p className="text-gray-600 mb-6">
//                 Your password has been successfully reset.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={() => window.location.href = "/loginEx"} // Redirect to login
//               >
//                 Back to Login
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };
//
// export default ForgotPasswordPage;