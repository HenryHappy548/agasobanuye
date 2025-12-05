import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - Rwaflix</title>
        <meta name="description" content="Rwaflix Terms of Service. Read our terms and conditions for using our streaming platform." />
        <link rel="canonical" href="https://rwaflix.store/terms-of-service" />
      </Helmet>
      
      <StreamingHeader searchQuery="" onSearch={() => {}} onPlayVideo={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Rwaflix, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
            <p>
              Rwaflix is a streaming platform that provides access to movies and TV series content. 
              We offer both free and premium content for entertainment purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
            <p>As a user of Rwaflix, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when creating an account</li>
              <li>Keep your account credentials secure and confidential</li>
              <li>Not share your account with others</li>
              <li>Use the service only for personal, non-commercial purposes</li>
              <li>Not attempt to circumvent any security measures</li>
              <li>Not download or redistribute content without authorization</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Content Guidelines</h2>
            <p>
              All content on Rwaflix is provided for entertainment purposes only. We do not claim ownership 
              of third-party content and respect intellectual property rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Prohibited Activities</h2>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use automated systems or bots to access the service</li>
              <li>Attempt to hack or disrupt our servers</li>
              <li>Upload malicious content or spam</li>
              <li>Harass or abuse other users</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p>
              All trademarks, logos, and service marks displayed on Rwaflix are the property of their 
              respective owners. You may not use any intellectual property without proper authorization.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
            <p>
              Rwaflix is provided "as is" without warranties of any kind. We do not guarantee uninterrupted 
              or error-free service and are not responsible for any damages resulting from your use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Rwaflix shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
