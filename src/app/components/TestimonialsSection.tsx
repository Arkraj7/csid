import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'review-001',
    name: 'Ananya Krishnamurthy',
    role: 'ESG Analyst, Mumbai',
    rating: 5,
    quote: 'The ATF™ course completely changed how I think about climate investment. The four-pillar framework is something I now apply in my daily work. The chapter quizzes really lock in the knowledge.',
    avatar: 'AK',
    avatarColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  {
    id: 'review-002',
    name: 'Rohit Venkataraman',
    role: 'Urban Planner, Bengaluru',
    rating: 5,
    quote: 'I had no background in climate finance and was worried the content would be too technical. CSID breaks it down beautifully — the Gold Coast case study in Chapter 9 was especially eye-opening.',
    avatar: 'RV',
    avatarColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  },
  {
    id: 'review-003',
    name: 'Priyanka Mehra',
    role: 'Sustainability Researcher, Delhi',
    rating: 5,
    quote: 'The capital imbalance data in Chapter 5 was genuinely shocking — $1.3 trillion going to mitigation versus $76 billion to adaptation. CSID makes these numbers understandable and actionable.',
    avatar: 'PM',
    avatarColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    id: 'review-004',
    name: 'Siddharth Nair',
    role: 'Policy Advisor, Kochi',
    rating: 4,
    quote: 'Clean interface, well-structured chapters, and the 70% quiz threshold keeps you honest. I appreciated that the certificate actually requires you to demonstrate understanding — not just click through.',
    avatar: 'SN',
    avatarColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  {
    id: 'review-005',
    name: 'Kavitha Sundaram',
    role: 'Climate Finance Consultant, Chennai',
    rating: 5,
    quote: 'The Efficient Frontier concept in Chapter 7 is something I have been trying to explain to clients for years. CSID explains it in a way that a non-technical audience can actually grasp. Excellent platform.',
    avatar: 'KS',
    avatarColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          size={14}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted fill-muted'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            Learner Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Learners Say</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            From ESG analysts to urban planners — CSID learners come from every corner of the climate economy.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-5 card-hover">
              <Quote size={20} className="text-primary/30 mb-3" />
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${t.avatarColor}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`agg-star-${i}`} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-foreground font-tabular">4.9</span>
            <span className="text-sm text-muted-foreground">from 2,400+ learners</span>
          </div>
        </div>
      </div>
    </section>
  );
}