import React, { useEffect, useState } from 'react';

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
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
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#f8f3ed] px-4 py-12">
            <div className="mx-auto max-w-4xl text-center">
                {/* Flash Sale Title */}
                <h2 className="mb-2 text-4xl font-bold">Flash Sale!</h2>

                {/* Discount Offer */}
                <p className="mb-8 text-xl">Get 20% off if you spend 120$ or more!</p>

                {/* Countdown Timer */}
                <div className="mb-8 flex justify-center gap-4">
                    {/* Days */}
                    <div className="text-center">
                        <div className="w-20 rounded bg-white p-4 text-3xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                        <div className="mt-2 text-sm">DAYS</div>
                    </div>

                    {/* Hours */}
                    <div className="text-center">
                        <div className="w-20 rounded bg-white p-4 text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                        <div className="mt-2 text-sm">HOURS</div>
                    </div>

                    {/* Minutes */}
                    <div className="text-center">
                        <div className="w-20 rounded bg-white p-4 text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                        <div className="mt-2 text-sm">MINUTES</div>
                    </div>

                    {/* Seconds */}
                    <div className="text-center">
                        <div className="w-20 rounded bg-white p-4 text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                        <div className="mt-2 text-sm">SECONDS</div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="bg-black px-8 py-3 font-bold tracking-wider text-white uppercase transition-colors hover:bg-gray-800">
                    GET IT NOW
                </button>
            </div>
        </div>
    );
};

export default FlashSale;
