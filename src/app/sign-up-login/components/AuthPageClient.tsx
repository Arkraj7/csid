'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthPageClient() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* LEFT SIDE - Hidden on small screens */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-[#0A192F] relative overflow-hidden flex-col justify-between p-12">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

        {/* Overlay Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <AppLogo className="w-10 h-10 drop-shadow-md" />
            <div>
              <div className="text-white font-bold text-lg leading-tight tracking-tight">CSID</div>
              <div className="text-white/60 text-xs tracking-wide uppercase">
                Center for Sustainability
              </div>
            </div>
          </Link>

          <div className="mt-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Master the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Climate Economy
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-md leading-relaxed mb-8">
              Join thousands of professionals building real-world expertise in climate finance, ESG,
              and sustainable development.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                  AK
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                  RV
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-amber-500 flex items-center justify-center text-xs font-bold text-white">
                  PM
                </div>
              </div>
              <p className="text-sm font-medium text-slate-300">Join 500+ active learners</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} CSID. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE - Form Container */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 sm:p-12 min-h-screen relative">
        {/* Mobile Header / Back Button */}
        <div className="absolute top-6 left-6 md:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-10">
            <AppLogo className="w-10 h-10" />
            <div className="text-left">
              <div className="text-foreground font-bold text-lg leading-tight tracking-tight">
                CSID
              </div>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? 'Enter your details to access your courses.'
                : 'Start your journey in climate finance today.'}
            </p>
          </div>

          {/* Render the appropriate form WITH PROPS */}
          {isLogin ? (
            <SignInForm onSwitchToSignUp={toggleAuthMode} />
          ) : (
            <SignUpForm onSwitchToSignIn={toggleAuthMode} />
          )}

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="font-semibold text-primary hover:underline focus:outline-none"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="font-semibold text-primary hover:underline focus:outline-none"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
