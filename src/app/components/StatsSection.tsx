import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="bg-emerald-600">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-white text-xl font-bold">🌱 CSID Green Calculator Toolkit</h3>
            <p className="text-emerald-100 text-sm">Measure your environmental impact in minutes</p>
          </div>
          <Link
            href="/csid/Leaf-and-Ledger/calculator.html"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg"
          >
            <Calculator size={20} />
            Try Calculator
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
