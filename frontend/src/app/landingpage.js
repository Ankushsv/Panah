import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero";
import Challenges from "@/components/Challenges";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Challenges />
        <Features />
        <HowItWorks />
        <Stats />
        <CTA />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
