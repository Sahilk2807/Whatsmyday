import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-4 text-sm">
      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
      <p>
        Your privacy is important to us. This Privacy Policy explains how "What’s My Day" ("we", "us", "our") collects, uses, and protects your information.
      </p>

      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">1. Information We Collect</h3>
      <p>
        To provide our service, we collect the following information that you voluntarily provide:
      </p>
      <ul className="list-disc list-inside pl-4">
        <li><strong>Name:</strong> To personalize your daily affirmation.</li>
        <li><strong>Date of Birth:</strong> To determine your zodiac sign and generate your daily fortune.</li>
      </ul>

      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">2. How We Use Your Information</h3>
      <p>
        The information you provide is used solely for the purpose of generating your personalized daily fortune within the app.
      </p>
      <p>
        <strong>We do not store your name or date of birth on our servers.</strong> The information is sent to our API for a one-time calculation and is immediately discarded after your fortune is sent back to you. It is not saved in any database or log file.
      </p>

      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">3. Third-Party Services</h3>
      <p>
        Our app may use third-party services for monetization, such as:
      </p>
      <ul className="list-disc list-inside pl-4">
        <li><strong>Ad Networks (e.g., AdMob):</strong> These services may collect device information to serve relevant ads. We do not share your personal data (name, DOB) with them.</li>
        <li><strong>Payment Gateways:</strong> If you choose the "Remove Ads" option, a third-party payment provider will process your payment. We do not receive or store your payment card details.</li>
      </ul>
      <p>We encourage you to review the privacy policies of these third-party services.</p>
      
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">4. Your Consent</h3>
      <p>
        By using our app and checking the consent box, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">5. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:officialsahilkamble@gmail.com" className="text-brand-purple hover:underline">officialsahilkamble@gmail.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;