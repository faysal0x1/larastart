import { Toaster } from 'sonner';
import AboutSection from '@/components/frontend/employeeDashboard/AboutSection.jsx';
import VideoIntro from '@/components/frontend/employeeDashboard/VideoIntro.jsx';
import SkillsBadges from '@/components/frontend/employeeDashboard/SkillsBadges.jsx';
import EducationCertificates from '@/components/frontend/employeeDashboard/EducationCertificates.jsx';
import EmployeeDashboardLayout from '@/layouts/employeeDashboardLayout/EmployeeDashboardLayout.jsx';
import Profile from '@/components/frontend/employeeDashboard/Profile.jsx';

const ProfilePage = ({ auth, user }) => {
    return (
        <EmployeeDashboardLayout>
            <div className="min-h-screen bg-gray-50">
                <Toaster position="top-right" richColors closeButton expand={true} visibleToasts={3} />

                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Mobile Order (stacked) */}
                    <div className="flex flex-col space-y-6 lg:hidden">
                        <Profile user={user} />
                        <AboutSection />
                        <VideoIntro />
                        <EducationCertificates />
                        <SkillsBadges />
                    </div>

                    {/* Desktop Order (two columns) */}
                    <div className="hidden lg:flex lg:flex-col">
                        {/* Profile Header - Full width */}
                        <div className="mb-8">
                            <Profile user={user} />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-row gap-6">
                            {/* Left Column - Education */}
                            <div className="w-1/3">
                                <EducationCertificates />
                            </div>

                            {/* Right Column - Stacked components */}
                            <div className="w-2/3 space-y-6">
                                <AboutSection />
                                <VideoIntro />
                                <SkillsBadges />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </EmployeeDashboardLayout>
    );
};

export default ProfilePage;
