import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Rwaflix?",
    answer: "Rwaflix is a premium streaming platform offering unlimited access to movies and series. Watch your favorite content anytime, anywhere."
  },
  {
    question: "How do I create an account?",
    answer: "Currently, Rwaflix is in beta phase. You can browse and watch content without creating an account. Registration will be available soon."
  },
  {
    question: "What devices can I use to watch?",
    answer: "Rwaflix works on any device with a modern web browser including computers, smartphones, tablets, and smart TVs."
  },
  {
    question: "Is the content free to watch?",
    answer: "Yes, currently all content on Rwaflix is free to watch during our beta phase. Premium features may be introduced later."
  },
  {
    question: "How often is new content added?",
    answer: "We regularly update our library with new movies and series. Check back frequently for the latest releases."
  },
  {
    question: "Can I download content for offline viewing?",
    answer: "Offline downloads are not currently available but may be added in future updates."
  },
  {
    question: "What video quality is available?",
    answer: "We offer high-definition streaming with quality that adapts to your internet connection for the best viewing experience."
  },
  {
    question: "How do I report a problem with a video?",
    answer: "If you encounter any issues with video playback, please contact us via WhatsApp at +250 791 114 163 or email henryhappyreal@gmail.com"
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handlePlayVideo = (videoId: string) => {
    // FAQ page doesn't have video player functionality
    console.log("Video play requested:", videoId);
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>FAQ - Ibibazo Bikunze Kubazwa | Rwaflix</title>
        <meta name="description" content="Ibibazo bikunze kubazwa kuri Rwaflix. Find answers about streaming, video quality, and how to watch movies agasobanuye." />
        <meta name="keywords" content="rwaflix FAQ, ibibazo, streaming help, agasobanuye help, watch movies help rwanda" />
        <link rel="canonical" href="https://rwaflix.store/faq" />
      </Helmet>
      
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Ibibazo Bikunze Kubazwa - FAQ
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Rwaflix
            </p>
          </div>

          <div className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-accent/50 transition-colors"
                >
                  <h3 className="font-medium text-foreground">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQ.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No FAQ items found matching "{searchQuery}"
              </p>
            </div>
          )}

          <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <h3 className="text-lg font-medium text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Get in touch with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/250791114163"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                WhatsApp Support
              </a>
              <a
                href="mailto:henryhappyreal@gmail.com"
                className="inline-flex items-center justify-center px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;