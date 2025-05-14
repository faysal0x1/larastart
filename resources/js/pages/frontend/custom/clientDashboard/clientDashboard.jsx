import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Clock3, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ProfileInfoCard from './components/ProfileInfoCard';
import InfoAlert from './components/InfoAlert';
import ChecklistItem from './components/ChecklistItem';
import ReviewsCard from './components/ReviewsCard';

const ClientDashboard = () => {
    const user = {
        name: 'Faysal R.',
        username: 'faysal1244',
        avatar: 'https://i.pinimg.com/736x/21/36/3a/21363a7792d273dfee77c855ee77f4c1.jpg',
        location: 'Bangladesh',
        joinedDate: 'November 2020',
        languages: ['English (Fluent)', 'Spanish (Native/Bilingual)', 'Bengali (Fluent)', 'Hebrew (Native/Bilingual)'],
    };

    const [showAlert, setShowAlert] = useState(true);

    const handleDismiss = () => {
        setShowAlert(false);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <ProfileInfoCard user={user} />
                    </div>
                    <div className="space-y-6 md:col-span-2">
                        <Card className="p-6">
                            {showAlert && (
                                <InfoAlert
                                    message="This is your profile when ordering services."
                                    link={{ text: 'click here', url: '#' }}
                                    onDismiss={handleDismiss}
                                />
                            )}

                            <h1 className="mb-1 flex items-center gap-2 text-2xl font-semibold">
                                Hi <span className="text-yellow-500">👋</span> Let's help freelancers get to know you
                            </h1>
                            <p className="mb-6 text-gray-600">
                                Get the most out of Fiverr by sharing a bit more about yourself and how you prefer to work with freelancers.
                            </p>

                            <div className="mb-6">
                                <h2 className="mb-2 font-medium">Profile checklist</h2>
                                <Progress value={33} className="mb-1 h-1" />
                                <div className="text-right text-xs text-gray-500">33%</div>
                            </div>

                            <ChecklistItem
                                icon={<Target size={20} />}
                                title="Grow Up your business with Microjobs"
                                description="Tell us if you're here to find services or offer them."
                                // actionText="Add"
                            />

                            <ChecklistItem
                                icon={<Clock3 size={20} />}
                                title="Set your communication preferences"
                                description="Let freelancers know your collaboration preferences."
                                percentage={50}
                            />

                            {/* Create Job Post section  */}
                            <div className="space-y-6 lg:col-span-2">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h2 className="text-xl font-semibold">Create New Job</h2>
                                            <Link className="primary-btn" href={route('post-job')}>
                                                Create Job
                                            </Link>
                                        </div>
                                        <p className="text-gray-600">Click the button above to create a new micro job listing.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </Card>

                        <ReviewsCard username={user.username} hasReviews={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;