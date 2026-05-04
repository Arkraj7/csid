"use client";

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

// 1. This interface fixes the TypeScript build error!
interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath = '/' }: NavbarProps) {
  // Define your navigation links here
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <AppLogo className="w-12 h-12 drop-shadow-sm" />
            <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block">
              CSID
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  currentPath === link.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/sign-up-login" 
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-foreground hover:bg-muted rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/sign-up-login" 
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md active:scale-95"
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
