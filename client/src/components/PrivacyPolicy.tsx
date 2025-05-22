
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-gray-800 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Last updated: May 22, 2025
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to BrightLore. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              platform or interact with our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Personal Info:</strong> Name, email address when you register</li>
              <li><strong>Uploaded Content:</strong> Exam papers, notes, questions</li>
              <li><strong>Technical Data:</strong> IP address, device type, browser info</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To create and manage your account</li>
              <li>To improve our AI-assisted features</li>
              <li>To send important updates and notifications</li>
              <li>To respond to your questions or feedback</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. AI & Uploaded Data</h2>
            <p>
              When you upload files, we use AI models (e.g., Google Gemini) to help you
              extract answers or explanations. These files are never shared publicly
              unless approved by you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Cookies and Analytics</h2>
            <p>
              We use cookies and third-party analytics tools to understand usage and
              enhance your experience. You may disable cookies in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We may share it only:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>With your explicit consent</li>
              <li>With service providers (e.g., Google Cloud, Firebase)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Security</h2>
            <p>
              We implement industry-standard encryption and access controls to protect
              your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Request access to your data</li>
              <li>Request deletion or correction of your data</li>
              <li>Opt-out of certain data uses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy. Changes will be posted here with an updated
              “Last Updated” date. Continued use implies acceptance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:support@brightlore.com" className="text-blue-600 underline">support@brightlore.com</a>
            </p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm italic">
            By using BrightLore, you agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
