import React from 'react';

const PromoBanners = () => {
  const banners = [
    {
      title: "Best Men's Fashion",
      subtitle: "",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Summer Sale",
      subtitle: "Collection",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "20% Off",
      subtitle: "Accessories",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className="relative h-64 overflow-hidden group"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0  bg-opacity-20"></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
              <h3 className="text-2xl font-bold mb-1">{banner.title}</h3>
              {banner.subtitle && (
                <p className="text-lg mb-4">{banner.subtitle}</p>
              )}
              <a 
                href={banner.link} 
                className="inline-block bg-white text-black px-6 py-2 font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;