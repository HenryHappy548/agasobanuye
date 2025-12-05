import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Rwaflix</title>
        <meta name="description" content="Rwaflix Privacy Policy. Learn how we collect, use, and protect your personal information when you use our streaming service." />
        <link rel="canonical" href="https://rwaflix.store/privacy-policy" />
      </Helmet>
      
      <StreamingHeader searchQuery="" onSearch={() => {}} onPlayVideo={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Rwaflix. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address when you create an account or contact us.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
              <li><strong>Cookies:</strong> We use cookies to improve your browsing experience and analyze site traffic.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our streaming service</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates and new content</li>
              <li>Analyze usage patterns to enhance our website</li>
              <li>Display relevant advertisements through third-party ad networks</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. 
              These companies may use cookies and similar technologies to collect information about your visits to this 
              and other websites to provide relevant advertisements.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our 
              site and/or other sites on the Internet. You may opt out of personalized advertising by visiting 
              <a href="https://www.google.com/settings/ads" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of 
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p>Email: henryhappyreal@gmail.com</p>
            <p>WhatsApp: +250 791 114 163</p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
