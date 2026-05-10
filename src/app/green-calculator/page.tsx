'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, ArrowRight, Leaf, Zap, Droplets, Trash2 } from 'lucide-react';

interface CalculatorTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  metricsCount: number;
  color: string;
}

const calculatorTabs: CalculatorTab[] = [
  {
    id: 'green-tab',
    name: 'Green Space & Biodiversity',
    icon: <Leaf className="w-5 h-5" />,
    description: 'Calculate carbon sequestration, biodiversity index, cooling effects, and more.',
    metricsCount: 9,
    color: 'bg-emerald-500',
  },
  {
    id: 'energy-tab',
    name: 'Energy & Built Environment',
    icon: <Zap className="w-5 h-5" />,
    description: 'Track energy consumption, renewable share, GHG emissions, and savings.',
    metricsCount: 9,
    color: 'bg-amber-500',
  },
  {
    id: 'water-tab',
    name: 'Water Use & Management',
    icon: <Droplets className="w-5 h-5" />,
    description: 'Monitor water withdrawal, reuse percentage, and infiltration metrics.',
    metricsCount: 9,
    color: 'bg-blue-500',
  },
  {
    id: 'waste-tab',
    name: 'Waste & Circularity',
    icon: <Trash2 className="w-5 h-5" />,
    description: 'Measure waste generation, recycling rates, and energy potential.',
    metricsCount: 9,
    color: 'bg-orange-500',
  },
];

export default function GreenCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPath="/green-calculator" />
      <main className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-emerald-500 text-white p-4 rounded-2xl mb-6 shadow-lg">
              <Calculator className="w-12 h-12" />
            </div>
            <h1 className="text-5xl font-bold text-emerald-800 mb-6 font-serif">
              CSID Green Calculator Toolkit
            </h1>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
              Calculate your environmental impact across four key sustainability categories. Get
              detailed metrics on carbon, energy, water, and waste — with downloadable reports.
            </p>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {calculatorTabs.map((tab) => (
              <div
                key={tab.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`${tab.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}
                >
                  {tab.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-emerald-800">{tab.name}</h3>
                <p className="text-sm mb-4 text-gray-600">{tab.description}</p>
                <div className="text-sm font-semibold text-emerald-600">
                  {tab.metricsCount} metrics
                </div>
              </div>
            ))}
          </div>

          {/* Calculator Launch */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200 shadow-2xl">
              <div className="mb-6">
                <span className="text-6xl">🌿</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-emerald-800">
                Ready to Measure Your Impact?
              </h2>
              <p className="text-lg mb-8 text-gray-600">
                Enter your environmental data and get comprehensive metrics with downloadable PDF
                reports.
              </p>
              <a
                href="/csid/Leaf-and-Ledger/calculator.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Open Calculator
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-emerald-100/50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-emerald-700">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500 mb-2">1</div>
                  <h4 className="font-semibold mb-2 text-emerald-800">Select a Category</h4>
                  <p className="text-sm text-gray-600">
                    Choose from Green Space, Energy, Water, or Waste metrics
                  </p>
                </div>
                <div className="bg-white/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500 mb-2">2</div>
                  <h4 className="font-semibold mb-2 text-emerald-800">Enter Your Data</h4>
                  <p className="text-sm text-gray-600">
                    Input your environmental metrics using intuitive sliders
                  </p>
                </div>
                <div className="bg-white/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500 mb-2">3</div>
                  <h4 className="font-semibold mb-2 text-emerald-800">Get Your Report</h4>
                  <p className="text-sm text-gray-600">
                    View results with 9 detailed metrics and download your PDF
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="text-emerald-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
