import React from 'react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Users,
    School,
    GraduationCap,
    BookMarked,
    Calendar,
    CreditCard,
    Home,
    Bus,
    Library,
    Bell,
    MessageSquare,
    FileText,
    Settings,
    UserCheck,
    Shield,
    Building,
    Car,
    Bed,
    Calculator,
    Award,
    Clock,
    Mail,
    Tag,
    MessageCircle,
    User,
    Briefcase,
    Database,
    MapPin,
    Globe,
    Palette,
    Box,
    ShoppingCart,
    Scale,
    Heart,
    Image
} from 'lucide-react';

// 1. Update getUrl to include all resource routes from generated_resources_route.php and admin.php
const getUrl = (routeName) => {
    const routeMap = {
        'dashboard': '/dashboard',
        // Admin resources (from generated_resources_route.php)
        'admin.subject.index': '/admin/subject',
        'admin.country.index': '/admin/country',
        'admin.post.index': '/admin/post',
        'admin.tag.index': '/admin/tag',
        'admin.category.index': '/admin/category',
        'admin.child-category.index': '/admin/child-category',
        'admin.blog-category.index': '/admin/blog-category',
        'admin.blog.index': '/admin/blog',
        'admin.conversation.index': '/admin/conversation',
        'admin.brand.index': '/admin/brand',
        'admin.sub-category.index': '/admin/sub-category',
        'admin.product.index': '/admin/product',
        'product.bulk.edit': '/admin/product/bulk-edit',
        'admin.slider.index': '/admin/slider',
        'admin.wishlist.index': '/admin/wishlist',
        'admin.compare.index': '/admin/compare',
        'admin.division.index': '/admin/division',
        'admin.district.index': '/admin/district',
        'admin.upazilla.index': '/admin/upazilla',
        'admin.order.index': '/admin/order',
        'admin.order-type.index': '/admin/order-type',
        'admin.color-attribute.index': '/admin/color-attribute',
        'admin.banner.index': '/admin/banner',
        'admin.site-setting.index': '/admin/site-setting',
        'admin.coupon.index': '/admin/coupon',
        'admin.site-seo.index': '/admin/site-seo',
        'static-page.index': '/admin/static-page',
        'admin.flash-deal.index': '/admin/flash-deal',
        'admin.user-address.index': '/admin/user-address',
        'admin.business-info.index': '/admin/business-info',
        'admin.faq-question.index': '/admin/faq-question',
        'admin.announcement.index': '/admin/announcement',
        'admin.theme.index': '/admin/theme',
        'admin.product-variation.index': '/admin/product-variation',
        'admin.deal-of-the-day.index': '/admin/deal-of-the-day',
        'admin.marketing-service.index': '/admin/marketing-service',
        'admin.product-cart.index': '/admin/product-cart',
        // Admin.php root resources
        'roles.index': '/roles',
        'permissions.index': '/permissions',
        'user-role-assignments.index': '/user-role-assignments',
        // Admin.php /admin prefix
        'admin.users.index': '/users',
        'admin.country.index2': '/admin/country', // duplicate, but keep for clarity
        'blog-category.index': '/blog-category',
        'blogs.index': '/blogs',
        // Chat (faysal.php)
        'chat.index': '/chat',
        // Frontend routes
        'home': '/',
        'about': '/about',
        'how-it-works': '/how-it-works',
        'pricing': '/pricing',
        'blogs': '/blogs',
        'blogDetail': '/blogDetail',
        'Faq': '/Faq',
        'clientDashboard': '/client/dashboard',
        'profile.edit': '/settings/profile',
        'password.edit': '/settings/password',
        'appearance': '/settings/appearance',
    };
    return routeMap[routeName] || '#';
};

export const mainNavItems = [
    {
        title: 'Dashboard',
        key: 'dashboard',
        url: getUrl('dashboard'),
        icon: LayoutGrid,
    },
    // Example grouping: Blog System
    {
        title: 'Blog System',
        key: 'blog_system',
        icon: FileText,
        subItems: [
            { title: 'Blog Categories', key: 'blog-category', url: getUrl('blog-category.index'), icon: Folder },
            { title: 'Blogs', key: 'blog', url: getUrl('blog.index'), icon: FileText },
            { title: 'Tags', key: 'tag', url: getUrl('tag.index'), icon: Tag },
            { title: 'Announcements', key: 'announcement', url: getUrl('admin.announcement.index'), icon: Bell },
            { title: 'FAQ Questions', key: 'faq-question', url: getUrl('admin.faq-question.index'), icon: BookOpen },
        ],
    },
    // Example grouping: Product Management
    {
        title: 'Product Management',
        key: 'product_management',
        icon: Briefcase,
        subItems: [
            { title: 'Brands', key: 'brand', url: getUrl('admin.brand.index'), icon: Briefcase },
            { title: 'Categories', key: 'category', url: getUrl('admin.category.index'), icon: Folder },
            { title: 'Sub Categories', key: 'sub-category', url: getUrl('admin.sub-category.index'), icon: Folder },
            { title: 'Child Categories', key: 'child-category', url: getUrl('admin.child-category.index'), icon: Folder },
            { title: 'Products', key: 'product', url: getUrl('admin.product.index'), icon: Box },
            { title: 'Product Bulk Edit', key: 'product-bulk-edit', url: getUrl('product.bulk.edit'), icon: Box },
            { title: 'Product Variations', key: 'product-variation', url: getUrl('admin.product-variation.index'), icon: Box },
            { title: 'Product Cart', key: 'product-cart', url: getUrl('admin.product-cart.index'), icon: ShoppingCart },
            { title: 'Compare', key: 'compare', url: getUrl('admin.compare.index'), icon: Scale },
            { title: 'Wishlist', key: 'wishlist', url: getUrl('admin.wishlist.index'), icon: Heart },
            { title: 'Deal of the Day', key: 'deal-of-the-day', url: getUrl('admin.deal-of-the-day.index'), icon: Award },
            { title: 'Flash Deal', key: 'flash-deal', url: getUrl('admin.flash-deal.index'), icon: Award },
        ],
    },
    // Example grouping: Order Management
    {
        title: 'Order Management',
        key: 'order_management',
        icon: CreditCard,
        subItems: [
            { title: 'Orders', key: 'order', url: getUrl('admin.order.index'), icon: CreditCard },
            { title: 'Order Types', key: 'order-type', url: getUrl('admin.order-type.index'), icon: CreditCard },
            { title: 'Coupons', key: 'coupon', url: getUrl('admin.coupon.index'), icon: Tag },
        ],
    },
    // Example grouping: Location Management
    {
        title: 'Location Management',
        key: 'location_management',
        icon: MapPin,
        subItems: [
            { title: 'Divisions', key: 'division', url: getUrl('admin.division.index'), icon: MapPin },
            { title: 'Districts', key: 'district', url: getUrl('admin.district.index'), icon: MapPin },
            { title: 'Upazillas', key: 'upazilla', url: getUrl('admin.upazilla.index'), icon: MapPin },
            { title: 'Countries', key: 'country', url: getUrl('admin.country.index'), icon: Globe },
            { title: 'User Addresses', key: 'user-address', url: getUrl('admin.user-address.index'), icon: User },
            { title: 'Business Info', key: 'business-info', url: getUrl('admin.business-info.index'), icon: Building },
        ],
    },
    // Example grouping: Site Management
    {
        title: 'Site Management',
        key: 'site_management',
        icon: Settings,
        subItems: [
            { title: 'Site Setting', key: 'site-setting', url: getUrl('admin.site-setting.index'), icon: Settings },
            { title: 'Site SEO', key: 'site-seo', url: getUrl('admin.site-seo.index'), icon: Settings },
            { title: 'Static Pages', key: 'static-page', url: getUrl('static-page.index'), icon: FileText },
            // { title: 'Theme', key: 'theme', url: getUrl('admin.theme.index'), icon: Palette },
            // { title: 'Banner', key: 'banner', url: getUrl('admin.banner.index'), icon: Image },
            // { title: 'Slider', key: 'slider', url: getUrl('admin.slider.index'), icon: Image },
            { title: 'Marketing Service', key: 'marketing-service', url: getUrl('admin.marketing-service.index'), icon: Briefcase },

        ],
    },
    // Example grouping: Chat System
    // {
    //     title: 'Chat System',
    //     key: 'chat_system',
    //     icon: MessageCircle,
    //     subItems: [
    //         { title: 'Chat Dashboard', key: 'chat_dashboard', url: getUrl('chat.index'), icon: MessageCircle },
    //         { title: 'Conversations', key: 'conversation', url: getUrl('admin.conversation.index'), icon: MessageCircle },
    //     ],
    // },
    // Example grouping: Access Control
    {
        title: 'Access Control',
        key: 'access_control',
        icon: Shield,
        subItems: [
            { title: 'Roles', key: 'roles', url: getUrl('roles.index'), icon: Shield },
            { title: 'Permissions', key: 'permissions', url: getUrl('permissions.index'), icon: Shield },
            { title: 'User Role Assignments', key: 'user-role-assignments', url: getUrl('user-role-assignments.index'), icon: UserCheck },
            { title: 'Users', key: 'users', url: getUrl('admin.users.index'), icon: Users },
        ],
    },
];

// Frontend Routes
export const frontendRoutes = [
    {
        title: 'Home',
        url: getUrl('home'),
    },
    {
        title: 'About',
        url: getUrl('about'),
    },
    {
        title: 'How It Works',
        url: getUrl('how-it-works'),
    },
    {
        title: 'Pricing',
        url: getUrl('pricing'),
    },
    {
        title: 'Blogs',
        url: getUrl('blogs'),
    },
    {
        title: 'Blog Detail',
        url: getUrl('blogDetail'),
    },
    {
        title: 'FAQ',
        url: getUrl('Faq'),
    },
    // {
    //     title: 'Client Dashboard',
    //     url: getUrl('clientDashboard'),
    // },
];

// Settings Routes
export const settingsRoutes = [
    {
        title: 'Profile',
        url: getUrl('profile.edit'),
    },
    {
        title: 'Password',
        url: getUrl('password.edit'),
    },
    {
        title: 'Appearance',
        url: getUrl('appearance'),
    },
];

export const footerNavItems = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
        external: true,
    },
];

// Helper component for navigation links
const NavLink = ({ item, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick(item.url);
        }
        // Here you would typically use your router's navigation method
        console.log(`Navigating to: ${item.url}`);
    };

    return (
        <a
            href={item.url}
            onClick={handleClick}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
            {item.icon}
            <span>{item.title}</span>
        </a>
    );
};

// Main Navigation Component
const Navigation = () => {
    const handleNavigation = (url) => {
        // Implement your navigation logic here
        // For example, using React Router:
        // navigate(url);

        // Or using Next.js router:
        // router.push(url);

        console.log(`Navigation to: ${url}`);
    };

    return (
        <nav className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">School Management</h2>

                {mainNavItems.map((item, index) => (
                    <div key={index} className="mb-2">
                        {item.subItems ? (
                            <details className="group">
                                <summary className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                                    {item.icon}
                                    <span className="flex-1">{item.title}</span>
                                    <span className="text-xs transition-transform group-open:rotate-90">▶</span>
                                </summary>
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <NavLink
                                            key={subIndex}
                                            item={subItem}
                                            onClick={handleNavigation}
                                        />
                                    ))}
                                </div>
                            </details>
                        ) : (
                            <NavLink
                                item={item}
                                onClick={handleNavigation}
                            />
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
