

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CreditCard, Heart, HelpCircle, LogOut, MapPin, Package, Settings, Star, TrendingUp, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProfileSidebar({ user: userProp, activeSection, onSectionChange }) {
    const [user, setUser] = useState(userProp || null);
    const [stats, setStats] = useState({ total_orders: 0, delivered: 0, spent: 0 });

    useEffect(() => {
        if (userProp) {
            setUser(userProp);
            return;
        }
        const load = async () => {
            try {
                const [uRes, sRes] = await Promise.all([
                    fetch('/api/user/data', { method: 'GET', headers: { Accept: 'application/json' }, credentials: 'include' }),
                    fetch('/api/user/orders/statistics', { method: 'GET', headers: { Accept: 'application/json' }, credentials: 'include' })
                ]);
                if (uRes.ok) {
                    const u = await uRes.json();
                    setUser(u?.data || null);
                }
                if (sRes.ok) {
                    const s = await sRes.json();
                    setStats({
                        total_orders: Number(s?.data?.total_orders || 0),
                        delivered: Number(s?.data?.delivered || 0),
                        spent: Number(s?.data?.total_spent || 0),
                    });
                }
            } catch (_) { /* ignore */ }
        };
        load();
    }, [userProp]);

    const name = user?.name || 'Guest User';
    const resolveAvatarUrl = (u) => {
        if (!u) return '/placeholder.svg';
        if (u.photo_url) return u.photo_url;
        const p = u.photo;
        if (!p) return '/placeholder.svg';
        if (/^https?:\/\//i.test(p)) return p;
        if (p.startsWith('/')) return p;
        return `/storage/${p}`;
    };
    const avatarUrl = resolveAvatarUrl(user);
    const initials = (name || 'G U')
        .split(' ')
        .map((p) => p?.[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
    const menuItems = [
        { icon: User, label: 'Account Details', key: 'account', badge: null },
        { icon: Package, label: 'Order History', key: 'orders', badge: null },
        { icon: MapPin, label: 'Addresses', key: 'addresses', badge: null },
        // { icon: CreditCard, label: 'Payment Methods', key: 'payments', badge: null },
        // { icon: Heart, label: 'Wishlist', key: 'wishlist', badge: '8' },
        // { icon: Star, label: 'Reviews', key: 'reviews', badge: '3' },
        // { icon: Settings, label: 'Preferences', key: 'preferences', badge: null },
        // { icon: HelpCircle, label: 'Help & Support', key: 'help', badge: null },
    ];

    return (
        <aside className="min-h-screen w-80 border-r border-gray-200 bg-white p-6">
            {/* User Profile Section */}
            <Card className="mb-6 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
                <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16 shadow-md ring-4 ring-white">
                            <AvatarImage src={avatarUrl} alt={name} onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
                            <AvatarFallback className="bg-blue-600 text-lg font-semibold text-white">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                            <Badge variant="secondary" className="bg-green-100 text-[10px] text-green-700">BDT</Badge>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-white p-3 text-center">
                            <div className="text-lg font-bold text-blue-600">{stats.total_orders}</div>
                            <div className="text-xs text-gray-600">Orders</div>
                        </div>
                        <div className="rounded-lg bg-white p-3 text-center">
                            <div className="text-lg font-bold text-green-600">৳{(stats.spent || 0).toLocaleString('en-BD')}</div>
                            <div className="text-xs text-gray-600">Spent</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation Menu */}
            <nav className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">Account</div>
                {menuItems.map((item) => (
                    <Button
                        key={item.key}
                        variant="ghost"
                        className={`h-12 w-full justify-between rounded-lg px-3 transition-all duration-200 ${activeSection === item.key
                            ? 'border-l-4 border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        onClick={() => onSectionChange(item.key)}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={`h-5 w-5 ${activeSection === item.key ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                            <Badge variant="secondary" className="bg-gray-100 text-xs text-gray-700">
                                {item.badge}
                            </Badge>
                        )}
                    </Button>
                ))}
            </nav>

            {/* Quick Actions */}
            <Card className="mt-8 border-0 bg-gray-50 shadow-sm">
                <CardContent className="p-4">
                    <div className="mb-3 text-sm font-semibold text-gray-700">Quick Actions</div>
                    <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900">
                            <TrendingUp className="h-4 w-4" />
                            Track Order
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900">
                            <Calendar className="h-4 w-4" />
                            Schedule Delivery
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Sign Out */}
            <div className="mt-8 border-t border-gray-200 pt-6">
                <Button
                    variant="ghost"
                    className="h-12 w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => console.log('[v0] Sign out clicked')}
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
