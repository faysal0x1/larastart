

const FeaturedGigs = () => {
    return (
        <div className="gradient-bg text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Ready to get started?
                        </h2>
                        <p className="mt-3 max-w-3xl text-lg">
                            Join thousands of businesses and freelancers using MicroJob to get work done.
                        </p>
                        <div className="mt-8 sm:flex">
                            <div className="rounded-md shadow">
                                <a href="#" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                                    Post a Job
                                </a>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <a href="#" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary/20 hover:bg-primary/30 md:py-4 md:text-lg md:px-10">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-xl font-bold">Micro Job Referral Program</h3>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base">Sign up and complete tasks</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base">Refer freelancers or employers</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base">Earn money from micro-jobs</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base">Earn rewards for referrals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGigs;