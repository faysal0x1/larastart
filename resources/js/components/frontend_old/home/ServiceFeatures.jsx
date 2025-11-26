import { BadgeCheck, PhoneCall, Truck, Undo2 } from 'lucide-react';

const features = [
    {
        icon: <PhoneCall className="mb-4 h-10 w-10 text-black" />,
        title: '24/7 Customer Service',
        description: "We're here to help you with any questions or concerns you have, 24/7.",
    },
    {
        icon: <Undo2 className="mb-4 h-10 w-10 text-black" />,
        title: '14-Day Money Back',
        description: "If you're not satisfied with your purchase, simply return it within 14 days for a refund.",
    },
    {
        icon: <BadgeCheck className="mb-4 h-10 w-10 text-black" />,
        title: 'Our Guarantee',
        description: 'We stand behind our products and services and guarantee your satisfaction.',
    },
    {
        icon: <Truck className="mb-4 h-10 w-10 text-black" />,
        title: 'Shipping Worldwide',
        description: 'We ship our products worldwide, making them accessible to customers everywhere.',
    },
];

export default function ServiceFeatures() {
    return (
        <section className="bg-gray-50 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center rounded-3xl bg-white px-6 py-8 text-center shadow-sm">
                        <span>{feature.icon}</span>
                        <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
