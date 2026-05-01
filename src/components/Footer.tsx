import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  support: [
    { label: 'Support', href: '/contact' },
    { label: 'FAQ', href: '#' },
  ],
};

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', icon: InstagramIcon, href: '#', color: 'hover:text-pink-500' },
  { label: 'Facebook', icon: FacebookIcon, href: '#', color: 'hover:text-blue-500' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: '#', color: 'hover:text-blue-600' },
  { label: 'X / Twitter', icon: TwitterIcon, href: '#', color: 'hover:text-sky-400' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={36} />
              <span className="font-bold text-lg text-foreground">CSID</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-sm">
              Center for Sustainability &amp; Inclusive Development — structured, research-backed climate education for learners and professionals worldwide.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <Mail size={13} />
              <span>contact@csid.education</span>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks?.map((s) => (
                <a
                  key={`social-${s?.label}`}
                  href={s?.href}
                  aria-label={s?.label}
                  className={`p-2 rounded-lg bg-muted text-muted-foreground ${s?.color} transition-all duration-150 hover:bg-muted/80 active:scale-95`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Connect with us on social media to stay updated!
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks?.company?.map((link) => (
                <li key={`footer-company-${link?.label}`}>
                  <Link href={link?.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                    {link?.label}
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks?.support?.map((link) => (
                <li key={`footer-support-${link?.label}`}>
                  <Link href={link?.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                    {link?.label}
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 CSID — Center for Sustainability &amp; Inclusive Development. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Empowering action for a sustainable and inclusive future.
          </p>
        </div>
      </div>
    </footer>
  );
}