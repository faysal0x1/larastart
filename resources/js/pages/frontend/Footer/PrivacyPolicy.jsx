import { Head } from '@inertiajs/react';
import { useState } from 'react';

const PrivacyPolicy = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchableContent = [
        {
            id: 'information-we-collect',
            title: '1. Information We Collect',
            content:
                'We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, mailing address, payment information, and any other information you choose to provide.',
        },
        {
            id: 'how-we-use-information',
            title: '2. How We Use Your Information',
            content:
                'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about products and services, and protect against fraud and abuse.',
        },
        {
            id: 'information-sharing',
            title: '3. Information Sharing and Disclosure',
            content:
                'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with service providers who assist us in operating our website and conducting our business.',
        },
        {
            id: 'data-security',
            title: '4. Data Security',
            content:
                'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
        },
        {
            id: 'cookies-tracking',
            title: '5. Cookies and Tracking Technologies',
            content:
                'We use cookies and similar tracking technologies to collect and use personal information about you. Cookies are small data files stored on your device that help us improve our services and your experience.',
        },
        {
            id: 'third-party-services',
            title: '6. Third-Party Services',
            content:
                'Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.',
        },
        {
            id: 'data-retention',
            title: '7. Data Retention',
            content:
                'We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.',
        },
        {
            id: 'your-rights',
            title: '8. Your Rights and Choices',
            content:
                'You have certain rights regarding your personal information, including the right to access, update, or delete your information. You may also opt out of certain communications from us.',
        },
        {
            id: 'childrens-privacy',
            title: "9. Children's Privacy",
            content:
                'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.',
        },
        {
            id: 'international-transfers',
            title: '10. International Data Transfers',
            content:
                'Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and provide adequate protection for your personal information.',
        },
        {
            id: 'policy-changes',
            title: '11. Changes to This Privacy Policy',
            content:
                'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.',
        },
        {
            id: 'contact-us',
            title: '12. Contact Us',
            content:
                'If you have any questions about this privacy policy or our privacy practices, please contact us using the contact information provided on our website.',
        },
        {
            id: 'international-compliance',
            title: '13. International Compliance',
            content:
                'We comply with applicable data protection laws in the jurisdictions where we operate, including GDPR for European users and CCPA for California residents.',
        },
        {
            id: 'legal-basis',
            title: '14. Legal Basis for Processing',
            content: 'We process your personal information based on contract performance, legitimate interest, legal compliance, and consent.',
        },
        {
            id: 'automated-decisions',
            title: '15. Automated Decision Making',
            content:
                'We may use automated decision-making processes, including profiling, to provide personalized recommendations and improve your experience.',
        },
        {
            id: 'last-update',
            title: '16. Last Update',
            content: 'The privacy policy contained herein became officially effective July 22, 2021.',
        },
        {
            id: 'appendix',
            title: 'Appendix 1: List of Company Affiliates and Subsidiaries',
            content:
                'List of company affiliates including TBZ Inc., TBZ Australia Pty Ltd., and TBZ Canada Inc. with their registered addresses and contact information.',
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
            <Head title="Privacy Policy" />
            <header className="bg-gray-700 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
                            <nav className="text-sm text-gray-500">
                                <a href="/" className="hover:text-gray-700">
                                    Self-Help Home
                                </a>
                                <span className="mx-2">&gt;</span>
                                <span className="text-gray-900">Privacy Policy</span>
                            </nav>

                            {/* Search Box */}
                            <div className="relative w-full sm:w-80">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search the privacy policy..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                                                        <div className="mb-1 font-medium text-gray-900">
                                                            {highlightText(result.title, searchTerm)}
                                                        </div>
                                                        <div className="line-clamp-2 text-sm text-gray-600">
                                                            {highlightText(result.content.substring(0, 120) + '...', searchTerm)}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">No results found for "{searchTerm}"</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:gap-8">
                        {/* Main Content */}
                        <div className="flex-1 rounded-lg bg-white shadow-sm">
                            {/* Header */}
                            <div className="border-b p-4 sm:p-6 lg:p-8">
                                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Privacy Policy</h1>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                {/* Privacy Policy Introduction */}
                                <div className="mb-6 sm:mb-8">
                                    <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">Privacy Policy</h2>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>
                                            This Privacy Policy describes how our company ("we," "our," or "us") collects, uses, and shares
                                            information about you when you use our website, mobile application, and other online services
                                            (collectively, the "Services").
                                        </p>

                                        <p>
                                            We are committed to protecting your privacy and ensuring that your personal information is handled in a
                                            safe and responsible manner. This policy explains what information we collect, how we use it, and your
                                            rights regarding your personal data.
                                        </p>

                                        <p>
                                            By using our Services, you agree to the collection and use of information in accordance with this Privacy
                                            Policy. If you do not agree with our policies and practices, please do not use our Services.
                                        </p>

                                        <div className="my-4 border-l-4 border-blue-500 bg-blue-50 p-3 sm:my-6 sm:p-4">
                                            <p className="text-sm font-semibold text-blue-800 sm:text-base">
                                                Important: Please read this Privacy Policy carefully. It contains important information about your
                                                privacy rights and how we handle your personal information.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Index Section */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">Contents:</h3>
                                    <div className="grid grid-cols-1 gap-1 text-sm sm:gap-2">
                                        <a href="#information-we-collect" className="py-1 text-gray-900 hover:underline">
                                            1. Information We Collect
                                        </a>
                                        <a href="#how-we-use-information" className="py-1 text-gray-900 hover:underline">
                                            2. How We Use Your Information
                                        </a>
                                        <a href="#information-sharing" className="py-1 text-gray-900 hover:underline">
                                            3. Information Sharing and Disclosure
                                        </a>
                                        <a href="#data-security" className="py-1 text-gray-900 hover:underline">
                                            4. Data Security
                                        </a>
                                        <a href="#cookies-tracking" className="py-1 text-gray-900 hover:underline">
                                            5. Cookies and Tracking Technologies
                                        </a>
                                        <a href="#third-party-services" className="py-1 text-gray-900 hover:underline">
                                            6. Third-Party Services
                                        </a>
                                        <a href="#data-retention" className="py-1 text-gray-900 hover:underline">
                                            7. Data Retention
                                        </a>
                                        <a href="#your-rights" className="py-1 text-gray-900 hover:underline">
                                            8. Your Rights and Choices
                                        </a>
                                        <a href="#childrens-privacy" className="py-1 text-gray-900 hover:underline">
                                            9. Children's Privacy
                                        </a>
                                        <a href="#international-transfers" className="py-1 text-gray-900 hover:underline">
                                            10. International Data Transfers
                                        </a>
                                        <a href="#policy-changes" className="py-1 text-gray-900 hover:underline">
                                            11. Changes to This Privacy Policy
                                        </a>
                                        <a href="#contact-us" className="py-1 text-gray-900 hover:underline">
                                            12. Contact Us
                                        </a>
                                        <a href="#international-compliance" className="py-1 text-gray-900 hover:underline">
                                            13. International Compliance
                                        </a>
                                        <a href="#legal-basis" className="py-1 text-gray-900 hover:underline">
                                            14. Legal Basis for Processing
                                        </a>
                                        <a href="#automated-decisions" className="py-1 text-gray-900 hover:underline">
                                            15. Automated Decision Making
                                        </a>
                                        <a href="#last-update" className="py-1 text-gray-900 hover:underline">
                                            16. Last Update
                                        </a>
                                        <a href="#appendix" className="py-1 text-gray-900 hover:underline">
                                            Appendix 1: List of Company Affiliates and Subsidiaries
                                        </a>
                                    </div>
                                </div>

                                {/* Section 1: Information We Collect */}
                                <section id="information-we-collect" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">1. Information We Collect</h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>
                                            <strong>Information You Provide to Us:</strong> We collect information you provide directly to us, such as
                                            when you create an account, make a purchase, subscribe to our newsletter, participate in surveys, or
                                            contact us for support.
                                        </p>
                                        <p>
                                            This may include your name, email address, phone number, mailing address, payment information, date of
                                            birth, and any other information you choose to provide.
                                        </p>
                                        <p>
                                            <strong>Information We Collect Automatically:</strong> When you use our Services, we automatically collect
                                            certain information about your device and usage, including IP address, browser type, operating system, and
                                            pages visited.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 2: How We Use Your Information */}
                                <section id="how-we-use-information" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">2. How We Use Your Information</h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>We use the information we collect to:</p>
                                        <ul className="ml-4 list-disc space-y-1 sm:ml-6 sm:space-y-2">
                                            <li>Provide, maintain, and improve our Services</li>
                                            <li>Process transactions and send related information</li>
                                            <li>Send you technical notices, updates, and support messages</li>
                                            <li>Respond to your comments, questions, and customer service requests</li>
                                            <li>Communicate with you about products, services, and promotional offers</li>
                                            <li>Monitor and analyze trends and usage patterns</li>
                                            <li>Protect against fraud, abuse, and other harmful activity</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 3: Information Sharing */}
                                <section id="information-sharing" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">3. Information Sharing and Disclosure</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>
                                            We do not sell, trade, or otherwise transfer your personal information to third parties without your
                                            consent, except as described in this policy.
                                        </p>
                                        <p>We may share your information with:</p>
                                        <ul className="ml-6 list-disc space-y-2">
                                            <li>
                                                <strong>Service Providers:</strong> Third parties who provide services on our behalf
                                            </li>
                                            <li>
                                                <strong>Business Partners:</strong> With your consent for joint marketing efforts
                                            </li>
                                            <li>
                                                <strong>Legal Compliance:</strong> When required by law or to protect our rights
                                            </li>
                                            <li>
                                                <strong>Business Transfers:</strong> In connection with mergers or acquisitions
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 4: Data Security */}
                                <section id="data-security" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">4. Data Security</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>
                                            We implement appropriate technical and organizational measures to protect your personal information
                                            against unauthorized access, alteration, disclosure, or destruction.
                                        </p>
                                        <p>
                                            These measures include encryption, secure servers, access controls, and regular security assessments.
                                            However, no method of transmission over the internet or electronic storage is 100% secure.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 5: Cookies and Tracking */}
                                <section id="cookies-tracking" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">5. Cookies and Tracking Technologies</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>
                                            We use cookies and similar tracking technologies to collect and use personal information about you.
                                            Cookies are small data files stored on your device that help us improve our Services and your experience.
                                        </p>
                                        <p>
                                            You can control cookies through your browser settings, but disabling cookies may affect the functionality
                                            of our Services.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 6: Third-Party Services */}
                                <section id="third-party-services" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">6. Third-Party Services</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Our Services may contain links to third-party websites or services that are not owned or controlled by us. We
                                        are not responsible for the privacy practices of these third parties. We encourage you to read their privacy
                                        policies before providing any information.
                                    </p>
                                </section>

                                {/* Section 7: Data Retention */}
                                <section id="data-retention" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">7. Data Retention</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy
                                        policy, unless a longer retention period is required or permitted by law. When we no longer need your
                                        information, we will securely delete or anonymize it.
                                    </p>
                                </section>

                                {/* Section 8: Your Rights */}
                                <section id="your-rights" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">8. Your Rights and Choices</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>You have certain rights regarding your personal information, including:</p>
                                        <ul className="ml-6 list-disc space-y-2">
                                            <li>
                                                <strong>Access:</strong> Request access to your personal information
                                            </li>
                                            <li>
                                                <strong>Correction:</strong> Request correction of inaccurate information
                                            </li>
                                            <li>
                                                <strong>Deletion:</strong> Request deletion of your personal information
                                            </li>
                                            <li>
                                                <strong>Portability:</strong> Request a copy of your information in a portable format
                                            </li>
                                            <li>
                                                <strong>Opt-out:</strong> Unsubscribe from marketing communications
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 9: Children's Privacy */}
                                <section id="childrens-privacy" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">9. Children's Privacy</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Our Services are not intended for children under 13 years of age. We do not knowingly collect personal
                                        information from children under 13. If we learn that we have collected such information without parental
                                        consent, we will delete it promptly.
                                    </p>
                                </section>

                                {/* Section 10: International Transfers */}
                                <section id="international-transfers" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">10. International Data Transfers</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Your information may be transferred to and processed in countries other than your own. We ensure that such
                                        transfers comply with applicable data protection laws and provide adequate protection for your personal
                                        information through appropriate safeguards.
                                    </p>
                                </section>

                                {/* Section 11: Policy Changes */}
                                <section id="policy-changes" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">11. Changes to This Privacy Policy</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We may update this privacy policy from time to time to reflect changes in our practices or for other
                                        operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
                                        policy on this page and updating the "Last Updated" date.
                                    </p>
                                </section>

                                {/* Section 12: Contact Us */}
                                <section id="contact-us" className="mb-6 sm:mb-8">
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">12. Contact Us</h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-gray-700 sm:space-y-4">
                                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                                        <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
                                            <div className="space-y-2">
                                                <p>
                                                    <strong>Email:</strong> privacy@company.com
                                                </p>
                                                <p>
                                                    <strong>Address:</strong> Customer Center Dr. Suite 100, City, State, Zip
                                                </p>
                                                <p>
                                                    <strong>Phone:</strong> +1 (555) 123-4567
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 13: International Compliance */}
                                <section id="international-compliance" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">13. International Compliance</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>
                                            We comply with applicable data protection laws in the jurisdictions where we operate, including but not
                                            limited to the General Data Protection Regulation (GDPR) for European users and the California Consumer
                                            Privacy Act (CCPA) for California residents.
                                        </p>
                                        <p>
                                            If you are located in the European Economic Area (EEA), you have additional rights under GDPR, including
                                            the right to object to processing and the right to lodge a complaint with a supervisory authority.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 14: Data Processing Legal Basis */}
                                <section id="legal-basis" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">14. Legal Basis for Processing</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                                        <p>We process your personal information based on the following legal grounds:</p>
                                        <ul className="ml-6 list-disc space-y-2">
                                            <li>
                                                <strong>Contract Performance:</strong> To fulfill our contractual obligations to you
                                            </li>
                                            <li>
                                                <strong>Legitimate Interest:</strong> For our legitimate business interests, such as improving our
                                                services
                                            </li>
                                            <li>
                                                <strong>Legal Compliance:</strong> To comply with applicable laws and regulations
                                            </li>
                                            <li>
                                                <strong>Consent:</strong> Where you have provided explicit consent for specific processing activities
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 15: Automated Decision Making */}
                                <section id="automated-decisions" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">15. Automated Decision Making</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        We may use automated decision-making processes, including profiling, to provide personalized recommendations
                                        and improve your experience. You have the right to request human intervention in automated decision-making
                                        processes that significantly affect you.
                                    </p>
                                </section>

                                {/* Section 16: Last Update */}
                                <section id="last-update" className="mb-8">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">16. Last Update</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        The privacy policy contained herein became officially effective July 22, 2021.
                                    </p>
                                </section>

                                {/* Appendix */}
                                <section id="appendix" className="mb-6 sm:mb-8">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                                        Appendix 1: List of Company Affiliates and Subsidiaries
                                    </h2>

                                    {/* Mobile Card Layout */}
                                    <div className="block space-y-4 sm:hidden">
                                        <div className="rounded-lg border bg-gray-50 p-4">
                                            <h4 className="mb-2 font-semibold text-gray-900">TBZ Inc.</h4>
                                            <div className="space-y-2 text-sm text-gray-700">
                                                <div>
                                                    <span className="font-medium">Address:</span>
                                                    <br />
                                                    21688 Gateway Center Dr.
                                                    <br />
                                                    Suite 300
                                                    <br />
                                                    Diamond Bar, CA
                                                </div>
                                                <div>
                                                    <span className="font-medium">Country:</span> United States
                                                </div>
                                                <div>
                                                    <span className="font-medium">Contact:</span>
                                                    <a href="mailto:privacy@tbz.com" className="ml-1 text-blue-600 hover:underline">
                                                        privacy@tbz.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border bg-white p-4">
                                            <h4 className="mb-2 font-semibold text-gray-900">TBZ Australia Pty Ltd.</h4>
                                            <div className="space-y-2 text-sm text-gray-700">
                                                <div>
                                                    <span className="font-medium">Address:</span>
                                                    <br />
                                                    Level 18
                                                    <br />
                                                    Grosvenor Place,
                                                    <br />
                                                    225 George Street,
                                                    <br />
                                                    Sydney, Australia
                                                </div>
                                                <div>
                                                    <span className="font-medium">Country:</span> Australia
                                                </div>
                                                <div>
                                                    <span className="font-medium">Contact:</span>
                                                    <a href="mailto:privacy@tbz.com" className="ml-1 text-blue-600 hover:underline">
                                                        privacy@tbz.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border bg-gray-50 p-4">
                                            <h4 className="mb-2 font-semibold text-gray-900">TBZ Canada Inc.</h4>
                                            <div className="space-y-2 text-sm text-gray-700">
                                                <div>
                                                    <span className="font-medium">Address:</span>
                                                    <br />
                                                    55 East Beaver Creek Road,
                                                    <br />
                                                    Units E and F, Richmond
                                                    <br />
                                                    Hill Ontario L4B
                                                    <br />
                                                    1E8 Canada
                                                </div>
                                                <div>
                                                    <span className="font-medium">Country:</span> Canada
                                                </div>
                                                <div>
                                                    <span className="font-medium">Contact:</span>
                                                    <a href="mailto:privacy@tbz.com" className="ml-1 text-blue-600 hover:underline">
                                                        privacy@tbz.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Table Layout */}
                                    <div className="hidden overflow-x-auto sm:block">
                                        <table className="min-w-full border border-gray-300 bg-white">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Name
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Registered Address
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Country of Establishment
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Contact Details for Data Protection Queries
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">TBZ Inc.</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        21688 Gateway Center Dr.
                                                        <br />
                                                        Suite 300
                                                        <br />
                                                        Diamond Bar, CA
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">United States</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        <a href="mailto:privacy@tbz.com" className="text-blue-600 hover:underline">
                                                            privacy@tbz.com
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">TBZ Australia Pty Ltd.</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        Level 18
                                                        <br />
                                                        Grosvenor Place,
                                                        <br />
                                                        225 George Street,
                                                        <br />
                                                        Sydney, Australia
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Australia</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        <a href="mailto:privacy@tbz.com" className="text-blue-600 hover:underline">
                                                            privacy@tbz.com
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">TBZ Canada Inc.</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        55 East Beaver Creek Road,
                                                        <br />
                                                        Units E and F, Richmond
                                                        <br />
                                                        Hill Ontario L4B
                                                        <br />
                                                        1E8 Canada
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Canada</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        <a href="mailto:privacy@tbz.com" className="text-blue-600 hover:underline">
                                                            privacy@tbz.com
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="mt-6 lg:mt-0 lg:w-80">
                            <div className="rounded-lg bg-white shadow-sm">
                                <div className="border-b px-4 py-3">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Contents</h3>
                                </div>

                                {/* Sidebar Navigation */}
                                <div className="p-4">
                                    <nav className="space-y-3">
                                        <div className="rounded-t-lg bg-[rgba(204,78,0,0.8)] p-3 text-white sm:p-4">
                                            <h3 className="text-sm font-semibold sm:text-base">Privacy Policy</h3>
                                        </div>

                                        <div className="ml-2 space-y-2 sm:ml-4 sm:space-y-4">
                                            <a
                                                href="#information-we-collect"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                1. Information We Collect
                                            </a>
                                            <a
                                                href="#how-we-use-information"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                2. How We Use Your Information
                                            </a>
                                            <a
                                                href="#information-sharing"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                3. Information Sharing and Disclosure
                                            </a>
                                            <a href="#data-security" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                4. Data Security
                                            </a>
                                            <a href="#cookies-tracking" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                5. Cookies and Tracking Technologies
                                            </a>
                                            <a
                                                href="#third-party-services"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                6. Third-Party Services
                                            </a>
                                        </div>

                                        <div className="ml-2 space-y-2 sm:ml-4 sm:space-y-4">
                                            <a href="#data-retention" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                7. Data Retention
                                            </a>
                                            <a href="#your-rights" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                8. Your Rights and Choices
                                            </a>
                                            <a href="#childrens-privacy" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                9. Children's Privacy
                                            </a>
                                            <a
                                                href="#international-transfers"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                10. International Data Transfers
                                            </a>
                                            <a href="#policy-changes" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                11. Changes to This Privacy Policy
                                            </a>
                                            <a href="#contact-us" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                12. Contact Us
                                            </a>
                                            <a
                                                href="#international-compliance"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                13. International Compliance
                                            </a>
                                            <a href="#legal-basis" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                14. Legal Basis for Processing
                                            </a>
                                            <a
                                                href="#automated-decisions"
                                                className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm"
                                            >
                                                15. Automated Decision Making
                                            </a>
                                            <a href="#last-update" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                16. Last Update
                                            </a>
                                            <a href="#appendix" className="block py-1 text-xs text-gray-900 hover:text-blue-700 sm:text-sm">
                                                Appendix 1: Company Affiliates
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

export default PrivacyPolicy;
