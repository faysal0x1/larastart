
// NewsletterSignup.jsx
import { useState } from "react";
import { Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="my-12 p-8 bg-blue-50 rounded-xl">
      <h3 className="text-2xl font-bold mb-3">Subscribe to our newsletter</h3>
      <p className="text-gray-700 mb-6">Get the latest articles and resources straight to your inbox</p>
      
      {subscribed ? (
        <Alert className="bg-green-50 border-green-100">
          <AlertDescription>
            Thank you for subscribing! Please check your email to confirm your subscription.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            required
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Subscribe
            <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
};
export default NewsletterSignup;