'use client';

import { Truck, PhoneCall, MailCheck, SmileIcon } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-white text-3xl" />,
    title: 'Free Shipping',
    description: 'On everything',
  },
  {
    icon: <PhoneCall className="text-white text-3xl" />,
    title: 'Give Us A Call',
    description: 'Or Whatsapp on - 8447496162',
  },
  {
    icon: <MailCheck className="text-white text-3xl" />,
    title: 'Bulk Inquiry',
    description: 'Email - chukutoys@gmail.com',
  },
  {
    icon: <SmileIcon className="text-white text-3xl" />,
    title: 'Chukutoys’s Quality Assurance',
    description: 'Every product is original, fresh and of high quality',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="bg-blue-600 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
