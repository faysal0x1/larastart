import React from 'react';

const BannerCard = ({ banner }) => {
    const {
        title,
        image,
        linkText,
        href,
        onClick
    } = banner;

    return (
        <div
            className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            <a href={href} target="_blank" rel="noopener noreferrer" className="block p-4">
                {/* Title */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-blue-900 leading-tight">
                        {title.split(',').map((line, index) => (
                            <div key={index}>{line.trim()}</div>
                        ))}
                    </h3>
                </div>

                {/* Image */}
                <div className="mb-4">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-32 object-contain"
                    />
                </div>

                {/* Link */}
                <div className="flex items-center text-blue-900 font-medium">
                    <span>{linkText}</span>
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </a>
        </div>
    );
};

export default BannerCard;
