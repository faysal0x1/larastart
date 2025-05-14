import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

const RecentExperience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Figma',
      period: '2022 - Now',
      description: 'Design and develop new visual concepts across various platforms.'
    },
    {
      id: 2, 
      title: 'Product Designer',
      company: 'Notion',
      period: '2020 - 2022',
      description: 'Created new interfaces and components for productivity tools.'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Photoshop',
      period: '2017 - 2020',
      description: 'Designed interfaces for creative applications and graphics tools.'
    }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {experiences.map((exp, index) => (
        <div 
          key={exp.id} 
          className={`flex ${index < experiences.length - 1 ? 'border-b border-gray-200 pb-4 mb-4' : ''}`}
        >
          <div className="mr-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Briefcase size={20} className="text-gray-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar size={14} className="mr-1" />
              <span>{exp.period}</span>
            </div>
            <h4 className="font-bold">{exp.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentExperience;