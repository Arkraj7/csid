"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Leaf, Droplets, Shield, Hammer, Play } from 'lucide-react';

const pillars = [
  { icon: Leaf, label: 'Mitigation', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
  { icon: Droplets, label: 'Adaptation', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300' },
  { icon: Shield, label: 'Resilience', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { icon: Hammer, label: 'Recovery', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
];

export default function HeroBanner() {
  const containerRef = useRef(null);
  const treeRef = useRef(null);
  const castleRef = useRef(null);
  const mountainsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Using fromTo guarantees the animation starts perfectly every time without glitching
      tl.fromTo(mountainsRef.current, { y: 60 }, { y: 0, duration: 1.5, ease: "power3.out" }, 0)
        .fromTo(castleRef.current, { y: 80 }, { y: 0, duration: 1.5, ease: "power3.out" }, 0.1)
        .fromTo(treeRef.current, { y: 100 }, { y: 0, duration: 1.5, ease: "power3.out" }, 0.2)
        .fromTo(textRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-hero-pattern">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
              <Leaf size={12} />
              Center for Sustainability &amp; Inclusive Development
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-5 text-balance">
              Empowering Action for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Sustainable and Inclusive
              </span>
              {' '}Future.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              CSID delivers structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — empowering learners and professionals to drive meaningful change.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {pillars?.map((p) => (
                <span
                  key={`hero-pillar-${p?.label}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${p?.color}`}
                >
                  <p.icon size={12} />
                  {p?.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20 animate-pulse-green"
              >
                Start Learning Today
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: Dilmays Parallax Animation */}
          <div className="hidden lg:block w-full" ref={containerRef}>
            <div className="relative w-full h-[500px] xl:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-[#a4c5d5] border border-white/10">
              
              {/* SKY */}
              <div className="absolute top-0 left-0 w-full h-full z-10">
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-sky.png" alt="Sky" className="w-full h-full object-cover object-bottom" />
              </div>
              
              {/* MOUNTAINS: Massive Bleed to prevent tearing */}
              <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-20" ref={mountainsRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-moutains.png" alt="Mountains" className="w-full h-full object-cover object-bottom" />
              </div>
              
              {/* CASTLE */}
              <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-30" ref={castleRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-castle.png" alt="Castle" className="w-full h-full object-cover object-bottom" />
              </div>
              
              {/* TREES */}
              <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-40" ref={treeRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-tree.png" alt="Tree" className="w-full h-full object-cover object-bottom scale-105" />
              </div>
              
              {/* Text Overlay (Updated to Climate Course) */}
              <div className="absolute z-50 bottom-0 left-0 w-full px-8 pb-8 pt-24 bg-gradient-to-t from-[#0e192d] via-[#0e192d]/90 to-transparent text-left" ref={textRef}>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">New Release</span>
                <h2 className="text-3xl font-serif leading-tight mb-3 text-white font-medium">Featured Course: Climate Finance &amp; Investing</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Explore our new standalone curriculum covering carbon markets, ESG frameworks, and the future of global climate finance.
                </p>
                <a href="/csid/climate-finance.html" className="inline-block px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg text-sm hover:bg-emerald-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/30">
                  Start Course Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
