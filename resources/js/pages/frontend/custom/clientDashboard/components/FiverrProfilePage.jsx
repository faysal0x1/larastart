

import { Target, Clock3 } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

import { Card } from '@/components/ui/card';

// Main Profile Page Component
const FiverrProfilePage = () => {
    const user = {
        name: "Faysal R.",
        username: "faysal1244",
        avatar: "/api/placeholder/150/150",
        location: "Bangladesh",
        joinedDate: "November 2020",
        languages: [
            "English (Fluent)",
            "Spanish (Native/Bilingual)",
            "Bengali (Fluent)",
            "Hebrew (Native/Bilingual)"
        ]
    };

    const handleDismiss = () => {
        console.log("Alert dismissed");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-4 px-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>Home</span>
                    <span>/</span>
                    <span>My Profile</span>
                </div>

                <InfoAlert
                    message="This is your profile when ordering services."
                    link={{ text: "click here", url: "#" }}
                    onDismiss={handleDismiss}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <ProfileInfoCard user={user} />
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2">
                                Hi <span className="text-yellow-500">👋</span> Let's help freelancers get to know you
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Get the most out of Fiverr by sharing a bit more about yourself and how you prefer to work with freelancers.
                            </p>

                            <div className="mb-6">
                                <h2 className="font-medium mb-2">Profile checklist</h2>
                                <Progress value={33} className="h-1 mb-1" />
                                <div className="text-right text-xs text-gray-500">33%</div>
                            </div>

                            <ChecklistItem
                                icon={<Target size={20} />}
                                title="Share how you plan to use Fiverr"
                                description="Tell us if you're here to find services or offer them."
                                actionText="Add"
                            />

                            <ChecklistItem
                                icon={<Clock3 size={20} />}
                                title="Set your communication preferences"
                                description="Let freelancers know your collaboration preferences."
                                percentage={50}
                            />
                        </Card>

                        <ReviewsCard username={user.username} hasReviews={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiverrProfilePage;