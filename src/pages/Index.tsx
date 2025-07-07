
import Header from "@/components/Header";
import TierSpecificHero from "@/components/TierSpecificHero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <TierSpecificHero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
