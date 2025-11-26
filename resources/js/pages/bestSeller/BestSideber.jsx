const BestSidebar = () => {
    const departments = [
        'Components & Storage',
        'Computer Systems',
        'Computer Peripherals',
        'Server & Components',
        'Appliances',
        'Electronics',
        'Gaming & VR',
        'Networking',
        'Smart Home & Security',
        'Office Solutions',
        'Software & Services',
        'Networking',
        'Smart Home & Security',
        'Office Solutions',
        'Software & Services',
    ];

    return (
        <div className="gap-20px left-0.5 rounded-lg bg-gray-100">
            {/* Department Header */}
            <div className="rounded-t-lg bg-gray-200 px-4 py-2">
                <h2 className="text-base font-bold tracking-wide text-gray-800 uppercase">DEPARTMENT</h2>
            </div>

            {/* Department List */}
            <div className="px-6 py-0">
                <ul className="space-y-4">
                    {departments.map((department, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="-mx-2 block rounded px-0 py-2 text-base text-gray-800 transition-colors duration-150 hover:bg-gray-100 hover:text-blue-600"
                            >
                                {department}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BestSidebar;
