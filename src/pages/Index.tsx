
import Header from "@/components/Header";
import TierSpecificHero from "@/components/TierSpecificHero";
import Features from "@/components/Features";
import FreemiumLanding from "@/components/FreemiumLanding";
import Footer from "@/components/Footer";
import { useSubscription } from "@/hooks/useSubscription";

const Index = () => {
  const { subscription, loading } = useSubscription();
  const userTier = subscription?.planName?.toLowerCase() || "freemium";

  // Show dedicated Freemium landing page for freemium users
  if (userTier === "freemium") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <FreemiumLanding />
        </main>
        <Footer />
      </div>
    );
  }

  // Show regular tier-specific hero for Basic/Pro users
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
