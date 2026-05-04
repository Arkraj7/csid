"use client"; // Required for GSAP and useEffect in Next.js

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
  const treeRef = useRef(null);
  const castleRef = useRef(null);
  const mountainsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 1. Initial Setup: Push elements down
    gsap.set(treeRef.current, { y: 100 });
    gsap.set(castleRef.current, { y: 150 });
    gsap.set(mountainsRef.current, { y: 200 });
    gsap.set(textRef.current, { y: 30, autoAlpha: 0 });

    // 2. The Free GSAP Entrance Animation Timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(mountainsRef.current, { y: 0, duration: 1.5, ease: "power3.out" }, 0)
      .to(castleRef.current, { y: 0, duration: 1.5, ease: "power3.out" }, 0.2)
      .to(treeRef.current, { y: 0, duration: 1.5, ease: "power3.out" }, 0.4)
      .to(textRef.current, { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, 0.8);

  }, []);

  return (
    <section className="relative overflow-hidden bg-hero-pattern">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Your CSID Text */}
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
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all duration-150 active:scale-95">
                <Play size={14} className="text-primary" />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                500+ active learners
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                150+ research modules
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                ₹49 certificate
              </span>
            </div>
          </div>

          {/* Right: Dilmays Parallax Animation */}
          <div className="hidden lg:block w-full">
            <div className="dilmays-container">
              {/* Parallax Image Layers */}
              <div className="parallax-item parallax-sky">
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-sky.png" alt="Sky" />
              </div>
              <div className="parallax-item parallax-mountains" ref={mountainsRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-moutains.png" alt="Mountains" />
              </div>
              <div className="parallax-item parallax-castle" ref={castleRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-castle.png" alt="Castle" />
              </div>
              <div className="parallax-item parallax-tree" ref={treeRef}>
                <img src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-tree.png" alt="Tree" />
              </div>
              
              {/* Text Overlay */}
              <div className="dilmays-overlay" ref={textRef}>
                <div className="dilmays-subtitle">The Good Knight</div>
                <div className="dilmays-title">The Story of the Dilmays Kingdom</div>
                <div className="dilmays-desc">
                  King Olav is old and has only his kingdom. His daughter was kidnapped 
                  by the dragon Liuf. He has declared five trials: strength, honesty, generosity, courage, and sympathy.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
