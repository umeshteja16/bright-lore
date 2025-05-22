
const Terms = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-gray-800 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Last updated: May 22, 2025
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Eligibility</h2>
            <p>You must be at least 13 years old and agree to these Terms and our Privacy Policy to use the BrightLore platform.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. User Accounts</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>You are responsible for maintaining your account credentials.</li>
              <li>Do not share your account access with others.</li>
              <li>Report any unauthorized use of your account to us immediately.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Uploaded Content</h2>
            <p>
              By uploading content (e.g., exam papers, notes), you grant BrightLore permission to store and display it. You must have the rights to any material you upload.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. AI-Powered Features</h2>
            <p>
              Our site uses AI to help answer questions and extract data from uploaded PDFs. These answers are educational only and not guaranteed to be accurate.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Prohibited Use</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Do not upload harmful or illegal content.</li>
              <li>Do not exploit, abuse, or reverse-engineer the platform.</li>
              <li>Do not harass or impersonate others.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Intellectual Property</h2>
            <p>
              BrightLore’s branding, design, features, and original content are protected. Do not reproduce them without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Changes to Service</h2>
            <p>
              We may modify the Service or these Terms at any time. Major changes will be communicated on the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Limitation of Liability</h2>
            <p>
              We are not liable for damages caused by use or misuse of the Service, or for reliance on AI-generated content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Privacy</h2>
            <p>
              Your data is handled as described in our Privacy Policy. By using our site, you consent to its practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">10. Contact</h2>
            <p>
              Email: <a href="mailto:support@brightlore.com" className="text-blue-600 underline">support@brightlore.com</a>
            </p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm italic">
            By using this site or signing up, you agree to these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
