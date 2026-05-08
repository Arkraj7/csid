'use client';

import React from 'react';
import { AlertTriangle, Mail, Clock, Users, FileText } from 'lucide-react';

export default function InternshipsSection() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Internship Opportunities</h2>
          <p className="text-emerald-100 text-lg">
            Join our team and contribute to meaningful sustainability research
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Main Details Card */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Type */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Role Type</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Remote, unpaid internship opportunities (Rolling basis)
                  </p>
                </div>
              </div>

              {/* Focus Area */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Focus Area</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sustainability and climate research
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Duration</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    1 to 3 months
                  </p>
                </div>
              </div>

              {/* Submission */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Submission</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Applications sent to:
                    <br />
                    <a
                      href="mailto:centerforsustainabilityinclusi@gmail.com"
                      className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                    >
                      centerforsustainabilityinclusi@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Requirements */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Application Requirements
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">Updated CV</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">One-page Statement of Purpose (SOP)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">Writing sample (1,200 to 1,800 words)</span>
              </li>
            </ul>
          </div>

          {/* Strict Guidelines Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-3">
                  Strict Guidelines
                </h3>
                <p className="text-red-700 dark:text-red-400 leading-relaxed">
                  A strict non-AI policy for all application materials. Any plagiarism will result in immediate termination of the application process.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-4">
            <a
              href="mailto:centerforsustainabilityinclusi@gmail.com"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40"
            >
              <Mail className="w-5 h-5" />
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
