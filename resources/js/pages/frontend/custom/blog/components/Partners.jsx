import React from 'react';

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: 'Helpful References 👍',
      description: 'Curated list of helpful articles and resources on programming, design, and productivity.'
    },
    {
      id: 2,
      name: 'Latest Tech Gadgets 📱',
      description: 'Discover the newest technology gadgets to enhance your workflow and daily routines.'
    },
    {
      id: 3,
      name: 'Trends for 2024 📈',
      description: 'Stay ahead of the curve with our list of upcoming trends in tech, design, and business.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {partners.map((partner) => (
        <div 
          key={partner.id}
          className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
        >
          <h3 className="font-bold mb-2">{partner.name}</h3>
          <p className="text-sm text-gray-600">{partner.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Partners;