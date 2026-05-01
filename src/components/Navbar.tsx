'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Sun, Moon, Globe, ChevronDown, Menu, X, User, Settings, LogIn, BookOpen, TrendingUp, Award, Briefcase } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
}

const navLinks = [
  { label: 'Courses', labelHi: 'पाठ्यक्रम', href: '/courses', icon: BookOpen },
  { label: 'Careers', labelHi: 'करियर', href: '/careers', icon: Briefcase },
  { label: 'My Progress', labelHi: 'मेरी प्रगति', href: '/progress', icon: TrendingUp },
  { label: 'Get Pro', labelHi: 'प्रो पाएं', href: '/payments', icon: Award },
];

export default function Navbar({ currentPath = '/' }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('csid-theme');
    if (stored === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('csid-theme', next ? 'dark' : 'light');
  }

  const t = (en: string, hi: string) => language === 'hi' ? hi : en;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <AppLogo size={36} />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base text-foreground tracking-tight">CSID</span>
              <span className="text-xs text-muted-foreground hidden sm:block leading-none">Sustainability & Inclusive Dev</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={`nav-${link.href}`}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <link.icon size={15} />
                  {language === 'hi' ? link.labelHi : link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 active:scale-95 text-sm font-medium"
                aria-label="Language switcher"
              >
                <Globe size={16} />
                <span className="hidden sm:block">{language === 'en' ? 'EN' : 'HI'}</span>
                <ChevronDown size={13} className={`transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-xl shadow-lg py-1 animate-fade-in">
                  {[
                    { code: 'en' as const, label: 'English', native: 'English' },
                    { code: 'hi' as const, label: 'Hindi', native: 'हिन्दी' },
                  ].map((lang) => (
                    <button
                      key={`lang-${lang.code}`}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang.code ? 'text-primary font-semibold bg-primary/5' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:bg-muted transition-all duration-150 active:scale-95"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground hidden lg:block">
                  {isLoggedIn ? 'Priya S.' : t('My Profile', 'मेरी प्रोफ़ाइल')}
                </span>
                <ChevronDown size={13} className={`text-muted-foreground transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-lg py-1 animate-fade-in">
                  <Link href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                    <User size={15} className="text-muted-foreground" />
                    {t('My Account', 'मेरा खाता')}
                  </Link>
                  <Link href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                    <Settings size={15} className="text-muted-foreground" />
                    {t('Settings', 'सेटिंग्स')}
                  </Link>
                  <div className="border-t border-border my-1" />
                  <Link
                    href="/sign-up-login"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <LogIn size={15} className="text-primary" />
                    {t('Sign In', 'साइन इन')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-150 active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={`mobile-nav-${link.href}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <link.icon size={16} />
                  {language === 'hi' ? link.labelHi : link.label}
                </Link>
              );
            })}
            <div className="border-t border-border pt-2 mt-2">
              <Link
                href="/sign-up-login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                <LogIn size={16} />
                {t('Sign In / Sign Up', 'साइन इन / साइन अप')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}