'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Check, Edit2, Filter, Home, MapPin, Plus, RefreshCw, Search, Star, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Simple authentication check helper
const checkAuthStatus = async () => {
    try {
        const response = await fetch('/api/user/data', {
            method: 'GET',
            headers: { Accept: 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) return false;
        const data = await response.json();
        return Boolean(data && (data.success === true || data.data));
    } catch {
        return false;
    }
};

export function AddressManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        post_code: '',
        division_id: '',
        district_id: '',
        upazilla_id: '',
    });

    // Location data states
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(false);

    const resetForm = () => {
        setFormData({
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: '',
            post_code: '',
            division_id: '',
            district_id: '',
            upazilla_id: '',
        });
        setDistricts([]);
        setUpazillas([]);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };
            // Reset dependent fields when parent location changes
            if (field === 'division_id') {
                newData.district_id = '';
                newData.upazilla_id = '';
            } else if (field === 'district_id') {
                newData.upazilla_id = '';
            }
            return newData;
        });
    };

    // Helper functions for authentication
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

    const ensureCsrfHeaders = async () => {
        const headers = { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' };
        const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : null;
        if (metaToken) {
            headers['X-CSRF-TOKEN'] = metaToken;
            return headers;
        }
        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
            const xsrf = readCookie('XSRF-TOKEN');
            if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
        } catch (_) {
            /* ignore */
        }
        return headers;
    };

    // Location API Functions
    const fetchDivisions = async () => {
        try {
            setLoadingLocations(true);
            const response = await fetch('/locations/divisions', {
                method: 'GET',
                headers: { Accept: 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setDivisions(data.data || []);
            }
        } catch (err) {
            console.error('Error fetching divisions:', err);
        } finally {
            setLoadingLocations(false);
        }
    };

    const fetchDistricts = async (divisionId) => {
        if (!divisionId) {
            setDistricts([]);
            setUpazillas([]);
            return;
        }
        try {
            const response = await fetch(`/locations/districts?division_id=${divisionId}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setDistricts(data.data || []);
                setUpazillas([]);
            }
        } catch (err) {
            console.error('Error fetching districts:', err);
        }
    };

    const fetchUpazillas = async (districtId) => {
        if (!districtId) {
            setUpazillas([]);
            return;
        }
        try {
            const response = await fetch(`/locations/upazillas?district_id=${districtId}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUpazillas(data.data || []);
            }
        } catch (err) {
            console.error('Error fetching upazillas:', err);
        }
    };

    // API Functions
    const fetchAddresses = async () => {
        try {
            setLoading(true);
            setError(null);

            const headers = await ensureCsrfHeaders();
            const response = await fetch('/user/addresses', {
                method: 'GET',
                headers,
                credentials: 'include',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to view your addresses');
                }
                throw new Error(`Failed to fetch addresses: ${response.statusText}`);
            }

            const data = await response.json();
            const addressesData = data.data || [];

            // Transform API data to match component structure
            const transformedAddresses = addressesData.map((addr) => ({
                id: addr.id,
                name: addr.name || 'Address',
                fullName: addr.name,
                phone: addr.phone,
                email: addr.email || '',
                address: addr.address,
                addressLine1: addr.address, // For search functionality
                post_code: addr.post_code || '',
                city: addr.city || '',
                state: '', // Not used in this system
                isDefault: addr.isDefault || false,
                type: 'home', // Default type since API doesn't return this
                division_id: addr.division_id || null,
                district_id: addr.district_id || null,
                upazilla_id: addr.upazilla_id || null,
            }));

            setAddresses(transformedAddresses);
        } catch (err) {
            setError(err.message || 'Failed to fetch addresses');
            console.error('Error fetching addresses:', err);
        } finally {
            setLoading(false);
        }
    };

    const createAddress = async (addressData) => {
        try {
            console.log('Creating address with data:', addressData);

            // Build payload similar to CartPage.jsx
            const payload = {
                first_name: addressData.first_name,
                last_name: addressData.last_name,
                phone: addressData.phone,
                email: addressData.email,
                post_code: addressData.post_code ? Number(addressData.post_code) : undefined,
                division_id: addressData.division_id ? Number(addressData.division_id) : undefined,
                district_id: addressData.district_id ? Number(addressData.district_id) : undefined,
                upazilla_id: addressData.upazilla_id ? Number(addressData.upazilla_id) : undefined,
                address: addressData.address,
            };

            const headers = await ensureCsrfHeaders();

            const response = await fetch('/user/addresses', {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response body:', errorText);

                if (response.status === 401) {
                    throw new Error('Please log in to create an address');
                }
                if (response.status === 405) {
                    throw new Error('Method not allowed - please check if you are logged in');
                }
                if (response.status === 422) {
                    try {
                        const errorData = JSON.parse(errorText);
                        const validationErrors = errorData.errors || {};
                        const errorMessages = Object.values(validationErrors).flat();
                        throw new Error(`Validation error: ${errorMessages.join(', ')}`);
                    } catch (parseError) {
                        throw new Error(`Validation error: ${errorText}`);
                    }
                }
                throw new Error(`Failed to create address: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const created = data?.data;
            if (created) {
                // Optimistically prepend created address to local state
                setAddresses((prev) => [
                    {
                        id: created.id,
                        name: created.name || 'Address',
                        fullName: created.name,
                        phone: created.phone,
                        email: created.email || '',
                        address: created.address,
                        addressLine1: created.address,
                        post_code: created.post_code || '',
                        city: created.city || '',
                        state: '',
                        isDefault: created.isDefault || false,
                        type: 'home',
                    },
                    ...prev,
                ]);
            }
            return created;
        } catch (err) {
            console.error('Error creating address:', err);
            throw new Error(err.message || 'Failed to create address');
        }
    };

    // Load addresses and divisions on component mount
    useEffect(() => {
        const initializeComponent = async () => {
            // Check if user is authenticated first
            const isAuthenticated = await checkAuthStatus();
            if (!isAuthenticated) {
                setError('Please log in to manage your addresses. You may need to refresh the page after logging in.');
                setLoading(false);
                return;
            }

            // If authenticated, fetch addresses and divisions
            await Promise.all([fetchAddresses(), fetchDivisions()]);
        };

        initializeComponent();
    }, []);

    // Handle division change
    useEffect(() => {
        if (formData.division_id) {
            fetchDistricts(formData.division_id);
        }
    }, [formData.division_id]);

    // Handle district change
    useEffect(() => {
        if (formData.district_id) {
            fetchUpazillas(formData.district_id);
        }
    }, [formData.district_id]);

    const handleAddAddress = async () => {
        try {
            // Debug: Log form data before sending
            console.log('Form data being submitted:', formData);

            // Validate required fields
            if (!formData.first_name || !formData.phone || !formData.address) {
                setError('Please fill in all required fields (First Name, Phone, Address)');
                return;
            }

            // Prepare data with proper null values for empty numeric fields
            const addressData = {
                ...formData,
                post_code: formData.post_code ? Number(formData.post_code) : null,
                division_id: formData.division_id ? Number(formData.division_id) : null,
                district_id: formData.district_id ? Number(formData.district_id) : null,
                upazilla_id: formData.upazilla_id ? Number(formData.upazilla_id) : null,
            };

            await createAddress(addressData);
            setIsAddDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error('Add address error:', error);
            setError(error.message || 'Failed to add address');
        }
    };

    const handleEditAddress = async (address) => {
        setEditingAddress(address.id);
        // Map address data to form structure
        const nameParts = address.fullName ? address.fullName.split(' ') : [''];
        const newFormData = {
            first_name: nameParts[0] || '',
            last_name: nameParts.slice(1).join(' ') || '',
            phone: address.phone || '',
            email: address.email || '',
            address: address.address || '',
            post_code: address.post_code || '',
            division_id: address.division_id || '',
            district_id: address.district_id || '',
            upazilla_id: address.upazilla_id || '',
        };

        setFormData(newFormData);

        // Load dependent location data if needed
        if (newFormData.division_id) {
            await fetchDistricts(newFormData.division_id);
            if (newFormData.district_id) {
                await fetchUpazillas(newFormData.district_id);
            }
        }

        setIsAddDialogOpen(true);
    };

    const updateAddress = async (addressId, addressData) => {
        try {
            const headers = await ensureCsrfHeaders();
            const response = await fetch(`/user/addresses/${addressId}`, {
                method: 'PUT',
                headers,
                credentials: 'include',
                body: JSON.stringify(addressData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 401) {
                    throw new Error('Please log in to update address');
                }
                if (response.status === 404) {
                    throw new Error('Address not found');
                }
                if (response.status === 422) {
                    try {
                        const errorData = JSON.parse(errorText);
                        const validationErrors = errorData.errors || {};
                        const errorMessages = Object.values(validationErrors).flat();
                        throw new Error(`Validation error: ${errorMessages.join(', ')}`);
                    } catch (parseError) {
                        throw new Error(`Validation error: ${errorText}`);
                    }
                }
                throw new Error(`Failed to update address: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const updatedAddress = data.data;

            // Re-fetch to sync UI
            await fetchAddresses();
            return updatedAddress;
        } catch (err) {
            console.error('Error updating address:', err);
            throw new Error(err.message || 'Failed to update address');
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const headers = await ensureCsrfHeaders();
            const response = await fetch(`/user/addresses/${addressId}`, {
                method: 'DELETE',
                headers,
                credentials: 'include',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to delete address');
                }
                if (response.status === 404) {
                    throw new Error('Address not found');
                }
                throw new Error(`Failed to delete address: ${response.status} ${response.statusText}`);
            }

            // Re-fetch to sync UI
            await fetchAddresses();
        } catch (err) {
            console.error('Error deleting address:', err);
            throw new Error(err.message || 'Failed to delete address');
        }
    };

    const handleUpdateAddress = async () => {
        try {
            // Validate required fields
            if (!formData.first_name || !formData.phone || !formData.address) {
                setError('Please fill in all required fields (First Name, Phone, Address)');
                return;
            }

            // Prepare data with proper null values for empty numeric fields
            const addressData = {
                ...formData,
                post_code: formData.post_code ? Number(formData.post_code) : null,
                division_id: formData.division_id ? Number(formData.division_id) : null,
                district_id: formData.district_id ? Number(formData.district_id) : null,
                upazilla_id: formData.upazilla_id ? Number(formData.upazilla_id) : null,
            };

            await updateAddress(editingAddress, addressData);
            setIsAddDialogOpen(false);
            setEditingAddress(null);
            resetForm();
            setError(null);
        } catch (error) {
            console.error('Update address error:', error);
            setError(error.message || 'Failed to update address');
        }
    };

    const handleDeleteAddress = async (addressId) => {
        if (!confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            await deleteAddress(addressId);
            setError(null);
        } catch (error) {
            console.error('Delete address error:', error);
            setError(error.message || 'Failed to delete address');
        }
    };

    const setDefaultAddress = async (addressId) => {
        try {
            const headers = await ensureCsrfHeaders();
            const response = await fetch(`/user/addresses/${addressId}/set-default`, {
                method: 'PATCH',
                headers,
                credentials: 'include',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to set default address');
                }
                if (response.status === 404) {
                    throw new Error('Address not found');
                }
                throw new Error(`Failed to set default address: ${response.status} ${response.statusText}`);
            }

            // Re-fetch to reflect the new default
            await fetchAddresses();
        } catch (err) {
            console.error('Error setting default address:', err);
            throw new Error(err.message || 'Failed to set default address');
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(addressId);
            setError(null);
        } catch (error) {
            console.error('Set default address error:', error);
            setError(error.message || 'Failed to set default address');
        }
    };

    const getAddressIcon = (type) => {
        switch (type) {
            case 'home':
                return <Home className="h-4 w-4" />;
            case 'work':
                return <Building className="h-4 w-4" />;
            default:
                return <MapPin className="h-4 w-4" />;
        }
    };

    const getAddressTypeColor = (type) => {
        switch (type) {
            case 'home':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'work':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const filteredAddresses = addresses.filter((address) => {
        const matchesSearch =
            (address.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (address.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (address.addressLine1 || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (address.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (address.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (address.phone || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || address.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            {/* Error Display */}
            {error && (
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <div className="text-red-800">{error}</div>
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => setError(null)}>
                            Dismiss
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Header */}
            <Card className="border-0 bg-white text-black shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-black">Address Management</CardTitle>
                            <CardDescription>Manage your shipping and billing addresses</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={fetchAddresses} disabled={loading}>
                                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={resetForm}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Address
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                                        <DialogDescription>
                                            {editingAddress ? 'Update your address information' : 'Add a new shipping or billing address'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="first_name">First Name</Label>
                                                <Input
                                                    id="first_name"
                                                    value={formData.first_name}
                                                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                    placeholder="First name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last_name">Last Name</Label>
                                                <Input
                                                    id="last_name"
                                                    value={formData.last_name}
                                                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                                                    placeholder="Last name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder="Phone number"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email (Optional)</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Full Address</Label>
                                            <Input
                                                id="address"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                placeholder="Complete address"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="post_code">Post Code (Optional)</Label>
                                            <Input
                                                id="post_code"
                                                value={formData.post_code}
                                                onChange={(e) => handleInputChange('post_code', e.target.value)}
                                                placeholder="Post code"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="division_id">Division</Label>
                                                <select
                                                    id="division_id"
                                                    value={formData.division_id}
                                                    onChange={(e) => handleInputChange('division_id', e.target.value)}
                                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    disabled={loadingLocations}
                                                >
                                                    <option value="">Select Division</option>
                                                    {divisions.map((division) => (
                                                        <option key={division.id} value={division.id}>
                                                            {division.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="district_id">District</Label>
                                                <select
                                                    id="district_id"
                                                    value={formData.district_id}
                                                    onChange={(e) => handleInputChange('district_id', e.target.value)}
                                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    disabled={!formData.division_id || loadingLocations}
                                                >
                                                    <option value="">Select District</option>
                                                    {districts.map((district) => (
                                                        <option key={district.id} value={district.id}>
                                                            {district.district_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="upazilla_id">Upazilla</Label>
                                                <select
                                                    id="upazilla_id"
                                                    value={formData.upazilla_id}
                                                    onChange={(e) => handleInputChange('upazilla_id', e.target.value)}
                                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    disabled={!formData.district_id || loadingLocations}
                                                >
                                                    <option value="">Select Upazilla</option>
                                                    {upazillas.map((upazilla) => (
                                                        <option key={upazilla.id} value={upazilla.id}>
                                                            {upazilla.upazilla_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsAddDialogOpen(false);
                                                setEditingAddress(null);
                                                resetForm();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={editingAddress ? handleUpdateAddress : handleAddAddress}>
                                            {editingAddress ? 'Update Address' : 'Add Address'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Search and Filter */}
            <Card className="border-0 bg-white text-black shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search addresses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="border-input focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                            >
                                <option value="all">All Addresses</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Address Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Addresses</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{addresses.length}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-500 p-3">
                                <MapPin className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Home Addresses</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{addresses.filter((addr) => addr.type === 'home').length}</p>
                                    <Badge variant="secondary" className="bg-blue-100 text-xs text-blue-700">
                                        Personal
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-600 p-3">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Work Addresses</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{addresses.filter((addr) => addr.type === 'work').length}</p>
                                    <Badge variant="secondary" className="bg-purple-100 text-xs text-purple-700">
                                        Business
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-500 p-3">
                                <Building className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Addresses List */}
            {loading ? (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-gray-400" />
                            <p className="text-black">Loading addresses...</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredAddresses.map((address) => (
                        <Card key={address.id} className={`border-0 bg-white shadow-sm ${address.isDefault ? 'ring-primary ring-2' : ''}`}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <CardTitle className="text-lg text-black">{address.name}</CardTitle>
                                            <CardDescription>
                                                {address.type === 'home'
                                                    ? 'Personal Address'
                                                    : address.type === 'work'
                                                        ? 'Business Address'
                                                        : 'Other Address'}
                                            </CardDescription>
                                        </div>
                                        <Badge className={getAddressTypeColor(address.type)}>
                                            {getAddressIcon(address.type)}
                                            <span className="ml-1 capitalize">{address.type}</span>
                                        </Badge>
                                        {address.isDefault && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                <Star className="mr-1 h-3 w-3" />
                                                Default
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-black">{address.fullName}</div>
                                        <div className="text-sm text-black">
                                            {address.city && address.state
                                                ? `${address.city}, ${address.state}`
                                                : address.city || address.state || 'Location not specified'}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Address Details */}
                                <div className="mb-4 space-y-3">
                                    <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                                        <div className="rounded-lg bg-gray-200 p-2">
                                            <MapPin className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-black">
                                                <p className="font-medium">{address.address}</p>
                                                {address.city && <p>{address.city}</p>}
                                                {address.post_code && <p>Post Code: {address.post_code}</p>}
                                                <p className="text-muted-foreground mt-2">Phone: {address.phone}</p>
                                                {address.email && <p className="text-muted-foreground">Email: {address.email}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 border-t pt-4">
                                    <Button size="sm" className="text-black" variant="outline" onClick={() => handleEditAddress(address)}>
                                        <Edit2 className="mr-1 h-4 w-4 text-black" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="text-black"
                                        variant="outline"
                                        onClick={() => console.log('[v0] Using address for shipping:', address.id)}
                                    >
                                        <MapPin className="mr-1 h-4 w-4 text-black" />
                                        Use for Shipping
                                    </Button>
                                    {!address.isDefault && (
                                        <Button size="sm" className="bg-sky-900 text-white" onClick={() => handleSetDefault(address.id)}>
                                            <Check className="mr-1 h-4 w-4" />
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button size="sm" variant="destructive" onClick={() => handleDeleteAddress(address.id)} className="text-black">
                                        <Trash2 className="mr-1 h-4 w-4 text-black" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {!loading && filteredAddresses.length === 0 && (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-black">No addresses found</h3>
                            <p className="text-black">
                                {searchTerm || filterType !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : "You haven't added any addresses yet"}
                            </p>
                            {addresses.length === 0 && (
                                <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Address
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
