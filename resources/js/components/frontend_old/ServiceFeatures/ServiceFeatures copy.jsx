import React from 'react';
import { Headphones, RefreshCw, Shield, Truck } from 'lucide-react';

const ServiceFeatures = () => {
  const features = [
    {
      icon: <Headphones size={32} className="text-gray-700" />,
      title: "24/7 Customer Service",
      description: "We've have to help you with any questions or concerns you have, 24/7."
    },
    {
      icon: <RefreshCw size={32} className="text-gray-700" />,
      title: "14-Day Money Back",
      description: "If you're not satisfied with your purchase, simply return it within 14 days for a refund."
    },
    {
      icon: <Shield size={32} className="text-gray-700" />,
      title: "Our Guarantee",
      description: "We stand behind our products and services and guarantee your satisfaction."
    },
    {
      icon: <Truck size={32} className="text-gray-700" />,
      title: "Shipping Worldwide",
      description: "We ship our products worldwide, making them accessible to customers everywhere."
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;