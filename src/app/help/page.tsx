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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">How do I connect my bank account?</h3>
            <p className="text-gray-600">
              We use secure bank-level encryption to connect your accounts. Simply go to Settings → Connect Bank and follow the prompts to safely link your financial institutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Is my financial data secure?</h3>
            <p className="text-gray-600">
              Yes! We use industry-standard encryption and security measures. We never store your bank credentials, and all data is encrypted both in transit and at rest.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">How do I create a budget?</h3>
            <p className="text-gray-600">
              Navigate to the Budget section, click Create New Budget, and follow our step-by-step wizard to set up custom categories and spending limits.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">How are my investment returns calculated?</h3>
            <p className="text-gray-600">
              We use time-weighted return (TWR) methodology to calculate your investment performance, accounting for deposits and withdrawals to give you the most accurate picture of your returns.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold my-5">Contact Support</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Financial Support Team</h3>
              <p className="text-gray-600">
                finance.support@yourcompany.com
                <br />
                Response time: Within 12 hours
                <br />
                For urgent account-related issues
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Technical Support</h3>
              <p className="text-gray-600">
                1-800-123-4567
                <br />
                24/7 Support for Premium Members
                <br />
                Monday - Friday: 9 AM - 8 PM EST for Standard Members
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold my-6">Financial Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/learn" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Financial Education</h3>
            <p className="text-gray-600">Free courses on investing, budgeting, and wealth building</p>
          </a>
          <a href="/market-insights" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Market Insights</h3>
            <p className="text-gray-600">Daily market analysis and investment trends</p>
          </a>
          <a href="/tools" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Financial Tools</h3>
            <p className="text-gray-600">Calculators, planners, and analysis tools</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
