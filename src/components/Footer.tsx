import React from 'react';
import Link from 'next/link';
import { Mail, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="bg-[#f4faf7] dark:bg-[#0A192F] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              {/* THE FIX: Using AppLogo so it matches the Navbar's night mode brightness */}
              <AppLogo className="w-10 h-10 drop-shadow-sm" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">CSID</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
              Center for Sustainability & Inclusive Development — structured, research-backed climate education for learners and professionals worldwide.
            </p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:contact@csid.education" className="hover:text-primary dark:hover:text-emerald-400 transition-colors">contact@csid.education</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/courses" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-emerald-400 transition-colors">Courses</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} CSID. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
            <Link href="#" className="hover:text-primary dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary dark:hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
