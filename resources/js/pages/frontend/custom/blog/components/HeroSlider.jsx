import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Featured posts data with Unsplash images
const featuredPosts = [
  {
    title: 'Remote Work Trends in the Digital Age',
    excerpt: 'Discover how technology and connectivity have enabled more people to work remotely and what this means for business.',
    date: 'September 27, 2024',
    author: 'Ethan Caldwell',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    tags: ['Work', 'Remote'],
    color: 'bg-rose-300'
  },
  {
    title: 'Sustainable Living in Urban Areas',
    excerpt: 'Learn about innovative approaches to sustainable living that are transforming our cities into eco-friendly spaces.',
    date: 'October 5, 2024',
    author: 'Maya Rodriguez',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    tags: ['Environment', 'Urban'],
    color: 'bg-teal-300'
  },
  {
    title: 'The Future of AI in Everyday Life',
    excerpt: 'How artificial intelligence is becoming seamlessly integrated into our daily routines and what to expect next.',
    date: 'October 12, 2024',
    author: 'David Kim',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    tags: ['Technology', 'AI'],
    color: 'bg-indigo-300'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const featuredPost = featuredPosts[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) { // Only auto-slide when not hovered
        nextSlide();
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]); // Reset timer when index changes or hover state changes

  return (
    <div 
      className={`relative ${featuredPost.color} rounded-lg mb-8 overflow-hidden transition-colors duration-500 h-[32rem]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container with increased vertical padding */}
      <div className="container mx-auto px-4 py-16 md:py-24 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center h-full">
          {/* Text/content column - takes full height */}
          <div className="md:w-1/2 mb-8 md:mb-0 h-full flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs mb-4 w-fit">
              <span className="bg-white text-black px-2 py-0.5 rounded-full">NEW</span>
              <span>{featuredPost.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {featuredPost.title}
            </h1>
            
            <p className="text-white/90 mb-6 text-lg">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center space-x-4">
              <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition text-lg">
                Read Article
              </button>
              <span className="text-white text-sm">By {featuredPost.author}</span>
            </div>
          </div>
          
          {/* Image column - takes full height */}
          <div className="md:w-1/2 flex justify-center items-center h-full">
            <div className="relative h-full max-h-[500px]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="rounded-lg shadow-lg transform rotate-3 w-full h-full object-cover"
              />
              {/* Visual elements */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-300 rounded-lg transform rotate-12"></div>
              <div className="absolute top-8 -right-6 w-12 h-12 bg-white/50 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredPosts.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows - only visible on hover */}
      <button 
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSlider;