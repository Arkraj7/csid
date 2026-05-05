import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-[#0A192F] overflow-hidden min-h-[85vh] flex items-center border-b border-gray-800">
      {/* Background Gradients & Glow Effects (Night Mode) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-900/20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      {/* Dotted Grid Pattern for tech/finance feel */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-100 tracking-wide uppercase">New Climate Finance Frameworks</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Master the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Climate Economy
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join thousands of professionals building real-world expertise in climate finance, ESG, adaptation, and sustainable development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/courses" className="w-full sm:w-auto bg-primary hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
              Explore Courses
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <Link href="/about" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-all backdrop-blur-sm">
              Learn More
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-4 opacity-80">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-gray-600"></div>
              <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-gray-500"></div>
              <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-gray-400"></div>
            </div>
            <div className="text-left text-sm">
              <p className="text-white font-semibold">Trusted by 500+ leaders</p>
              <p className="text-slate-400">from global institutions</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
