import { useState } from 'react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Link as LinkIcon,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Twitter,
    Youtube,
} from 'lucide-react';

const SOCIAL_ICON_MAP = {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Github,
    WhatsApp: MessageCircle,
};

export default function Footer() {
    const { siteSettings } = usePage().props;
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const companyName = siteSettings?.company_name || 'T-zb Inc.';
    const contactPhones = [siteSettings?.phone1, siteSettings?.phone2].filter(Boolean);
    const contactEmails = [siteSettings?.email1, siteSettings?.email2].filter(Boolean);
    const socialLinks = (siteSettings?.social_links || [])
        .filter((link) => link?.url)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const currentYear = new Date().getFullYear();

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Please enter your email address');
            setMessageType('error');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await axios.post('/newsletter/subscribe', {
                email: email
            });

            if (response.data.success) {
                setMessage(response.data.message);
                setMessageType('success');
                setEmail(''); // Clear the input
            } else {
                setMessage(response.data.message);
                setMessageType('error');
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Something went wrong. Please try again.');
            }
            setMessageType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer id="Page_Footer_Full" className="footer2021 page-section max-w-8xl mx-auto">
            {/* Newsletter + App Download */}
            <div className="page-section bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid gap-6 lg:grid-cols-1 grid-cols-1">
                        {/* Newsletter Subscribe */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <form onSubmit={handleNewsletterSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Deals from {companyName}
                                        </h3>
                                    </div>
                                    <p className="text-base font-semibold text-gray-700">
                                        Sign up to receive exclusive offers and updates directly from us.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex items-center flex-1">
                                            <svg className="w-5 h-5 text-gray-400 absolute left-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <input
                                                type="email"
                                                placeholder="Enter your e-mail address"
                                                aria-label="Enter your e-mail address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                maxLength="128"
                                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
                                        >
                                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                        </button>
                                    </div>
                                    {message && (
                                        <div className={`text-sm ${messageType === 'success'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}>
                                            {message}
                                        </div>
                                    )}
                                    <p className="text-sm">
                                        <Link
                                            className="text-blue-600 hover:underline inline-flex items-center"
                                            href={route('deal.page')}
                                        >
                                            View Latest Email Deals
                                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>

            {/* Sitemap */}
            <nav className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
                        {/* Customer Service */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Track an Order
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Return an Item
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Return Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('privacy.policy')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Privacy & Security
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Feedback
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* My Account */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">My Account</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Login/Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Browsing History
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Returns History
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('user.addresses.index')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Address Book
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Information */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Company Information</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href={route('about')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Investor Relations
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Policies & Help */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Policies & Help</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href={route('terms.conditions')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('privacy.policy')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Privacy & Security
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('return.policy')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Return Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                            <ul className="space-y-3 text-sm">
                                {contactPhones.map((phone, idx) => (
                                    <li key={`phone-${phone}-${idx}`} className="flex items-center gap-2 text-gray-300">
                                        <Phone className="h-4 w-4 text-blue-400" />
                                        <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                                            {phone}
                                        </a>
                                    </li>
                                ))}
                                {contactEmails.map((contactEmail, idx) => (
                                    <li key={`email-${contactEmail}-${idx}`} className="flex items-center gap-2 text-gray-300">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                        <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                                            {contactEmail}
                                        </a>
                                    </li>
                                ))}
                                {siteSettings?.company_address && (
                                    <li className="flex items-start gap-2 text-gray-300">
                                        <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                                        <span>{siteSettings.company_address}</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Shop Our Brands */}
                        {/* <div>
                            <h4 className="font-bold text-lg mb-4">Shop Our Brands</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href={route('brands.page')}
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Our Brands
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Global
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Brand A
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white text-sm transition-colors"
                                    >
                                        Brand B
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </nav>

            {/* Footer Bottom */}
            <div className="bg-gray-900 text-gray-300 py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-center lg:text-left space-y-2">
                            <span className="text-sm">© 2000-{currentYear} {companyName}. All rights reserved.</span>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link
                                    href={route('terms.conditions')}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Terms & Conditions
                                </Link>
                                <Link
                                    href={route('privacy.policy')}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            {socialLinks.length > 0 ? (
                                socialLinks.map((social) => {
                                    const IconComponent = SOCIAL_ICON_MAP[social.icon] || LinkIcon;
                                    return (
                                        <a
                                            key={`${social.platform}-${social.id}`}
                                            href={social.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label={social.platform}
                                        >
                                            <IconComponent className="w-6 h-6" />
                                        </a>
                                    );
                                })
                            ) : (
                                <span className="text-sm text-gray-400">Connect with us soon!</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
