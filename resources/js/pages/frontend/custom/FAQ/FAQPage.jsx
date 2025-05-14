import { useState } from 'react';
import FAQSidebar from './components/FAQSidebar';
import FAQContent from './components/FAQContent';
import MobileMenuButton from './components/MobileMenuButton';
import Navbar from './components/FAQNavbar'; // Import the Navbar component

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState("Account management");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    "Account management",
    "Policy and safety",
    "Payments and withdrawals",
    "Handling orders",
    "Managing Gigs"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add the Navbar at the top */}
      <Navbar />
      
      <div className="flex pt-16 lg:justify-center items-baseline"> {/* Add padding-top to account for navbar height */}
        <MobileMenuButton 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <FAQSidebar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
        
        <FAQContent activeSection={activeSection} />
      </div>
    </div>
  );
}