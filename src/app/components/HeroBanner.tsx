'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Leaf, Droplets, Shield, Hammer } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    label: 'Mitigation',
    color:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700',
  },
  {
    icon: Droplets,
    label: 'Adaptation',
    color:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
  },
  {
    icon: Shield,
    label: 'Resilience',
    color:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-700',
  },
  {
    icon: Hammer,
    label: 'Recovery',
    color:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
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
      if (repeatTimeout) clearInterval(repeatTimeout);
    };
  }, [text, delay, speed, repeatDelay, key]);

  return <span>{currentText}</span>;
};

// Cloud component that drifts completely across the screen
const DriftingCloud = ({
  top,
  width,
  height,
  duration,
  delay,
  color,
  secondaryColor,
}: {
  top: string;
  width: number;
  height: number;
  duration: number;
  delay: number;
  color: string;
  secondaryColor: string;
}) => {
  return (
    <svg
      className="absolute"
      style={{
        top,
        left: '-300px',
        width: `${width}px`,
        height: `${height}px`,
        animation: `cloudDrift ${duration}s linear infinite`,
        animationDelay: `-${delay}s`,
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g filter="url(#cloudShadow)">
        <ellipse
          cx={width * 0.5}
          cy={height * 0.6}
          rx={width * 0.4}
          ry={height * 0.35}
          fill={color}
        />
        <ellipse
          cx={width * 0.3}
          cy={height * 0.4}
          rx={width * 0.25}
          ry={height * 0.4}
          fill={color}
        />
        <ellipse
          cx={width * 0.7}
          cy={height * 0.35}
          rx={width * 0.22}
          ry={height * 0.35}
          fill={color}
        />
        <ellipse
          cx={width * 0.5}
          cy={height * 0.3}
          rx={width * 0.2}
          ry={height * 0.3}
          fill={secondaryColor}
        />
      </g>
    </svg>
  );
};

// Animated Day/Night Scene Component
const DayNightScene = ({ isNight }: { isNight: boolean }) => {
  return (
    <div
      className={`relative w-full h-[500px] xl:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-1000 ${
        isNight ? 'bg-[#0a1628]' : 'bg-gradient-to-b from-[#4fa4c7] via-[#87ceeb] to-[#b8d4e3]'
      }`}
    >
      {/* Day Sky Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(180deg, #1e6091 0%, #4fa4c7 40%, #87ceeb 70%, #b8d4e3 100%)',
        }}
      />

      {/* Night Sky Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #1a2a4a 30%, #2a3a5a 60%, #1a2a4a 100%)',
        }}
      />

      {/* SVG Defs for filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Stars */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {[...Array(60)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 55}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div
        className={`absolute transition-all duration-1000 ${
          isNight ? 'translate-y-[300px] opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ left: '15%', top: '10%' }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Sun rays */}
          <g className="animate-sunRays origin-center">
            {[...Array(12)].map((_, i) => {
              const angle = i * 30 * (Math.PI / 180);
              const x1 = 60 + 55 * Math.cos(angle);
              const y1 = 60 + 55 * Math.sin(angle);
              const x2 = 60 + 65 * Math.cos(angle);
              const y2 = 60 + 65 * Math.sin(angle);
              return (
                <line
                  key={`ray-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FFD700"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
          </g>
          {/* Sun core */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="#FFD93D"
            filter="url(#sunGlow)"
            className="animate-pulse-slow"
          />
          <circle cx="60" cy="60" r="35" fill="#FFF176" />
        </svg>
      </div>

      {/* Crescent Moon */}
      <div
        className={`absolute transition-all duration-1000 ${
          isNight ? 'translate-y-0 opacity-100' : '-translate-y-[300px] opacity-0'
        }`}
        style={{ right: '12%', top: '8%' }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="40" cy="40" r="35" fill="#E8E8E8" filter="url(#moonGlow)" opacity="0.3" />
          <circle cx="40" cy="40" r="30" fill="#F5F5DC" />
          <circle cx="55" cy="35" r="25" fill={isNight ? '#1a2a4a' : '#1a2a4a'} />
          <circle cx="25" cy="45" r="4" fill="#D4D4AA" opacity="0.5" />
          <circle cx="30" cy="30" r="3" fill="#D4D4AA" opacity="0.4" />
          <circle cx="35" cy="50" r="2" fill="#D4D4AA" opacity="0.3" />
        </svg>
      </div>

      {/* Day Clouds */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 overflow-hidden ${
          isNight ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <DriftingCloud
          top="5%"
          width={250}
          height={100}
          duration={40}
          delay={0}
          color="white"
          secondaryColor="rgba(255,255,255,0.9)"
        />
        <DriftingCloud
          top="18%"
          width={200}
          height={80}
          duration={50}
          delay={15}
          color="white"
          secondaryColor="rgba(255,255,255,0.9)"
        />
        <DriftingCloud
          top="8%"
          width={180}
          height={70}
          duration={35}
          delay={25}
          color="white"
          secondaryColor="rgba(255,255,255,0.9)"
        />
        <DriftingCloud
          top="25%"
          width={150}
          height={60}
          duration={45}
          delay={30}
          color="rgba(255,255,255,0.9)"
          secondaryColor="rgba(255,255,255,0.8)"
        />
      </div>

      {/* Night Clouds (edge-lit) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 overflow-hidden ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <DriftingCloud
          top="5%"
          width={250}
          height={100}
          duration={40}
          delay={0}
          color="#4a5568"
          secondaryColor="#718096"
        />
        <DriftingCloud
          top="18%"
          width={200}
          height={80}
          duration={50}
          delay={15}
          color="#374151"
          secondaryColor="#4b5563"
        />
        <DriftingCloud
          top="8%"
          width={180}
          height={70}
          duration={35}
          delay={25}
          color="#4a5568"
          secondaryColor="#6b7280"
        />
        <DriftingCloud
          top="25%"
          width={150}
          height={60}
          duration={45}
          delay={30}
          color="#374151"
          secondaryColor="#4b5563"
        />
      </div>

      {/* Mountains */}
      <div className="absolute bottom-[25%] left-0 right-0">
        <svg width="100%" height="200" viewBox="0 0 800 200" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#2d3748' : '#6b8e6b'} />
              <stop offset="100%" stopColor={isNight ? '#1a202c' : '#4a5d4a'} />
            </linearGradient>
            <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#4a5568' : '#8fbc8f'} />
              <stop offset="100%" stopColor={isNight ? '#2d3748' : '#6b8e6b'} />
            </linearGradient>
          </defs>
          <polygon
            points="0,200 150,80 300,150 450,60 600,140 750,50 800,120 800,200"
            fill="url(#mountainGradient2)"
            className="transition-all duration-1000"
          />
          <polygon
            points="0,200 100,120 250,170 400,100 550,160 700,90 800,150 800,200"
            fill="url(#mountainGradient)"
            className="transition-all duration-1000"
          />
          <polygon
            points="450,60 430,85 470,85"
            fill={isNight ? '#4a5568' : '#e8e8e8'}
            className="transition-all duration-1000"
          />
          <polygon
            points="750,50 730,75 770,75"
            fill={isNight ? '#4a5568' : '#e8e8e8'}
            className="transition-all duration-1000"
          />
        </svg>
      </div>

      {/* Trees */}
      <div
        className={`absolute bottom-[10%] left-[12%] transition-all duration-1000 ${
          isNight ? 'translate-x-[50px]' : 'translate-x-0'
        }`}
      >
        <svg width="200" height="300" viewBox="0 0 200 300">
          <rect
            x="90"
            y="150"
            width="20"
            height="150"
            fill={isNight ? '#3d2914' : '#5d4037'}
            rx="2"
          />
          <path
            d="M100 200 Q60 180 30 190"
            stroke={isNight ? '#3d2914' : '#5d4037'}
            strokeWidth="8"
            fill="none"
            className="animate-treeSway"
            style={{ transformOrigin: '100px 200px' }}
          />
          <path
            d="M100 180 Q140 160 170 175"
            stroke={isNight ? '#3d2914' : '#5d4037'}
            strokeWidth="6"
            fill="none"
            className="animate-treeSwayReverse"
            style={{ transformOrigin: '100px 180px' }}
          />
          <g className="animate-foliageSway" style={{ transformOrigin: '100px 120px' }}>
            <ellipse cx="100" cy="100" rx="80" ry="70" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="70" cy="120" rx="50" ry="45" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="130" cy="115" rx="55" ry="50" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="100" cy="80" rx="45" ry="40" fill={isNight ? '#2d5a2d' : '#32cd32'} />
            <ellipse cx="60" cy="100" rx="35" ry="30" fill={isNight ? '#2d5a2d' : '#32cd32'} />
            <ellipse cx="140" cy="95" rx="40" ry="35" fill={isNight ? '#2d5a2d' : '#32cd32'} />
          </g>
        </svg>
      </div>

      <div
        className={`absolute bottom-[8%] right-[18%] transition-all duration-1000 ${
          isNight ? '-translate-x-[30px]' : 'translate-x-0'
        }`}
      >
        <svg width="150" height="250" viewBox="0 0 150 250">
          <rect
            x="65"
            y="130"
            width="20"
            height="120"
            fill={isNight ? '#3d2914' : '#5d4037'}
            rx="2"
          />
          <g
            className="animate-foliageSway"
            style={{ transformOrigin: '75px 100px', animationDelay: '0.5s' }}
          >
            <ellipse cx="75" cy="80" rx="65" ry="60" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="50" cy="95" rx="40" ry="35" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="100" cy="90" rx="45" ry="40" fill={isNight ? '#1a3a1a' : '#228b22'} />
            <ellipse cx="75" cy="60" rx="35" ry="30" fill={isNight ? '#2d5a2d' : '#32cd32'} />
          </g>
        </svg>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[12%]">
        <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#1a202c' : '#7cb342'} />
              <stop offset="100%" stopColor={isNight ? '#0f151f' : '#558b2f'} />
            </linearGradient>
          </defs>
          <ellipse cx="400" cy="100" rx="500" ry="80" fill="url(#groundGradient)" />
        </svg>
      </div>

      {/* Horizon glow */}
      <div
        className={`absolute bottom-[10%] left-0 right-0 h-[30%] transition-opacity duration-1000 ${
          isNight ? 'opacity-0' : 'opacity-60'
        }`}
        style={{
          background: 'linear-gradient(0deg, rgba(255,165,0,0.3) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default function HeroBanner() {
  const containerRef = useRef(null);
  const [isNight, setIsNight] = useState(false);

  // Sync with system/site dark mode on mount and when it changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsNight(isDark);
    };

    // Check initial dark mode
    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/csid/assets/images/hero-bg.png"
          alt="CSID Hero"
          className="w-full h-full object-cover object-center"
        />
        {/* Mobile overlay to hide girl and bird */}
        <div className="absolute inset-0 bg-white/90 dark:bg-[#0a1628]/90 pointer-events-none md:hidden" />
        {/* Dark overlay for night mode */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isNight ? 'opacity-90 bg-[#0a1628]' : 'opacity-0'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 pt-20 pb-16 md:pt-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5 text-balance text-gray-900 dark:text-white drop-shadow-sm">
              Empowering Action for a{' '}
              <span className="text-primary dark:text-emerald-400">
                Sustainable and Inclusive Future.
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-6 max-w-xl min-h-[90px] md:min-h-[80px] text-gray-700 dark:text-gray-200 drop-shadow-sm">
              <Typewriter
                text="CSID delivers structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — empowering learners and professionals to drive meaningful change."
                delay={500}
                speed={25}
                repeatDelay={5000}
              />
              <span className="animate-pulse ml-[1px] font-bold text-gray-900 dark:text-white">
                |
              </span>
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
              <button
                onClick={() => setIsNight(!isNight)}
                className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
                aria-label="Toggle day/night mode"
              >
                {isNight ? (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="currentColor">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600" fill="currentColor">
                    <path d="M12 3c.132 0 .263.002.394.007.18-.018.365-.028.55-.028 5.523 0 10 4.477 10 10s-4.477 10-10 10c-.185 0-.37-.01-.55-.028.132.005.263.007.394.007 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="hidden lg:block w-full" ref={containerRef}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <DayNightScene isNight={isNight} />
              <div className="absolute bottom-0 left-0 w-full px-8 pb-8 pt-24 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-left">
                <span
                  className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                    isNight ? 'text-indigo-300' : 'text-emerald-400'
                  }`}
                >
                  {isNight ? 'Night Mode' : 'Day Mode'}
                </span>
                <h2 className="text-3xl font-serif leading-tight mb-3 text-white font-medium">
                  Put your climate awareness to the test!
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Challenge yourself with our interactive climate quiz.
                </p>
                <Link
                  href="/climate-awareness"
                  className={`inline-block px-6 py-2.5 font-semibold rounded-lg text-sm hover:scale-105 transition-all duration-200 shadow-lg ${
                    isNight
                      ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-indigo-500/30'
                      : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/30'
                  }`}
                >
                  Test Your Climate Awareness
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes sunRays {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-sunRays {
          animation: sunRays 60s linear infinite;
        }
        @keyframes cloudDrift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 600px));
          }
        }
        .animate-treeSway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(2deg);
          }
          75% {
            transform: rotate(-2deg);
          }
        }
        .animate-treeSway {
          animation: treeSway 4s ease-in-out infinite;
        }
        @keyframes treeSwayReverse {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-2deg);
          }
          75% {
            transform: rotate(2deg);
          }
        }
        .animate-treeSwayReverse {
          animation: treeSwayReverse 4s ease-in-out infinite;
        }
        @keyframes foliageSway {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(2px) rotate(1deg);
          }
          75% {
            transform: translateX(-2px) rotate(-1deg);
          }
        }
        .animate-foliageSway {
          animation: foliageSway 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
