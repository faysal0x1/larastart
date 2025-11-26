// import React from 'react';

// const NewsletterSignup = () => {
//   return (
//     <div className="bg-gray-50 py-16 px-4">
//       <div className="max-w-2xl mx-auto text-center">
//         {/* Title */}
//         <h2 className="text-3xl font-bold mb-4 tracking-tight">Sign Up And Get 10% Off</h2>
        
//         {/* Subtitle */}
//         <p className="text-gray-600 mb-8 text-lg">
//           Sign up for early sale access, new in, promotions and more
//         </p>
        
//         {/* Email Input and Button */}
//         <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto shadow-sm">
//           {/* Email Input */}
//           <input
//             type="email"
//             placeholder="Enter your e-mail"
//             className="flex-grow px-5 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-700"
//           />
          
//           {/* Subscribe Button */}
//           <button className="bg-black text-black px-8 py-3 font-medium hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm">
//             SUBSCRIBE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsletterSignup;


import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="bg-[#d2ef9a] rounded-3xl px-6 py-16 mx-auto max-w-7xl text-center text-black">
      <h2 className="text-3xl font-bold mb-2">Sign Up And Get 10% Off</h2>
      <p className="text-[#102e50] mb-6">
        Sign up for early sale access, new in, promotions and more
      </p>
      <form className="max-w-xl mx-auto flex rounded-full overflow-hidden bg-white">
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="w-full px-5 py-3 text-black placeholder-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#102e50] text-white font-semibold px-6 hover:bg-[#102e50]transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
}
