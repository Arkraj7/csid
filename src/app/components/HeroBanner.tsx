'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Leaf, Droplets, Shield, Hammer } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    label: 'Mitigation',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  {
    icon: Droplets,
    label: 'Adaptation',
    color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  },
  {
    icon: Shield,
    label: 'Resilience',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    icon: Hammer,
    label: 'Recovery',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
];

const Typewriter = ({
  text,
  delay = 0,
  speed = 30,
  repeatDelay = 5000,
}: {
  text: string;
  delay?: number;
  speed?: number;
  repeatDelay?: number;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    let typeInterval: NodeJS.Timeout;
    let repeatTimeout: NodeJS.Timeout;

    setCurrentText('');

    const startDelay = setTimeout(() => {
      let currentIndex = 0;

      typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setCurrentText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          repeatTimeout = setTimeout(() => {
            setKey((k) => k + 1);
          }, repeatDelay);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (typeInterval) clearInterval(typeInterval);
      if (repeatTimeout) clearTimeout(repeatTimeout);
    };
  }, [text, delay, speed, repeatDelay, key]);

  return <span>{currentText}</span>;
};

const AnimatedSkyBanner = () => {
  return (
    <div className="w-full max-w-md h-[60px] md:h-[80px] mb-6 relative overflow-hidden rounded-2xl bg-white/20 dark:bg-slate-900/20 backdrop-blur-md shadow-sm flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 90"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sun (Light Mode) */}
        <g className="dark:hidden">
          <circle cx="450" cy="45" r="22" fill="#FFEB3B" filter="url(#glow)">
            <animate attributeName="r" values="22;24;22" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="45" r="16" fill="#FFC107">
            <animate attributeName="r" values="16;17;16" dur="2s" repeatCount="indefinite" />
          </circle>
          <g opacity="0.6">
            <path d="M450 15 L450 5" stroke="#FF9800" strokeWidth="3" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M450 75 L450 85" stroke="#FF9800" strokeWidth="3" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M415 45 L405 45" stroke="#FF9800" strokeWidth="3" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M485 45 L495 45" stroke="#FF9800" strokeWidth="3" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M425 25 L417 17" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M475 65 L483 73" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            {/* Added 2 missing rays */}
            <path d="M475 25 L483 17" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M425 65 L417 73" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 1,0; 0,0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </g>

        {/* Moon (Dark Mode) */}
        <g className="hidden dark:block">
          <circle cx="450" cy="45" r="22" fill="#F0F0F0" filter="url(#glow)">
            <animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="445" cy="40" r="18" fill="#E0E0E0" />
          <circle cx="440" cy="45" r="16" fill="#D0D0D0" />
          <circle cx="450" cy="50" r="15" fill="#C0C0C0" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 1,0; 0,0"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </g>

        {/* Cloud 1 */}
        <g>
          <g filter="url(#softShadow)" className="fill-white dark:fill-slate-700">
            <ellipse cx="180" cy="42" rx="38" ry="15" />
            <ellipse cx="210" cy="36" rx="26" ry="17" />
            <ellipse cx="235" cy="43" rx="22" ry="13" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-300 0; 900 0"
            dur="30s"
            repeatCount="indefinite"
          />
        </g>

        {/* Cloud 2 */}
        <g>
          <g filter="url(#softShadow)" className="fill-white/90 dark:fill-slate-600">
            <ellipse cx="520" cy="55" rx="32" ry="12" />
            <ellipse cx="545" cy="50" rx="22" ry="14" />
            <ellipse cx="565" cy="54" rx="18" ry="11" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-600 0; 900 0"
            dur="40s"
            repeatCount="indefinite"
          />
        </g>

        {/* Cloud 3 */}
        <g>
          <g filter="url(#softShadow)" className="fill-white dark:fill-slate-700">
            <ellipse cx="720" cy="38" rx="35" ry="14" />
            <ellipse cx="750" cy="32" rx="24" ry="16" />
            <ellipse cx="775" cy="39" rx="20" ry="12" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-800 0; 900 0"
            dur="35s"
            repeatCount="indefinite"
          />
        </g>

        {/* Cloud 4 */}
        <g>
          <g filter="url(#softShadow)" className="fill-white/80 dark:fill-slate-600">
            <ellipse cx="80" cy="52" rx="24" ry="10" />
            <ellipse cx="100" cy="48" rx="17" ry="11" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-100 0; 900 0"
            dur="15s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
};

export default function HeroBanner() {
  const containerRef = useRef(null);
  const treeRef = useRef(null);
  const castleRef = useRef(null);
  const mountainsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(mountainsRef.current, { y: 60 }, { y: 0, duration: 1.5, ease: 'power3.out' }, 0)
        .fromTo(castleRef.current, { y: 80 }, { y: 0, duration: 1.5, ease: 'power3.out' }, 0.1)
        .fromTo(treeRef.current, { y: 100 }, { y: 0, duration: 1.5, ease: 'power3.out' }, 0.2)
        .fromTo(
          textRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' },
          0.5
        );
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
            {/* Newly added animated sky banner component */}
            <AnimatedSkyBanner />

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5 text-balance text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">
              Empowering Action for a Sustainable and Inclusive Future.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl min-h-[90px] md:min-h-[80px]">
              <Typewriter
                text="CSID delivers structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — empowering learners and professionals to drive meaningful change."
                delay={500}
                speed={25}
                repeatDelay={5000}
              />
              <span className="animate-pulse ml-[1px] font-bold">|</span>
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
                <Image
                  src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-sky.png"
                  alt="Sky"
                  className="w-full h-full object-cover object-bottom"
                  fill
                  unoptimized
                />
              </div>

              {/* MOUNTAINS */}
              <div
                className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-20"
                ref={mountainsRef}
              >
                <Image
                  src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-moutains.png"
                  alt="Mountains"
                  className="w-full h-full object-cover object-bottom"
                  fill
                  unoptimized
                />
              </div>

              {/* CASTLE */}
              <div
                className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-30"
                ref={castleRef}
              >
                <Image
                  src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-castle.png"
                  alt="Castle"
                  className="w-full h-full object-cover object-bottom"
                  fill
                  unoptimized
                />
              </div>

              {/* TREES */}
              <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[130%] z-40" ref={treeRef}>
                <Image
                  src="https://cdn.zajno.com/dev/codepen/story-dilmays/parallax-tree.png"
                  alt="Tree"
                  className="w-full h-full object-cover object-bottom scale-105"
                  fill
                  unoptimized
                />
              </div>

              {/* Text Overlay */}
              <div
                className="absolute z-50 bottom-0 left-0 w-full px-8 pb-8 pt-24 bg-gradient-to-t from-[#0e192d] via-[#0e192d]/90 to-transparent text-left"
                ref={textRef}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                  Climate Challenge
                </span>
                <h2 className="text-3xl font-serif leading-tight mb-3 text-white font-medium">
                  Put your climate awareness to the test and see how high you can climb!
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Challenge yourself with our interactive climate quiz and discover where you stand
                  on environmental knowledge.
                </p>
                <Link
                  href="/climate-awareness"
                  className="inline-block px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg text-sm hover:bg-emerald-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/30"
                >
                  Test Your Climate Awareness
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
