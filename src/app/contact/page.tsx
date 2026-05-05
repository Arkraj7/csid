import React from 'react';
import { Mail, Phone, MapPin, User, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar currentPath="/contact" />

      <main className="flex-grow">
        {/* Contact Header */}
        <div className="bg-[#0A192F] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Have questions about our courses or want to discuss the Climate Economy? We&apos;d
              love to hear from you.
            </p>
          </div>
        </div>

        {/* Contact Info & Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-12 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
            {/* Left Side: Contact Information */}
            <div className="lg:w-2/5 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Contact Info</h2>

                <div className="space-y-8">
                  {/* Name */}
                  <div className="flex items-start gap-4">
                    <User className="w-6 h-6 mt-1 text-emerald-200" />
                    <div>
                      <p className="text-sm text-emerald-100 font-medium uppercase tracking-wider mb-1">
                        Name
                      </p>
                      <p className="text-xl font-semibold">Arkraj Biswas</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 mt-1 text-emerald-200" />
                    <div>
                      <p className="text-sm text-emerald-100 font-medium uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:arkraj.biswas6@gmail.com"
                        className="text-lg font-semibold hover:text-emerald-100 transition-colors"
                      >
                        arkraj.biswas6@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 mt-1 text-emerald-200" />
                    <div>
                      <p className="text-sm text-emerald-100 font-medium uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+917903735679"
                        className="text-lg font-semibold hover:text-emerald-100 transition-colors"
                      >
                        +91-7903735679
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 mt-1 text-emerald-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-emerald-100 font-medium uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-lg font-semibold leading-relaxed">
                        Supreme Court metro station building,
                        <br />
                        Pragati Maidan,
                        <br />
                        New Delhi, Delhi 110001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:w-3/5 p-10 sm:p-12 bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="bg-primary hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl w-full flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary/30 mt-4"
                >
                  Send Message
                  <Send className="w-5 h-5" />
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
