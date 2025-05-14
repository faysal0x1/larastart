import { useForm } from '@inertiajs/react';
import { Camera, Edit2 } from 'lucide-react';
import { useState } from 'react';

const Profile = ({ user }) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        name: user.name || '',
        username: user.username || '',
        location: user.location?.country || '',
        languages: (() => {
            try {
                return user.professional_detail?.languages ? JSON.parse(user.professional_detail.languages).join(', ') : '';
            } catch (e) {
                return '';
            }
        })(),
        title: user?.professional_detail?.title || '',
    });

    // edit profile picture
    const [tempImage, setTempImage] = useState('');

    const imageForm = useForm({
        profile_image: null,
    });

    // Preview for image upload
    const [imagePreview, setImagePreview] = useState(null);

    const handleProfileSave = (e) => {
        e.preventDefault();
        // Using 'put' method instead of 'post' to match the route definition
        put(route('freelancer.profile.update'), {
            onSuccess: () => {
                setShowProfileModal(false);
            },
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            imageForm.setData('profile_image', file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveImage = (e) => {
        e.preventDefault();
        imageForm.post(route('profile.update.image'), {
            forceFormData: true,
            onSuccess: () => {
                setShowImageUpload(false);
                setImagePreview(null);
            },
        });
    };

    // Get profile image URL
    const getProfileImageUrl = () => {
        if (user?.photo) {
            return `/storage/${user.photo}`;
        }
        return null;
    };

    return (
        <div className="mx-auto w-full bg-gray-50">
            {/* Profile Header */}
            <div className="relative mb-6 rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-start gap-6">
                    {/* edit  */}
                    <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-indigo-100">
                            {getProfileImageUrl() ? (
                                <img src={getProfileImageUrl()} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-indigo-500">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <button
                            onClick={() => setShowImageUpload(true)}
                            className="absolute -right-2 -bottom-2 rounded-full border border-gray-200 bg-white p-2 shadow-md hover:bg-gray-50"
                        >
                            <Camera size={16} className="text-indigo-600" />
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-indigo-600">@{user.username}</p>
                        <p className="mt-1 text-gray-600">
                            {user.location?.country || 'No location set'} •{' '}
                            {user.professional_detail?.languages ? JSON.parse(user.professional_detail.languages).join(', ') : 'No languages set'}
                        </p>

                        <p className="mt-2 font-medium text-gray-700">{user.professional_detail?.title || 'No title set'}</p>
                    </div>

                    <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                        <Edit2 size={16} />
                        <span>Edit</span>
                    </button>
                </div>

                {/* Profile Edit Modal */}
                {showProfileModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>
                            <form onSubmit={handleProfileSave}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.username && <div className="text-sm text-red-500">{errors.username}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.location && <div className="text-sm text-red-500">{errors.location}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Languages</label>
                                        <input
                                            type="text"
                                            value={data.languages}
                                            onChange={(e) => setData('languages', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.languages && <div className="text-sm text-red-500">{errors.languages}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowProfileModal(false)}
                                        className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Image Upload Modal */}
                {showImageUpload && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-full max-w-md rounded-lg bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold">Update Profile Image</h2>
                            <form onSubmit={saveImage}>
                                <div className="flex flex-col items-center">
                                    {imagePreview && (
                                        <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                                            <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                        </div>
                                    )}

                                    <label className="w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700">
                                        Choose Image
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                    {imageForm.errors.profile_image && (
                                        <div className="mt-2 text-sm text-red-500">{imageForm.errors.profile_image}</div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowImageUpload(false);
                                            setImagePreview(null);
                                        }}
                                        className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!imageForm.data.profile_image || imageForm.processing}
                                        className={`rounded-md px-4 py-2 ${imageForm.data.profile_image ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'cursor-not-allowed bg-gray-300 text-gray-500'}`}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
