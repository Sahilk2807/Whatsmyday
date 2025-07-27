import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-4 text-sm">
      <p>
        We'd love to hear from you! Whether you have a question, feedback, or need support, please don't hesitate to reach out.
      </p>
      <p>
        Your insights help us make "What's My Day" better for everyone.
      </p>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Support & Inquiries</h3>
        <p>For all support questions and general inquiries, please email us at:</p>
        <a 
          href="mailto:officialsahilkamble@gmail.com" 
          className="text-brand-purple font-medium hover:underline"
        >
          officialsahilkamble@gmail.com
        </a>
      </div>
      <p>
        We aim to respond to all emails within 48 business hours. Thank you for using our app!
      </p>
    </div>
  );
};

export default Contact;