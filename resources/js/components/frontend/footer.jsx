const Footer = () => {
    const links = [
        {
            title: "Company",
            items: ["About Us", "Careers", "Press", "Blog"]
        },
        {
            title: "Support",
            items: ["Help Center", "Safety Center", "Community Guidelines"]
        },
        {
            title: "Legal",
            items: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
        }
    ];

    const socialIcons = ["facebook-f", "twitter", "instagram", "linkedin-in"];

    return (
        <footer className="bg-[#080808] text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {links.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">{section.title}</h3>
                            <ul className="mt-4 space-y-2">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-gray-300 hover:text-white">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                        <div className="mt-4 flex space-x-6">
                            {socialIcons.map((icon) => (
                                <a key={icon} href="#" className="text-gray-300 hover:text-white">
                                    <i className={`fab fa-${icon}`}></i>
                                </a>
                            ))}
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-300">
                                © 2023 MicroJob. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;