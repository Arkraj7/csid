'use client';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import { Leaf, Droplets, Shield, Hammer, Sun, Moon } from 'lucide-react';

const stats = [
  { value: '2,400+', label: 'Learners enrolled' },
  { value: '9', label: 'Course chapters' },
  { value: '4.9★', label: 'Average rating' },
  { value: '₹49', label: 'Certificate fee' },
];

const pillars = [
  { icon: Leaf, label: 'Mitigation', color: 'text-green-400' },
  { icon: Droplets, label: 'Adaptation', color: 'text-cyan-400' },
  { icon: Shield, label: 'Resilience', color: 'text-indigo-400' },
  { icon: Hammer, label: 'Recovery', color: 'text-amber-400' },
];

export default function AuthPageClient() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [darkMode, setDarkMode] = useState(false);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement?.classList?.toggle('dark', next);
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — brand/illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-gradient-to-br from-primary via-green-700 to-secondary flex-col justify-between p-10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-12">
            <AppLogo size={40} />
            <div>
              <div className="text-white font-bold text-lg leading-tight">CSID</div>
              <div className="text-white/70 text-xs">Center for Sustainability & Inclusive Dev</div>
            </div>
          </Link>

          {/* Main message */}
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Navigate the Climate Economy with Confidence
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-8">
            Structured, research-backed courses built on the Adaptive Thematic Framework™ — the four-pillar model reshaping climate investment.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {pillars?.map((p) => (
              <div key={`auth-pillar-${p?.label}`} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
                <p.icon size={16} className={p?.color} />
                <span className="text-white text-sm font-medium">{p?.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats?.map((s) => (
              <div key={`auth-stat-${s?.label}`} className="bg-white/10 rounded-xl px-3 py-2.5">
                <div className="text-white font-bold text-lg font-tabular">{s?.value}</div>
                <div className="text-white/70 text-xs">{s?.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 rounded-2xl p-4 mt-8">
          <p className="text-white/90 text-sm italic leading-relaxed mb-3">
            &ldquo;The ATF™ course completely changed how I think about climate investment. CSID breaks it down beautifully.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">AK</div>
            <div>
              <div className="text-white text-xs font-semibold">Ananya Krishnamurthy</div>
              <div className="text-white/60 text-xs">ESG Analyst, Mumbai</div>
            </div>
          </div>
        </div>
      </div>
      {/* Right panel — auth form */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <AppLogo size={32} />
            <span className="font-bold text-foreground">CSID</span>
          </Link>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to home
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Tab switcher */}
            <div className="flex bg-muted rounded-xl p-1 mb-7">
              <button
                onClick={() => setTab('signin')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === 'signin' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === 'signup' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            {tab === 'signin' ? (
              <SignInForm onSwitchToSignUp={() => setTab('signup')} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => setTab('signin')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}