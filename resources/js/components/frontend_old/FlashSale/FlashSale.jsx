
import React, { useState, useEffect } from 'react';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your target end date (24 hours from now)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f8f3ed] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Flash Sale Title */}
        <h2 className="text-4xl font-bold mb-2">Flash Sale!</h2>
        
        {/* Discount Offer */}
        <p className="text-xl mb-8">Get 20% off if you spend 120$ or more!</p>
        
        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 mb-8">
          {/* Days */}
          <div className="text-center">
            <div className="text-3xl font-bold bg-white p-4 rounded w-20">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm mt-2">DAYS</div>
          </div>
          
          {/* Hours */}
          <div className="text-center">
            <div className="text-3xl font-bold bg-white p-4 rounded w-20">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm mt-2">HOURS</div>
          </div>
          
          {/* Minutes */}
          <div className="text-center">
            <div className="text-3xl font-bold bg-white p-4 rounded w-20">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm mt-2">MINUTES</div>
          </div>
          
          {/* Seconds */}
          <div className="text-center">
            <div className="text-3xl font-bold bg-white p-4 rounded w-20">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm mt-2">SECONDS</div>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
          GET IT NOW
        </button>
      </div>
    </div>
  );
};

export default FlashSale;