import {
  PhoneCall,
  Undo2,
  BadgeCheck,
  Truck
} from "lucide-react";

const features = [
  {
    icon: <PhoneCall className="w-10 h-10 text-black mb-4" />,
    title: "24/7 Customer Service",
    description:
      "We're here to help you with any questions or concerns you have, 24/7.",
  },
  {
    icon: <Undo2 className="w-10 h-10 text-black mb-4" />,
    title: "14-Day Money Back",
    description:
      "If you're not satisfied with your purchase, simply return it within 14 days for a refund.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-black mb-4" />,
    title: "Our Guarantee",
    description:
      "We stand behind our products and services and guarantee your satisfaction.",
  },
  {
    icon: <Truck className="w-10 h-10 text-black mb-4" />,
    title: "Shipping Worldwide",
    description:
      "We ship our products worldwide, making them accessible to customers everywhere.",
  },
];

export default function InfoFeatures() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-3xl shadow-sm text-center px-6 py-8"
          >
            <span>{feature.icon}</span>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
