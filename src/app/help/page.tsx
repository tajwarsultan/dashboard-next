import React from 'react';

const HelpPage = () => {
  return (
    <div className="min-h-screen p-8 mt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">How do I get started?</h3>
            <p className="text-gray-600">
              Getting started is easy! Simply create an account and follow our quick setup guide.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">How can I reset my password?</h3>
            <p className="text-gray-600">
              Click on the Forgot Password link on the login page and follow the instructions sent to your email.
            </p>
          </div>
          {/* Add more FAQ items as needed */}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold my-5">Contact Support</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Email Support</h3>
              <p className="text-gray-600">
                support@yourcompany.com
                <br />
                Response time: Within 24 hours
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Phone Support</h3>
              <p className="text-gray-600">
                1-800-123-4567
                <br />
                Monday - Friday: 9 AM - 5 PM EST
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold my-6 ">Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/docs" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Documentation</h3>
            <p className="text-gray-600">Browse our detailed documentation</p>
          </a>
          <a href="/tutorials" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Tutorials</h3>
            <p className="text-gray-600">Watch video tutorials and guides</p>
          </a>
          <a href="/community" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Community</h3>
            <p className="text-gray-600">Join our community forum</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
