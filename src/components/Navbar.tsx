'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, Menu, X, LogOut, UserCircle } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
// Import Firebase Auth
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // New state to hold the logged-in user
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);

    // Dark mode logic
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Firebase Auth Listener: Triggers instantly when user logs in or out
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false); // close mobile menu if open
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#e8f1fa]/90 dark:bg-[#0A192F]/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3">
            <AppLogo className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm" />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl md:text-2xl text-[#1e3a5f] dark:text-white leading-none tracking-tight transition-colors">
                CSID
              </span>
              <span className="text-[10px] md:text-[11px] text-gray-600 dark:text-gray-400 font-semibold tracking-wide mt-1 hidden sm:block uppercase transition-colors">
                Center for Sustainability and Inclusive Development
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${currentPath === '/' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`font-medium transition-colors ${currentPath?.startsWith('/courses') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
            >
              Contact
            </Link>
            <Link
              href="/green-calculator"
              className={`font-medium transition-colors ${currentPath === '/green-calculator' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
            >
              Calculator
            </Link>
            {user && (
              <Link
                href="/progress"
                className={`font-medium transition-colors ${currentPath === '/progress' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
              >
                My Progress
              </Link>
            )}
          </div>

          {/* RIGHT SIDE ACTIONS: Dark Mode + Auth/Profile */}
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

            {/* CONDITIONAL AUTH: Show Profile if logged in, otherwise show Log In buttons */}
            {user ? (
              <div className="flex items-center gap-5 border-l border-gray-300 dark:border-gray-700 pl-6">
                <div className="flex items-center gap-2 cursor-pointer">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full border-2 border-primary"
                      unoptimized
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                      {user.displayName?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase() || <UserCircle />}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-white leading-tight">
                      {user.displayName || 'Learner'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  href="/sign-up-login"
                  className="text-[#0d1b2a] dark:text-white font-semibold hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up-login"
                  className="bg-primary hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE CONTROLS (Hamburger + Dark Mode) */}
          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button onClick={toggleDarkMode} className="p-2 text-gray-600 dark:text-gray-300">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0A192F]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 shadow-lg absolute w-full z-50">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
            {/* Mobile User Profile Header */}
            {user && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-2 border border-gray-100 dark:border-gray-800">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {user.displayName || 'Learner'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                </div>
              </div>
            )}

            <Link
              href="/"
              className={`block px-3 py-2 font-medium ${currentPath === '/' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block px-3 py-2 font-medium ${currentPath?.startsWith('/courses') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 font-medium ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 font-medium ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
            >
              Contact
            </Link>
            <Link
              href="/green-calculator"
              className={`block px-3 py-2 font-medium ${currentPath === '/green-calculator' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
            >
              Calculator
            </Link>

            {user && (
              <Link
                href="/progress"
                className={`block px-3 py-2 font-medium ${currentPath === '/progress' ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
              >
                My Progress
              </Link>
            )}

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-4"></div>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-3 py-3 mt-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-up-login"
                  className="block px-3 py-2 text-[#0d1b2a] dark:text-white font-semibold text-center border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up-login"
                  className="block px-3 py-3 mt-2 text-center bg-primary text-white rounded-lg font-semibold shadow-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
