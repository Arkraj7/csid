'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/contact" />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              <MessageCircle size={12} />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to collaborate? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Reach Out to Us</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: '[Your Email from Resume]', href: 'mailto:contact@csid.education' },
                  { icon: Phone, label: 'Phone', value: '[Your Phone from Resume]', href: 'tel:+91XXXXXXXXXX' },
                  { icon: MapPin, label: 'Address', value: '[Your Address from Resume]', href: '#' },
                ]?.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item?.label}</div>
                      <a href={item?.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {item?.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  For internship applications, please email{' '}
                  <a href="mailto:careers@csid.org" className="text-primary font-medium hover:underline">
                    careers@csid.org
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-5">Send a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e?.preventDefault()}>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
