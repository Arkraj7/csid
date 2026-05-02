import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Zap, BookOpen, Award, Star } from 'lucide-react';

const features = [
  'Unlimited access to all current courses',
  'All future courses included at no extra cost',
  'Downloadable certificates for every course',
  'Priority support from our team',
  'Lifetime validity — pay once, learn forever',
];

export default function GetProPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/payments" />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Zap size={12} />
              Upgrade to Pro
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Unlock Your Full Potential</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get unlimited access to all CSID courses with a single, one-time payment. No subscriptions. No renewals.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Pricing Card */}
              <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-xl shadow-primary/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-1">CSID Pro</h2>
                  <p className="text-sm text-muted-foreground mb-4">Lifetime Validity</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-2xl font-bold text-foreground">₹</span>
                    <span className="text-6xl font-bold text-foreground font-tabular">1999</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">One-time payment · No recurring fees</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {features?.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20">
                  Upgrade Now — ₹1999
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Secure payment · Instant access
                </p>
              </div>

              {/* What you get */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">Why Go Pro?</h3>
                <div className="space-y-4">
                  {[
                    { icon: BookOpen, title: 'All Courses Included', desc: 'Access every course on climate mitigation, adaptation, resilience, and recovery.' },
                    { icon: Award, title: 'Verified Certificates', desc: 'Earn industry-recognised certificates to showcase your expertise.' },
                    { icon: Star, title: 'Future-Proof Access', desc: 'New courses added regularly — all included in your one-time payment.' },
                    { icon: Zap, title: 'Lifetime Validity', desc: 'No expiry date. Learn at your own pace, forever.' },
                  ]?.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground mb-0.5">{item?.title}</div>
                        <div className="text-xs text-muted-foreground">{item?.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
