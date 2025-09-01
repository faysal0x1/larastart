import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function TestMultilingual() {
    const { t, loading, getCurrentLocale, getAvailableLocales } = useTranslation();
    const { currentLocale, availableLocales } = usePage().props;

    return (
        <>
            <Head title="Test Multilingual" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('navigation.platform')} - {t('welcome')}
                            </h1>
                            <LanguageSwitcher languages={availableLocales} currentLocale={currentLocale} />
                        </div>

                        <div className="space-y-6">
                            {/* Current Locale Info */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                    Current Locale Information
                                </h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Current Locale:</span> {getCurrentLocale()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Available Locales:</span> {getAvailableLocales().join(', ')}
                                    </div>
                                    <div>
                                        <span className="font-medium">Loading State:</span> {loading ? 'Loading...' : 'Loaded'}
                                    </div>
                                </div>
                            </div>

                            {/* Translation Tests */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-green-900 mb-2">
                                    Translation Tests
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Welcome:</span> {t('welcome')}</div>
                                    <div><span className="font-medium">Dashboard:</span> {t('dashboard')}</div>
                                    <div><span className="font-medium">Home:</span> {t('home')}</div>
                                    <div><span className="font-medium">About:</span> {t('about')}</div>
                                    <div><span className="font-medium">Contact:</span> {t('contact')}</div>
                                    <div><span className="font-medium">Login:</span> {t('login')}</div>
                                    <div><span className="font-medium">Logout:</span> {t('logout')}</div>
                                    <div><span className="font-medium">Register:</span> {t('register')}</div>
                                    <div><span className="font-medium">Profile:</span> {t('profile')}</div>
                                    <div><span className="font-medium">Settings:</span> {t('settings')}</div>
                                </div>
                            </div>

                            {/* Form Translations */}
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                                    Form Translations
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Name:</span> {t('form.name')}</div>
                                    <div><span className="font-medium">Email:</span> {t('form.email')}</div>
                                    <div><span className="font-medium">Password:</span> {t('form.password')}</div>
                                    <div><span className="font-medium">Phone:</span> {t('form.phone')}</div>
                                    <div><span className="font-medium">Address:</span> {t('form.address')}</div>
                                    <div><span className="font-medium">Description:</span> {t('form.description')}</div>
                                </div>
                            </div>

                            {/* Message Translations */}
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-purple-900 mb-2">
                                    Message Translations
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Created Successfully:</span> {t('messages.created_successfully', { item: 'Test Item' })}</div>
                                    <div><span className="font-medium">Updated Successfully:</span> {t('messages.updated_successfully', { item: 'Test Item' })}</div>
                                    <div><span className="font-medium">Deleted Successfully:</span> {t('messages.deleted_successfully', { item: 'Test Item' })}</div>
                                    <div><span className="font-medium">Operation Failed:</span> {t('messages.operation_failed')}</div>
                                    <div><span className="font-medium">Confirm Delete:</span> {t('messages.confirm_delete', { item: 'item' })}</div>
                                </div>
                            </div>

                            {/* Navigation Translations */}
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-indigo-900 mb-2">
                                    Navigation Translations
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Navigation:</span> {t('navigation')}</div>
                                    <div><span className="font-medium">Menu:</span> {t('menu')}</div>
                                    <div><span className="font-medium">Sidebar:</span> {t('sidebar')}</div>
                                    <div><span className="font-medium">Platform:</span> {t('navigation.platform')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
