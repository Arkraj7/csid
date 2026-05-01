'use client';
import React, { useState } from 'react';
import { Award, X, Download, Lock, CheckCircle } from 'lucide-react';

function CertificateCard({ preview = false }: { preview?: boolean }) {
  return (
    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 ${preview ? 'max-w-2xl mx-auto' : ''}`}>
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-5xl font-bold text-primary/5 rotate-[-25deg] select-none tracking-widest">
          SAMPLE PREVIEW
        </div>
      </div>

      {/* Certificate header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Award size={22} />
          <span className="text-lg font-bold tracking-wide">CSID</span>
        </div>
        <div className="text-xs opacity-80 tracking-widest uppercase">Center for Sustainability and Inclusive Development</div>
      </div>

      {/* Certificate body */}
      <div className="p-6 md:p-8 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">This certifies that</div>
        <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 font-serif italic">
          {preview ? 'Your Name Here' : 'Ananya Krishnamurthy'}
        </div>
        <div className="w-24 h-0.5 bg-primary mx-auto mb-3" />
        <div className="text-xs text-muted-foreground mb-3">has successfully completed</div>
        <div className="text-base font-semibold text-foreground mb-1 max-w-md mx-auto leading-snug">
          Understanding the Climate Economy: The Adaptive Thematic Framework™
        </div>
        <div className="text-xs text-muted-foreground mb-5">Issued by CSID — Center for Sustainability and Inclusive Development</div>

        {/* Meta row */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
          <div>
            <div className="font-semibold text-foreground mb-0.5">Date of Completion</div>
            <div>01 May 2026</div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-0.5">Certificate ID</div>
            <div className="font-tabular">CSID-ATF-2026-00142</div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-0.5">Final Score</div>
            <div>87% (13/15)</div>
          </div>
        </div>

        {/* Signature line */}
        <div className="flex items-end justify-center gap-8">
          <div className="text-center">
            <div className="h-8 border-b border-foreground/30 mb-1 w-28 mx-auto" />
            <div className="text-xs text-muted-foreground">Course Director, CSID</div>
          </div>
          <div className="text-center">
            <Award size={28} className="text-primary mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">CSID Verified</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted/30 px-6 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          Verify at <span className="text-primary font-medium">csid.education/verify</span> using Certificate ID
        </p>
      </div>
    </div>
  );
}

export default function CertificatePreviewSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
              Verified Certificate
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Earn a Certificate That Proves You Know the Climate Economy
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Complete all chapters, pass the 15-question final assessment with ≥70%, and unlock your CSID certificate for just ₹49. Industry-recognised, verifiable, and genuinely earned.
            </p>
            <ul className="space-y-3 mb-7">
              {[
                'Pass the final assessment (≥70%, 15 questions)',
                'Unlock certificate for ₹49 via Razorpay',
                'Download as PDF — shareable on LinkedIn',
                'Verify with unique Certificate ID',
              ].map((point) => (
                <li key={`cert-point-${point.slice(0, 20)}`} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle size={16} className="mt-0.5 text-primary flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-150 active:scale-95"
              >
                <Award size={15} />
                Preview Your Certificate
              </button>
              <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium">
                <Lock size={13} />
                Unlocked after ₹49 payment
              </div>
            </div>
          </div>

          {/* Right: Certificate preview */}
          <div className="relative cursor-pointer" onClick={() => setModalOpen(true)}>
            <CertificateCard />
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Click to preview full certificate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close certificate preview"
            >
              <X size={15} />
            </button>
            <CertificateCard preview />
            <div className="mt-4 text-center">
              <p className="text-xs text-white/70">This is a preview. Complete the course and pay ₹49 to receive your personalised certificate.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}