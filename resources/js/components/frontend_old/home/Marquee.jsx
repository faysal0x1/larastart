import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

const marqueeItems = Array(10).fill("Spring Clearance Event: Save Up to 70%");

const Marquee = () => {
  return (
    <div className="bg-yellow-200 overflow-hidden whitespace-nowrap py-2">
      <div className="inline-flex animate-marquee gap-8">
        {marqueeItems.map((text, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 text-black font-semibold"
          >
            <ArrowRight className="w-4 h-5" />
            <Link href="#" className="hover:underline">
              {text}
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
