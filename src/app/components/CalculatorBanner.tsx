'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CalculatorBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-[#0A1A14] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 transition-colors duration-300 border border-emerald-900/30">
        {/* Decorative Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-96 h-96 bg-emerald-600 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-72 h-72 bg-emerald-400 opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Left Side: Text Content */}
        <div className="relative z-10 md:w-1/2 mb-10 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Banner Ad
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            CSID Green Calculator Toolkit
          </h2>

          <p className="text-emerald-50/70 text-lg leading-relaxed max-w-lg mb-8">
            Measure carbon, energy, water, and waste for your home, offices, park spaces, and
            personal use. 36 detailed metrics, intuitive sliders, and downloadable PDF reports — get
            your sustainability score in minutes.
          </p>

          {/* Link directly to the calculator page */}
          <Link
            href="/csid/Leaf-and-Ledger/calculator.html"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0A1A14] px-7 py-3.5 rounded-xl font-bold hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-lg group"
          >
            Calculate Your Impact
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/assets/images/calculator-illustration.png"
            alt="CSID Green Calculator"
            className="w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}
