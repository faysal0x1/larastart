import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Search, Settings, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProfileHeader({ user: userProp }) {
    const [user, setUser] = useState(userProp || null);
    const [orderCount, setOrderCount] = useState(0);
    const [hasCartItems, setHasCartItems] = useState(false);

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
                    setOrderCount(Number(s?.data?.total_orders || 0));
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

    // Basic cart detection from localStorage/cookies
    useEffect(() => {
        const readCookie = (name) => {
            if (typeof document === 'undefined') return null;
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        };

        const checkCart = () => {
            try {
                const keys = ['cart', 'cart_items', 'cartItems', 'cart_count'];
                for (const k of keys) {
                    const v = localStorage.getItem(k);
                    if (!v) continue;
                    if (k === 'cart_count') {
                        const n = Number(v);
                        if (!Number.isNaN(n) && n > 0) return setHasCartItems(true);
                    } else {
                        const parsed = JSON.parse(v);
                        const len = Array.isArray(parsed) ? parsed.length : (parsed?.items?.length || parsed?.length || 0);
                        if (len > 0) return setHasCartItems(true);
                    }
                }
            } catch (_) { /* ignore */ }
            // cookie presence can hint at a session cart
            const session = readCookie('cart_session');
            setHasCartItems(Boolean(session));
        };

        checkCart();
        const onStorage = (e) => {
            if (!e) return;
            if (['cart', 'cart_items', 'cartItems', 'cart_count'].includes(e.key)) checkCart();
        };
        const onFocus = () => checkCart();
        window.addEventListener('storage', onStorage);
        window.addEventListener('focus', onFocus);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('focus', onFocus);
        };
    }, []);
    return (
        <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="flex h-20 items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900" onClick={() => { try { window.location.href = '/'; } catch (_) { window.location.assign('/'); } }}>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                        <p className="text-sm text-gray-600">Manage your account and preferences</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search hidden per requirement */}
                    {false && (
                        <div className="relative hidden lg:block">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search orders, products..."
                                className="w-80 rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        {/* Notifications hidden per requirement */}
                        {false && (
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5 text-gray-600" />
                                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs text-white">
                                    3
                                </Badge>
                            </Button>
                        )}

                        <a href="/cart" className="relative">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5 text-gray-600" />
                            </Button>
                            {hasCartItems && (
                                <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500" />
                            )}
                        </a>

                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5 text-gray-600" />
                        </Button>

                        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={avatarUrl} alt={name} onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
                                <AvatarFallback className="bg-blue-600 font-semibold text-white">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-gray-900">{name}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-gray-600">Orders: {orderCount}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-[10px] text-green-700">BDT</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
