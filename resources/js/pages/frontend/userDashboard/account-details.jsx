

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Award, Calendar, Camera, Edit2, Eye, EyeOff, Mail, Package, Save, Shield, Star, TrendingUp, X, Loader2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export function AccountDetails({ user: initialUser }) {
    const [user, setUser] = useState(initialUser || {});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [profileImage, setProfileImage] = useState(user.photo ? `/storage/${user.photo}` : '/default-avatar.png');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
    });

    // Initialize form data when user data is available
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                gender: user.gender || '',
                dateOfBirth: user.date_of_birth || '',
            });
            setProfileImage(user.photo_url || (user.photo ? `/storage/${user.photo}` : '/default-avatar.png'));
        }
    }, [user]);

    // Fetch user data if not provided
    useEffect(() => {
        if (!initialUser) {
            fetchUserData();
        }
    }, [initialUser]);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/user/data');
            if (response.data.success) {
                setUser(response.data.data);
                setProfileImage(response.data.data.photo_url || (response.data.data.photo ? `/storage/${response.data.data.photo}` : '/default-avatar.png'));
            }
        } catch (error) {
            setError('Failed to fetch user data');
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.put('/api/user/update', formData);
            if (response.data.success) {
                setUser(response.data.data);
                setMessage('Profile updated successfully!');
                setIsEditing(false);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError(error.response?.data?.message || 'Failed to update profile');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            bio: user.bio || '',
            gender: user.gender || '',
            dateOfBirth: user.date_of_birth || '',
        });
        setIsEditing(false);
        setError('');
        setMessage('');
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                return;
            }

            // Check file size (2MB max)
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size must be less than 2MB.');
                return;
            }

            setIsUploading(true);
            setError('');
            setMessage('');

            try {
                const formData = new FormData();
                formData.append('avatar', file);

                const response = await axios.post('/api/user/upload-avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    setProfileImage(response.data.data.photo_url);
                    setUser(prev => ({
                        ...prev,
                        photo: response.data.data.photo
                    }));
                    setMessage('Profile picture updated successfully!');
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.values(errors).flat();
                    setError(errorMessages.join(', '));
                } else {
                    setError(error.response?.data?.message || 'Failed to upload profile picture');
                }
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handlePasswordInputChange = (field, value) => {
        setPasswordData((prev) => ({ ...prev, [field]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChangePassword = () => {
        setIsChangingPassword(true);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const handlePasswordSubmit = async () => {
        // Validate passwords
        if (!passwordData.currentPassword) {
            setError('Please enter your current password.');
            return;
        }
        if (!passwordData.newPassword) {
            setError('Please enter a new password.');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }

        setIsSaving(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/api/user/change-password', {
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
                new_password_confirmation: passwordData.confirmPassword,
            });

            if (response.data.success) {
                setMessage('Password changed successfully!');
                setIsChangingPassword(false);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setShowPasswords({
                    current: false,
                    new: false,
                    confirm: false,
                });
            } else {
                setError(response.data.message || 'Failed to change password');
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError(error.response?.data?.message || 'Failed to change password');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordCancel = () => {
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        setShowPasswords({
            current: false,
            new: false,
            confirm: false,
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading user data...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Messages */}
            {message && (
                <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
            )}

            {/* Profile Header Card */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-black">Account Details</CardTitle>
                            <CardDescription>Manage your personal information and account settings</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 text-black">

                            {
                                user.is_verified ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <Shield className="mr-1 h-3 w-3" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                        <Shield className="mr-1 h-3 w-3" />
                                        Unverified
                                    </Badge>
                                )
                            }





                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} size="sm" className="bg-sky-900 text-white">
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} disabled={isSaving} size="sm" className="bg-sky-900 text-white">
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save
                                            </>
                                        )}
                                    </Button>
                                    <Button onClick={handleCancel} variant="outline" size="sm" className="text-black">
                                        <X className="mr-2 h-4 w-4 text-black" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="group" title="Profile picture">
                                <Avatar className="h-24 w-24 transition-opacity group-hover:opacity-80">
                                    <AvatarImage src={profileImage} alt={user.name || 'User'} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                                        {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {(isEditing || !isEditing) && (
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                                    onClick={handleAvatarClick}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Camera className="h-4 w-4" />
                                    )}
                                </Button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={isUploading}
                            />
                            {/* <p className="mt-2 text-xs text-gray-500 text-center">
                                {isUploading ? 'Uploading...' : 'Click to change photo'}
                            </p> */}
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2 text-black">
                                <Label htmlFor="name">Full Name</Label>
                                {isEditing ? (
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-black">{formData.name || 'Not provided'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Mail className="h-5 w-5" />
                        Contact Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 text-black">
                            <Label htmlFor="email">Email Address</Label>
                            {isEditing ? (
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-black">{formData.email || 'Not provided'}</p>
                                    <Badge variant="outline" className="text-xs text-black">
                                        Primary
                                    </Badge>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 text-black">
                            <Label htmlFor="phone">Phone Number</Label>
                            {isEditing ? (
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            ) : (
                                <p className="text-sm font-medium text-black">{formData.phone || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Calendar className="h-5 w-5" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-black">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 text-black">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            {isEditing ? (
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                />
                            ) : (
                                <p className="text-sm font-medium text-gray-900">
                                    {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }) : 'Not provided'}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            {isEditing ? (
                                <select
                                    id="gender"
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    className="border-input focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            ) : (
                                <p className="text-sm font-medium text-black">{formData.gender || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Orders</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">47</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        +12%
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-500 p-3">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Spent</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">$2,847</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        +8%
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-500 p-3">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Reviews Written</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">23</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        +5
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-yellow-500 p-3">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Avg Rating</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">4.8</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        +0.2
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-500 p-3">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Account Security */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Shield className="h-5 w-5" />
                        Account Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-black">
                    <div className="rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                        {!isChangingPassword ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-black">Password</h4>
                                    <p className="text-sm text-black">Last updated 3 months ago</p>
                                </div>
                                <Button variant="outline" onClick={handleChangePassword}>
                                    Change Password
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="font-medium text-black">Change Password</h4>
                                    <Button variant="ghost" size="sm" onClick={handlePasswordCancel}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Current Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-black">
                                        Current Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showPasswords.current ? 'text' : 'password'}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                                            placeholder="Enter your current password"
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => togglePasswordVisibility('current')}
                                        >
                                            {showPasswords.current ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-black">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showPasswords.new ? 'text' : 'password'}
                                            value={passwordData.newPassword}
                                            onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                                            placeholder="Enter your new password"
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => togglePasswordVisibility('new')}
                                        >
                                            {showPasswords.new ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-black">
                                        Confirm New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                                            placeholder="Confirm your new password"
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                        >
                                            {showPasswords.confirm ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Password Requirements */}
                                <div className="rounded-lg bg-blue-50 p-3 text-xs text-gray-600">
                                    <p className="mb-1 font-medium">Password Requirements:</p>
                                    <ul className="list-inside list-disc space-y-1">
                                        <li>At least 8 characters long</li>
                                        <li>Must be different from your current password</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        onClick={handlePasswordSubmit}
                                        className="bg-sky-900 text-white"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Update Password
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handlePasswordCancel}
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                        <div>
                            <h4 className="font-medium text-black">Two-Factor Authentication</h4>
                            <p className="text-sm text-black">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" onClick={() => console.log('[v0] Setup 2FA')}>
                            Enable 2FA
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
