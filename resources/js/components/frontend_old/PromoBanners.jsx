const PromoBanners = ({categories}) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {categories.map((item, index) => (
                    <div key={index} className="group relative h-64 overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${item.image_url})` }}
                        >
                            <div className="bg-opacity-20 absolute inset-0"></div>
                        </div>

                        {/* Content */}
                        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center text-white">
                            <h3 className="mb-1 text-2xl font-bold">{item.title}</h3>
                            {item.subtitle && <p className="mb-4 text-lg">{item.subtitle}</p>}
                            <a
                                href={item.link}
                                className="inline-block bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-100"
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
