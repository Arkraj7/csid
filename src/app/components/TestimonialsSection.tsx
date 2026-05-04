import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The ATF™ course completely changed how I think about climate investment. The four-pillar framework is something I now apply in my daily work. The chapter quizzes really lock in the knowledge.",
    initials: "AK",
    name: "Ananya Krishnamurthy",
    title: "ESG Analyst",
    location: "Mumbai",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
  },
  {
    quote: "I had no background in climate finance and was worried the content would be too technical. CSID breaks it down beautifully — the Gold Coast case study in Chapter 9 was especially eye-opening.",
    initials: "RV",
    name: "Rohit Venkataraman",
    title: "Urban Planner",
    location: "Bengaluru",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
  },
  {
    quote: "The capital imbalance data in Chapter 5 was genuinely shocking — $1.3 trillion going to mitigation versus $76 billion to adaptation. CSID makes these numbers understandable and actionable.",
    initials: "PM",
    name: "Priyanka Mehra",
    title: "Sustainability Researcher",
    location: "Delhi",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
  },
  {
    quote: "Clean interface, well-structured chapters, and the 70% quiz threshold keeps you honest. I appreciated that the certificate actually requires you to demonstrate understanding — not just click through.",
    initials: "SN",
    name: "Siddharth Nair",
    title: "Policy Advisor",
    location: "Kochi",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
  },
  {
    quote: "The Efficient Frontier concept in Chapter 7 is something I have been trying to explain to clients for years. CSID explains it in a way that a non-technical audience can actually grasp. Excellent platform.",
    initials: "KS",
    name: "Kavitha Sundaram",
    title: "Climate Finance Consultant",
    location: "Chennai",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
  }
];

export default function TestimonialsSection() {
  // Duplicating the array allows the CSS to create a seamless infinite scroll
  const loopItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-background overflow-hidden relative border-t border-border">
      
      {/* Inline CSS for the infinite scroll marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 35s linear infinite;
          width: max-content;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What Our Learners Say
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From ESG analysts to urban planners — CSID learners come from every corner of the climate economy.
        </p>
      </div>

      {/* The Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden">
        
        {/* Soft gradient fades on the edges to hide the hard cuts */}
        <div className="absolute top-0 left-0 h-full w-16 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* The Moving Track */}
        <div className="flex animate-infinite-scroll">
          {loopItems.map((testimonial, idx) => (
            
            // Fixed width ensures exactly ~3 show up on desktop at a time
            <div key={`testimonial-${idx}`} className="px-4 w-[380px] md:w-[450px] flex-shrink-0">
              <div className="h-full bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-default">
                
                <div>
                  <Quote size={32} className="text-primary/20 mb-6" />
                  <p className="text-foreground font-medium text-sm md:text-base leading-relaxed mb-10">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${testimonial.color}`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">
                      {testimonial.title} • {testimonial.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}
