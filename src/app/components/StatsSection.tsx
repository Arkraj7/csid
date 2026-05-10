import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

export default function StatsSection() {
  return (
    <section style={{ background: '#FDF8E3' }}>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-emerald-800 text-xl font-bold">CSID Green Calculator Toolkit</h3>
            <p className="text-amber-800 text-sm">Measure your environmental impact in minutes</p>
          </div>
          <Link
            href="/Leaf-and-Ledger/calculator.html"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse hover:scale-105 transition-all"
            style={{
              background: 'linear-gradient(135deg, #059669, #10b981)',
              boxShadow:
                '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.2)',
            }}
          >
            <Calculator size={20} />
            Try our Green Calculator Toolkit
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
