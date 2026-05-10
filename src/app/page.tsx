import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/app/components/HeroBanner';
import BadgeTabsSection from '@/app/components/BadgeTabsSection';
import CoursePreviewSection from '@/app/components/CoursePreviewSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import CertificatePreviewSection from '@/app/components/CertificatePreviewSection';
import StatsSection from '@/app/components/StatsSection';
import CalculatorBanner from '@/app/components/CalculatorBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/" />
      <main>
        <HeroBanner />
        <StatsSection />

        {/* Recent Uploads Banner */}
        <CoursePreviewSection />

        {/* Calculator Banner Ad */}
        <CalculatorBanner />

        {/* The Built on Frameworks section is completely deleted from here */}

        <BadgeTabsSection />
        <TestimonialsSection />
        <CertificatePreviewSection />
      </main>
      <Footer />
    </div>
  );
}
