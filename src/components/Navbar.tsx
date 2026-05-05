'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle Dark Mode Initialization and Hydration
  useEffect(() => {
    setMounted(true);
    // Check if user previously selected dark mode or if their operating system is in dark mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f4faf7]/80 dark:bg-[#0A192F]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* 
        1. fixed top-0 w-full z-50: Makes it stay at the top when scrolling 
        2. /80 and backdrop-blur-md: Creates the semi-transparent glass effect
      */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3">
            <AppLogo className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm" />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl md:text-2xl text-[#0d1b2a] dark:text-white leading-none tracking-tight transition-colors">
                CSID
              </span>
              <span className="text-[10px] md:text-[11px] text-gray-600 dark:text-gray-400 font-semibold tracking-wide mt-1 hidden sm:block uppercase transition-colors">
                Center for Sustainability and Inclusive Development
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors ${currentPath === '/' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}>Home</Link>
            <Link href="/courses" className={`font-medium transition-colors ${currentPath === '/courses' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}>Courses</Link>
            <Link href="/about" className={`font-medium transition-colors ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}>About</Link>
            <Link href="/contact" className={`font-medium transition-colors ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}>Contact</Link>
          </div>

          {/* RIGHT SIDE ACTIONS: Dark Mode + Auth */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Dark Mode Toggle */}
            {mounted && (
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            <Link href="/sign-up-login" className="text-[#0d1b2a] dark:text-white font-semibold hover:text-primary dark:hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href="/sign-up-login" className="bg-primary hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm">
              Sign up
            </Link>
          </div>

          {/* MOBILE CONTROLS (Hamburger + Dark Mode) */}
          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button onClick={toggleDarkMode} className="p-2 text-gray-600 dark:text-gray-300">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0A192F]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 shadow-lg absolute w-full z-50">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
            <Link href="/" className={`block px-3 py-2 font-medium ${currentPath === '/' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>Home</Link>
            <Link href="/courses" className={`block px-3 py-2 font-medium ${currentPath === '/courses' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>Courses</Link>
            <Link href="/about" className={`block px-3 py-2 font-medium ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>About</Link>
            <Link href="/contact" className={`block px-3 py-2 font-medium ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>Contact</Link>
            <div className="h-px bg-gray-200 dark:bg-gray-800 my-4"></div>
            <Link href="/sign-up-login" className="block px-3 py-2 text-[#0d1b2a] dark:text-white font-semibold text-center border border-gray-200 dark:border-gray-700 rounded-lg">Log in</Link>
            <Link href="/sign-up-login" className="block px-3 py-3 mt-2 text-center bg-primary text-white rounded-lg font-semibold shadow-md">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
