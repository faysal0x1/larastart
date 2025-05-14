// const gigs = [
//     {
//       id: 1,
//       title: "Design a modern logo",
//       description: "I'll design a professional logo for your brand with 3 concepts to choose from.",
//       price: "$50",
//       rating: 4.9,
//       reviews: 128,
//       category: "Design",
//       image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
//       seller: {
//         name: "Sarah Johnson",
//         avatar: "https://randomuser.me/api/portraits/women/32.jpg"
//       }
//     },
//     // Add more gigs similarly...
//   ];

const gigs = [
    {
        id: 1,
        title: "Design a modern logo",
        description: "I'll design a professional logo for your brand with 3 concepts to choose from.",
        price: "$50",
        rating: 4.9,
        reviews: 128,
        category: "Design",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        seller: {
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        }
    },
    {
        id: 2,
        title: "Write a 500-word blog post",
        description: "SEO-optimized blog post on any topic with proper research and engaging content.",
        price: "$25",
        rating: 4.8,
        reviews: 97,
        category: "Writing",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        seller: {
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        }
    },
    {
        id: 3,
        title: "Edit a 5-minute video",
        description: "Professional video editing with transitions, effects, color correction and audio mixing.",
        price: "$40",
        rating: 5.0,
        reviews: 204,
        category: "Video Editing",
        image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        seller: {
            name: "Emma Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    },
    {
        id: 4,
        title: "Data entry from PDF to Excel",
        description: "Accurate data entry from PDF documents to Excel with formatting and error checking.",
        price: "$0.50/page",
        rating: 4.7,
        reviews: 156,
        category: "Data Entry",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        seller: {
            name: "David Wilson",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        }
    }
];


const FeaturedGigs = ({microTasks}) => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base font-semibold tracking-wide text-primary uppercase">Featured Gigs</h2>
                    <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-dark sm:text-4xl">
                        Popular micro-jobs right now
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {microTasks.map((gig) => (
                        <div
                            key={gig.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-w-3 aspect-h-2 bg-gray-100">
                                <div className="aspect-w-3 aspect-h-2 bg-gray-100">
                                    {gig.thumbnails ? (
                                        <img
                                            src={`${window.location.origin}/storage/${gig.thumbnails}`}
                                            alt={gig.title}
                                            className="object-cover w-full h-48"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No thumbnail</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {/*<img className="h-10 w-10 rounded-full" src={gig.employer.photo || "https://randomuser.me/api/portraits/men/45.jpg"} alt={gig.employer.name} />*/}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{gig.employer.name}</p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <i className="fas fa-star text-yellow-400"></i>
                                            <span>{gig.rating || 0}</span>
                                            <span>({gig.reviews || 0})</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-dark">{gig.title}</h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                    {gig.description}
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-dark">{gig.budget}</span>
                                    <button className="text-sm font-medium text-primary hover:text-primary/80">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="#"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                    >
                        Browse All Gigs
                        <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGigs;