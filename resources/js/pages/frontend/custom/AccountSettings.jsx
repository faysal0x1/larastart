import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("security");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountInfo />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "w9":
        return <FormW9 />;
      case "info":
        return <PersonalBusinessInfo />;
      default:
        return <SecuritySettings />;
    }
  };

  return (
    
    <div className="flex justify-center min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <nav className="space-y-2">
          <Button
            variant={activeTab === "account" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("account")}
          >
            Account
          </Button>
          <Button
            variant={activeTab === "security" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("security")}
          >
            Security
          </Button>
          <Button
            variant={activeTab === "notifications" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </Button>
          <Button
            variant={activeTab === "w9" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("w9")}
          >
            Form W-9
          </Button>
          <Button
            variant={activeTab === "info" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("info")}
          >
            Personal & Business Info
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-6xl p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 capitalize">
            {activeTab === "w9" ? "Form W-9" : activeTab === "info" ? "Personal & Business Info" : activeTab}
          </h1>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Component for Security Tab
const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <p className="text-sm text-gray-500">
            8 characters or longer. Combine upper and lowercase letters and numbers.
          </p>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
    
  );
};

// Placeholder components for other tabs
const AccountInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account Information</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Account settings content goes here.</p>
    </CardContent>
  </Card>
);

const NotificationSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notification Preferences</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Notification settings content goes here.</p>
    </CardContent>
  </Card>
);

const FormW9 = () => (
  <Card>
    <CardHeader>
      <CardTitle>Form W-9</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Form W-9 content goes here.</p>
    </CardContent>
  </Card>
);

const PersonalBusinessInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle>Personal & Business Information</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Personal and business info content goes here.</p>
    </CardContent>
  </Card>
  
);

export default AccountSettings;