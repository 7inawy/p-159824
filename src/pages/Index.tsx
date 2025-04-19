import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Steps from "@/components/landing/Steps";
import Marketing from "@/components/landing/Marketing";
import Delivery from "@/components/landing/Delivery";
import Payments from "@/components/landing/Payments";
import POS from "@/components/landing/POS";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Steps />
        <Marketing />
        <Delivery />
        <Payments />
        <POS />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
