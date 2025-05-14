import { motion } from 'framer-motion';
import { BadgeCheck, Users, Settings, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

const ProComponent = () => {
  const features = [
    {
      icon: <Users size={24} className="text-blue-600" />,
      title: "Dedicated hiring experts",
      description: "Count on an account manager to find you the right talent and see to your project's every need."
    },
    {
      icon: <Settings size={24} className="text-blue-600" />,
      title: "Advanced management tools",
      description: "Seamlessly integrate freelancers into your team and projects."
    },
    {
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      description: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries."
    },
    {
      icon: <Clock size={24} className="text-blue-600" />,
      title: "Flexible payment models",
      description: "Pay per project or opt for hourly rates to facilitate longer-term collaboration."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#e8faf4] rounded-xl shadow-lg mb-12 ">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <BadgeCheck className="text-green-600" size={24} />
          <span className="text-xl font-bold text-gray-800">pro.</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          The premium freelance solution for businesses
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-2 mx-auto"
        >
          Try Now
          <ArrowRight size={20} />
        </motion.button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="p-6  rounded-xl hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8">

      </div>

      {/* Project Status Section */}
      {/* <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Project Status</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">2021</span>
            <span className="text-gray-500">& show out of 5</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">$8,900</div>
          <div className="flex gap-4 text-gray-600 mt-2">
            <span>Jim</span>
            <span>Fob</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProComponent;