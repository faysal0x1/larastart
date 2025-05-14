import FAQSection from './FAQSection';

const faqData = {
  "Account management": [
    {
      question: "Is my personal information safer?",
      answer: "Fiverr takes the security of your personal information very seriously. We use industry-standard encryption and security measures to protect your data."
    },
    {
      question: "How do I change/reset my password?",
      answer: "You can change your password in the Account Settings section. If you need to reset it, click on 'Forgot Password' on the login page and follow the instructions."
    },
    {
      question: "How do I close my account?",
      answer: "Account closure can be requested in the Account Settings under the 'Close Account' option. Note that this action is irreversible."
    },
    {
      question: "What does my online status mean?",
      answer: "Your online status indicates your availability to clients. When active, it shows you're available for new orders and messages."
    }
  ],
  "Policy and safety": [
    {
      question: "Will you ever ask for my password?",
      answer: "No, Fiverr will never ask for your password. Be cautious of any messages or emails requesting this information."
    },
    {
      question: "Does Fiverr contact its users?",
      answer: "Yes, Fiverr may contact you regarding your account, orders, or platform updates, but we will never ask for sensitive information like passwords."
    }
  ],
  "Payments and withdrawals": [
    {
      question: "How long does it take for me to receive revenues from an order?",
      answer: "Revenue from completed orders typically becomes available for withdrawal after a 14-day clearance period."
    },
    {
      question: "Can I purchase Gig with my revenue?",
      answer: "Yes, you can use your available revenue to purchase services on Fiverr."
    },
    {
      question: "Are there any fees when withdrawing revenue?",
      answer: "Fiverr charges a $1 processing fee for each withdrawal."
    },
    {
      question: "Can I have more than one withdrawal provider?",
      answer: "Yes, you can set up multiple withdrawal methods in your payment settings."
    },
    {
      question: "Can I cancel my withdrawal?",
      answer: "Withdrawals can be cancelled within 24 hours of the request if they haven't been processed yet."
    },
    {
      question: "Does Fiverr charge fees when withdrawing revenue to a PayPal account?",
      answer: "Fiverr charges a $1 processing fee, but PayPal may charge additional fees depending on your account type."
    },
    {
      question: "How do I claim unclaimed withdrawals?",
      answer: "Unclaimed withdrawals can be claimed through your payment settings within 30 days."
    },
    {
      question: "Do I have to pay taxes on income earned on Fiverr?",
      answer: "Tax obligations vary by country. Consult a tax professional for advice specific to your situation."
    }
  ],
  "Handling orders": [
    {
      question: "How can I contact a client?",
      answer: "You can contact clients through the Fiverr messaging system once an order is placed."
    },
    {
      question: "What if my file upload or delivery upload fails?",
      answer: "Try again or use an alternative file sharing service, then share the link through the order page."
    },
    {
      question: "Can I partially cancel/refund an order?",
      answer: "Partial cancellations/refunds are not currently supported. You would need to cancel the entire order or deliver additional work."
    },
    {
      question: "Can I accept a tip?",
      answer: "Yes, clients can tip you after order completion through the tipping feature."
    }
  ],
  "Managing Gigs": [
    {
      question: "What are packages?",
      answer: "Packages allow you to offer different service tiers (Basic, Standard, Premium) with varying features and prices."
    },
    {
      question: "How do packages work?",
      answer: "Clients can choose the package that best fits their needs, and you'll deliver according to the package specifications."
    },
    {
      question: "How much should I charge for my package?",
      answer: "Consider your time, expertise, and market rates when pricing your packages."
    },
    {
      question: "What is the difference between extras and upgrades?",
      answer: "Extras are additional services clients can add to any package, while upgrades are enhancements to a specific package."
    },
    {
      question: "Does this service fee change?",
      answer: "Service fees are subject to change, but you'll be notified in advance of any changes."
    },
    {
      question: "Will it change my rating?",
      answer: "Offering packages or extras doesn't directly affect your rating, but client satisfaction with your offerings will."
    },
    {
      question: "How should I label or name my packages?",
      answer: "Use clear, descriptive names that reflect the value and scope of each package."
    }
  ]
};

export default function FAQContent({ activeSection }) {
  return (
    <main className="w-6xl p-6 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeSection}</h2>

        <FAQSection items={faqData[activeSection] || []} />

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Can't find what you need?</h3>
          <p className="text-gray-600 mb-4">We're here to help you with any questions.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}