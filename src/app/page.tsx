import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/app/components/HeroBanner';
import WhyChooseSection from '@/app/components/WhyChooseSection';
import BadgeTabsSection from '@/app/components/BadgeTabsSection';
import CoursePreviewSection from '@/app/components/CoursePreviewSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import CertificatePreviewSection from '@/app/components/CertificatePreviewSection';
import StatsSection from '@/app/components/StatsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/" />
      <main>
        <HeroBanner />
        
        {/* --- NEW FEATURED COURSE LINK --- */}
        <section className="flex justify-center items-center py-10 bg-green-50 border-y border-green-100 px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
              Featured Course: Climate Finance & Investing
            </h2>
            <p className="text-green-800 mb-6 max-w-2xl mx-auto text-lg">
              Explore our new standalone curriculum covering carbon markets, ESG frameworks, and the future of global climate finance.
            </p>
            <a 
              href="/csid/climate-finance.html" 
              className="inline-block px-8 py-4 text-white bg-green-800 rounded-lg hover:bg-green-700 transition-colors shadow-md font-semibold text-lg"
            >
              Start Course Now
            </a>
          </div>
        </section>
        {/* -------------------------------- */}

        <StatsSection />
        <WhyChooseSection />
        <BadgeTabsSection />
        <CoursePreviewSection />
        <TestimonialsSection />
        <CertificatePreviewSection />
      </main>
      <Footer />
    </div>
  );
}
