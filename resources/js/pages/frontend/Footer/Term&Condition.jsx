import { Head } from '@inertiajs/react';
import { useState } from 'react';

const TermsAndConditions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchableContent = [
        {
            id: 'about-us',
            title: '1. About us',
            content:
                'We discuss with our affiliates and subsidiaries are companies. Our addresses is Customer Center Dr. Suite 100, City, State, Zip. You can find additional information about our affiliates in these Terms.',
        },
        {
            id: 'use-of-site',
            title: '2. Use of the Site',
            content:
                'Eligibility: You must be at least 18 years old to use this Site. License: Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Site for your personal, non-commercial use. Restrictions: You may not: (a) use the Site for any commercial purpose; (b) modify, adapt, alter, translate, or create derivative works of the Site; (c) remove any copyright, trademark, or other proprietary notices from the Site.',
        },
        {
            id: 'posting-content',
            title: '3. Posting content on the Site',
            content:
                'By posting content on the Site, you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content.',
        },
        {
            id: 'registering',
            title: '4. Registering for an account',
            content:
                'To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information.',
        },
        {
            id: 'placing-order',
            title: '5. Placing an order',
            content:
                'When you place an order, you are making an offer to purchase the products at the listed price. We reserve the right to accept or decline your order.',
        },
        {
            id: 'products',
            title: '6. Products',
            content:
                'We strive to provide accurate product information, but we do not warrant that product descriptions are accurate, complete, or error-free.',
        },
        {
            id: 'programs',
            title: '7. Programs',
            content: 'We may offer various programs and services. Participation in these programs is subject to additional terms and conditions.',
        },
        {
            id: 'gift-cards',
            title: '8. Gift Cards',
            content:
                'Gift cards are subject to the terms and conditions specified at the time of purchase. Gift cards have no expiration date and are not redeemable for cash.',
        },
        {
            id: 'promotions',
            title: '9. Promotions',
            content: 'Promotions, discounts, and special offers are subject to specific terms and conditions.',
        },
        {
            id: 'content-on-site',
            title: '10. Content on the Site',
            content:
                'All content on the Site is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws.',
        },
        {
            id: 'reporting-claims',
            title: '11. Reporting claims of infringement of intellectual property rights',
            content:
                'If you believe that content on our Site infringes your intellectual property rights, please contact us with detailed information.',
        },
        {
            id: 'incorporated-policies',
            title: '12. Incorporated policies',
            content: 'These Terms incorporate by reference our Privacy Policy and other policies posted on the Site.',
        },
        {
            id: 'general-terms',
            title: '13. General terms',
            content: 'These Terms constitute the entire agreement between you and us regarding your use of the Site.',
        },
    ];

    const handleSearch = (query) => {
        setSearchTerm(query);
        setIsSearching(true);

        if (!query.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const results = searchableContent.filter(
            (item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase()),
        );

        setSearchResults(results);
        setIsSearching(false);
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text;

        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setSearchTerm('');
            setSearchResults([]);
        }
    };

    return (
        <>
            <Head title="Terms and Conditions" />
            <header className="bg-gray-700 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
                    <div className="flex items-center justify-center sm:justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://tbz.com.bd/images/website/174523155388191193.png"
                                alt="Company Logo"
                                className="h-12 w-auto sm:h-16 lg:h-20"
                            />
                        </div>
                        <nav className="hidden sm:flex" aria-label="Breadcrumb"></nav>
                    </div>
                </div>
            </header>
            <div className="min-h-screen bg-gray-100">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-7 lg:px-8">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            {/* Breadcrumb Navigation */}
                            <nav className="text-xs text-gray-500 sm:text-sm">
                                <a href="/" className="hover:text-gray-700">
                                    Self-Help Home
                                </a>
                                <span className="mx-2">&gt;</span>
                                <span className="text-gray-900">Policy & Agreement</span>
                            </nav>

                            {/* Search Box */}
                            <div className="relative w-full sm:w-auto">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search the knowledge base..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:w-80"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>

                                {/* Search Results Dropdown */}
                                {searchTerm && (
                                    <div className="absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {isSearching ? (
                                            <div className="p-4 text-center text-gray-500">Searching...</div>
                                        ) : searchResults.length > 0 ? (
                                            <div className="py-2">
                                                {searchResults.map((result) => (
                                                    <button
                                                        key={result.id}
                                                        onClick={() => scrollToSection(result.id)}
                                                        className="w-full border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                                                    >
                                                        <div className="mb-1 text-sm font-medium text-gray-900">
                                                            {highlightText(result.title, searchTerm)}
                                                        </div>
                                                        <div className="line-clamp-2 text-xs text-gray-600 sm:text-sm">
                                                            {highlightText(result.content.substring(0, 120) + '...', searchTerm)}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-gray-500">No results found for "{searchTerm}"</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-7">
                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                        {/* Main Content */}
                        <div className="order-2 flex-1 rounded-lg bg-white shadow-sm lg:order-1">
                            {/* Header with Search */}
                            <div className="border-b p-4 sm:p-6 lg:p-8">
                                <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Policy & Agreement</h1>

                                {/* Search Box */}
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                {/* Terms and Conditions Section */}
                                <div className="mb-6 sm:mb-8">
                                    <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">Terms and Conditions</h2>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>
                                            These terms and conditions (these "Terms") govern your use of our website or mobile application owned or
                                            operated by our company, its subsidiaries and affiliates, including websites around the world
                                            (collectively, "Company," "we," "our," or "us" and the "Site"), whether as a guest or registered user,
                                            and, by site discretion, at any time without prior written notice. Any changes to these Terms will be in
                                            effect as of the "Last Updated Date" referenced on the Site. Therefore, you should review these Terms
                                            prior to each use of the Site and you will be bound by any such revisions.
                                        </p>

                                        <p>
                                            Additional terms and conditions may apply to using products or services offered by our company and to the
                                            use of the Site and to specific portions or features of the Site, including contests, promotions or other
                                            similar features ("Additional Terms") all of which terms are made a part of these Terms by this reference.
                                            The Additional Terms will control to the extent of any inconsistency between the Additional Terms and
                                            these Terms.
                                        </p>

                                        <p>
                                            You should also carefully review our{' '}
                                            <a href="#" className="text-blue-600 hover:underline">
                                                Privacy Policy
                                            </a>{' '}
                                            before using the Site as it also governs your use of the Site and our services.
                                        </p>

                                        <p>
                                            <strong>
                                                Please read these Terms carefully before using the Site. If at any time you do not agree with any of
                                                these Terms, you must immediately stop using the Site.
                                            </strong>
                                        </p>

                                        <div className="my-4 rounded border p-3 sm:my-6 sm:p-4">
                                            <p className="text-xs sm:text-sm">
                                                ARBITRATION NOTICE: EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE "GOVERNING LAW AND
                                                JURISDICTION" SECTION BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND OUR COMPANY WILL BE RESOLVED BY
                                                BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR
                                                CLASS-WIDE ARBITRATION.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Index Section */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">Index:</h3>
                                    <div className="grid grid-cols-1 gap-1 text-xs sm:gap-2 sm:text-sm">
                                        <a href="#about-us" className="py-1 text-gray-900 hover:underline">
                                            About us
                                        </a>
                                        <a href="#use-of-site" className="py-1 text-gray-900 hover:underline">
                                            Use of the Site
                                        </a>
                                        <a href="#posting-content" className="py-1 text-gray-900 hover:underline">
                                            Posting content on the Site
                                        </a>
                                        <a href="#registering" className="py-1 text-gray-900 hover:underline">
                                            Registering for an account
                                        </a>
                                        <a href="#placing-order" className="py-1 text-gray-900 hover:underline">
                                            Placing an order
                                        </a>
                                        <a href="#products" className="py-1 text-gray-900 hover:underline">
                                            Products
                                        </a>
                                        <a href="#programs" className="py-1 text-gray-900 hover:underline">
                                            Programs
                                        </a>
                                        <a href="#gift-cards" className="py-1 text-gray-900 hover:underline">
                                            Gift cards
                                        </a>
                                        <a href="#promotions" className="py-1 text-gray-900 hover:underline">
                                            Promotions
                                        </a>
                                        <a href="#content-on-site" className="py-1 text-gray-900 hover:underline">
                                            Content on the Site
                                        </a>
                                        <a href="#reporting-claims" className="py-1 text-gray-900 hover:underline">
                                            Reporting claims of infringement of intellectual property rights
                                        </a>
                                        <a href="#incorporated-policies" className="py-1 text-gray-900 hover:underline">
                                            Incorporated policies
                                        </a>
                                        <a href="#general-terms" className="py-1 text-gray-900 hover:underline">
                                            General terms
                                        </a>
                                    </div>
                                </div>
                                {/* Section 1: About us */}
                                <section id="about-us" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">1. About us</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We discuss with our affiliates and subsidiaries are companies. Our addresses is{' '}
                                        <strong>Customer Center Dr. Suite 100, City, State, Zip</strong>. You can find additional information about
                                        our affiliates in these Terms.
                                    </p>
                                </section>
                                {/* Section 2: Use of the Site */}
                                <section id="use-of-site" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">2. Use of the Site</h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>
                                            <strong>Eligibility:</strong> You must be at least 18 years old to use this Site. By using this Site, you
                                            represent and warrant that you are at least 18 years old.
                                        </p>
                                        <p>
                                            <strong>License:</strong> Subject to your compliance with these Terms, we grant you a limited,
                                            non-exclusive, non-transferable, non-sublicensable license to access and use the Site for your personal,
                                            non-commercial use.
                                        </p>
                                        <p>
                                            <strong>Restrictions:</strong> You may not: (a) use the Site for any commercial purpose; (b) modify,
                                            adapt, alter, translate, or create derivative works of the Site; (c) remove any copyright, trademark, or
                                            other proprietary notices from the Site.
                                        </p>
                                    </div>
                                </section>
                                {/* Additional sections with appropriate content */}
                                <section id="posting-content" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">3. Posting content on the Site</h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>
                                            By posting content on the Site, you grant us a worldwide, royalty-free, perpetual, irrevocable,
                                            non-exclusive, transferable, and sublicensable license to use, reproduce, distribute, prepare derivative
                                            works of, display, and perform the content.
                                        </p>
                                    </div>
                                </section>
                                <section id="registering" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">4. Registering for an account</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        To access certain features, you may need to create an account. You are responsible for maintaining the
                                        confidentiality of your account information.
                                    </p>
                                </section>
                                <section id="placing-order" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">5. Placing an order</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        When you place an order, you are making an offer to purchase the products at the listed price. We reserve the
                                        right to accept or decline your order.
                                    </p>
                                </section>
                                <section id="products" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">6. Products</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We strive to provide accurate product information, but we do not warrant that product descriptions are
                                        accurate, complete, or error-free.
                                    </p>
                                </section>
                                <section id="programs" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">7. Programs</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We may offer various programs and services. Participation in these programs is subject to additional terms and
                                        conditions.
                                    </p>
                                </section>
                                <section id="gift-cards" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">8. Gift Cards</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Gift cards are subject to the terms and conditions specified at the time of purchase. Gift cards have no
                                        expiration date and are not redeemable for cash.
                                    </p>
                                </section>
                                <section id="promotions" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">9. Promotions</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Promotions, discounts, and special offers are subject to specific terms and conditions.
                                    </p>
                                </section>
                                <section id="content-on-site" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">10. Content on the Site</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        All content on the Site is owned by us or our licensors and is protected by copyright, trademark, and other
                                        intellectual property laws.
                                    </p>
                                </section>
                                <section id="reporting-claims" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                                        11. Reporting claims of infringement of intellectual property rights
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        If you believe that content on our Site infringes your intellectual property rights, please contact us with
                                        detailed information.
                                    </p>
                                </section>{' '}
                                <section id="incorporated-policies" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">12. Incorporated policies</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        These Terms incorporate by reference our Privacy Policy and other policies posted on the Site.
                                    </p>
                                </section>
                                <section id="general-terms" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">13. General terms</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        These Terms constitute the entire agreement between you and us regarding your use of the Site.
                                    </p>
                                </section>
                            </div>
                        </div>

                        <div className="order-1 w-full lg:order-2 lg:w-80">
                            <div className="rounded-lg bg-white shadow-sm">
                                <div className="border-b px-4 py-3">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Contents</h3>
                                </div>

                                {/* Sidebar Navigation */}
                                <div className="p-4">
                                    <nav className="space-y-3">
                                        <div className="rounded-t-lg bg-[rgba(204,78,0,0.8)] p-3 text-white sm:p-4">
                                            <h3 className="text-sm font-semibold sm:text-base">Terms and Conditions</h3>
                                        </div>

                                        <div className="ml-2 space-y-2 sm:ml-4 sm:space-y-4">
                                            <a href="#about-us" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                1. About us
                                            </a>
                                            <a href="#use-of-site" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                2. Use of the Site
                                            </a>
                                            <a href="#posting-content" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                3. Posting content on the Site
                                            </a>
                                            <a href="#registering" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                4. Registering for an account
                                            </a>
                                            <a href="#placing-order" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                5. Placing an order
                                            </a>
                                            <a href="#products" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                6. Products
                                            </a>
                                            <a href="#programs" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                7. Programs
                                            </a>
                                        </div>

                                        <div className="ml-2 space-y-2 sm:ml-4 sm:space-y-4">
                                            <a href="#gift-cards" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                8. Gift Cards Promotional Gift Cards, and Customer Care Gift Cards
                                            </a>
                                        </div>

                                        <div className="ml-2 space-y-2 sm:ml-4 sm:space-y-4">
                                            <a href="#promotions" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                9. Promotions
                                            </a>
                                            <a href="#content-on-site" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                10. Content on the Site
                                            </a>
                                            <a href="#reporting-claims" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                11. Reporting claims of infringement of intellectual property rights
                                            </a>
                                            <a
                                                href="#incorporated-policies"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                12. Incorporated policies
                                            </a>
                                            <a href="#general-terms" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                13. General terms
                                            </a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
