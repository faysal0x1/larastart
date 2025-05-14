import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const MicroJobTalent = () => {
    const talents = [
        {
            name: 'Moturn A.',
            rating: 'A+',
            score: 100,
            description: 'I need to create an illustration of a blank blue marker on calm water, glowing clouds, soft gradient background',
        },
    ];

    return (
        <div className="gradient mx-auto my-12 max-w-7xl rounded-xl p-8 shadow-lg">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-light mb-2 text-3xl font-bold">Insert results.</h1>
                <h2 className="text-light mb-4 text-2xl font-semibold">Top talent.</h2>

                <div className="mb-6 flex items-start gap-3 rounded-lg p-4">
                    {/* <Sparkles className="text-primary mt-1 flex-shrink-0" size={20} /> */}
                    <p className="text-light">
                        Get what you need faster from freelancers who trained their own personal AI Creation Models. Now you can browse, prompt, and
                        generate instantly. And if you need a tweak or change, the freelancer is always there to help you perfect it.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-dark hover:bg-dark/90 flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white"
                >
                    <Zap size={18} />
                    Create Gig
                </motion.button>
            </div>

            {/* Divider */}
            {/* <div className="border-t border-gray-200 my-6"></div> */}
        </div>
    );
};

export default MicroJobTalent;