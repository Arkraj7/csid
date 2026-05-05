'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

// 1. Tell TypeScript that this component is allowed to accept 'currentPath'
interface NavbarProps {
  currentPath?: string;
}

// 2. Pass currentPath into the function
export default function Navbar({ currentPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f4faf7] border-b border-gray-200">
      {/* We use max-w-[1600px] to allow the logo to sit further to the left on wide screens */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO SECTION - Moved Left with Full Form */}
          <Link href="/" className="flex items-center gap-3">
            <AppLogo className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm" />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl md:text-2xl text-[#0d1b2a] leading-none tracking-tight">
                CSID
              </span>
              {/* Full form text - hidden on very small screens to save space */}
              <span className="text-[10px] md:text-[11px] text-gray-600 font-semibold tracking-wide mt-1 hidden sm:block uppercase">
                Center for Sustainability and Inclusive Development
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU - Uses currentPath to highlight the active page */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors ${currentPath === '/' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Home</Link>
            <Link href="/courses" className={`font-medium transition-colors ${currentPath === '/courses' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Courses</Link>
            <Link href="/about" className={`font-medium transition-colors ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>About</Link>
            <Link href="/contact" className={`font-medium transition-colors ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Contact</Link>
          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/sign-up-login" className="text-[#0d1b2a] font-semibold hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href="/sign-up-login" className="bg-primary hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm">
              Sign up
            </Link>
          </div>

          {/* Mobile menu button (hamburger) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full z-50">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
            <Link href="/" className={`block px-3 py-2 font-medium ${currentPath === '/' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Home</Link>
            <Link href="/courses" className={`block px-3 py-2 font-medium ${currentPath === '/courses' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Courses</Link>
            <Link href="/about" className={`block px-3 py-2 font-medium ${currentPath === '/about' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>About</Link>
            <Link href="/contact" className={`block px-3 py-2 font-medium ${currentPath === '/contact' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>Contact</Link>
            <div className="h-px bg-gray-100 my-4"></div>
            <Link href="/sign-up-login" className="block px-3 py-2 text-[#0d1b2a] font-semibold text-center border border-gray-200 rounded-lg">Log in</Link>
            <Link href="/sign-up-login" className="block px-3 py-3 mt-2 text-center bg-primary text-white rounded-lg font-semibold shadow-md">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
