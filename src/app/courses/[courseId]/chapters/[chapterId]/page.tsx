'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ChapterData {
  title: string;
  content: string[];
  quiz: QuizQuestion[];
}

interface CourseChapters {
  title: string;
  chapters: Record<string, ChapterData>;
}

const courseChapterData: Record<string, CourseChapters> = {
  'climate-mitigation': {
    title: 'Climate Change Mitigation',
    chapters: {
      '1': {
        title: 'Introduction to Climate Mitigation',
        content: [
          'Climate mitigation refers to efforts to reduce or prevent the emission of greenhouse gases. Mitigation can mean using new technologies and renewable energies, making older equipment more energy efficient, or changing management practices or consumer behaviour.',
          'The Intergovernmental Panel on Climate Change (IPCC) defines mitigation as "a human intervention to reduce the sources or enhance the sinks of greenhouse gases."',
          'Global climate finance has scaled rapidly in recent years. Annual investment now exceeds approximately USD $1.7 trillion, largely directed toward mitigation — renewable energy, electrification, and decarbonisation technologies.',
          'The climate economy is expanding beyond mitigation into a broader, multi-dimensional system — one that encompasses four interconnected pillars: Mitigation, Adaptation, Resilience, and Recovery.',
          '[Please replace this placeholder with your original 1,200–1,800 word chapter content. Ensure no AI is used in writing this content.]',
        ],
        quiz: [
          { question: 'What does climate mitigation primarily aim to do?', options: ['Adapt to climate impacts', 'Reduce or prevent greenhouse gas emissions', 'Rebuild after climate disasters', 'Strengthen infrastructure'], correctIndex: 1 },
          { question: 'Which body defines mitigation as "a human intervention to reduce sources or enhance sinks of greenhouse gases"?', options: ['UNEP', 'World Bank', 'IPCC', 'WMO'], correctIndex: 2 },
          { question: 'Approximately how much annual investment flows into climate mitigation globally?', options: ['$500 billion', '$1.7 trillion', '$300 billion', '$5 trillion'], correctIndex: 1 },
          { question: 'Which of the following is an example of a mitigation action?', options: ['Building sea walls', 'Installing solar panels', 'Relocating coastal communities', 'Improving disaster response'], correctIndex: 1 },
          { question: 'How many pillars make up the broader climate economy framework?', options: ['2', '3', '4', '5'], correctIndex: 2 },
        ],
      },
      '2': {
        title: 'Renewable Energy Transition',
        content: [
          'The renewable energy transition refers to the global shift from fossil fuel-based energy systems to those powered by renewable sources such as solar, wind, hydro, and geothermal energy.',
          'Solar photovoltaic (PV) technology has seen dramatic cost reductions — over 90% in the past decade — making it the cheapest source of electricity in history in many regions.',
          'Wind energy, both onshore and offshore, has similarly become cost-competitive with conventional power generation in many markets.',
          'The transition requires not only new generation capacity but also grid modernisation, energy storage solutions, and demand-side management.',
          '[Please replace this placeholder with your original 1,200–1,800 word chapter content. Ensure no AI is used in writing this content.]',
        ],
        quiz: [
          { question: 'By approximately how much have solar PV costs fallen in the past decade?', options: ['30%', '60%', 'Over 90%', '50%'], correctIndex: 2 },
          { question: 'Which of the following is NOT a renewable energy source?', options: ['Solar', 'Wind', 'Natural Gas', 'Geothermal'], correctIndex: 2 },
          { question: 'What does grid modernisation support in the energy transition?', options: ['Fossil fuel extraction', 'Integration of variable renewable energy', 'Coal plant upgrades', 'Nuclear decommissioning'], correctIndex: 1 },
          { question: 'Offshore wind energy is primarily located:', options: ['In deserts', 'In oceans and large water bodies', 'On mountain tops', 'In urban areas'], correctIndex: 1 },
          { question: 'Energy storage solutions are important for renewables because:', options: ['They reduce solar panel costs', 'They manage the variability of renewable generation', 'They replace the need for grids', 'They increase fossil fuel use'], correctIndex: 1 },
        ],
      },
    },
  },
  'climate-adaptation': {
    title: 'Climate Adaptation Strategies',
    chapters: {
      '1': {
        title: 'Understanding Climate Adaptation',
        content: [
          'Climate adaptation refers to adjustments in ecological, social, or economic systems in response to actual or expected climatic stimuli and their effects or impacts.',
          'Unlike mitigation, which addresses the causes of climate change, adaptation addresses the consequences — helping communities, ecosystems, and economies cope with a changing climate.',
          'The IPCC distinguishes between autonomous adaptation (spontaneous responses to climate stimuli) and planned adaptation (deliberate policy decisions).',
          'Adaptation is particularly critical for developing nations and vulnerable communities that face the greatest climate risks with the fewest resources.',
          '[Please replace this placeholder with your original 1,200–1,800 word chapter content. Ensure no AI is used in writing this content.]',
        ],
        quiz: [
          { question: 'What does climate adaptation primarily address?', options: ['Causes of climate change', 'Consequences of climate change', 'Carbon pricing', 'Renewable energy deployment'], correctIndex: 1 },
          { question: 'What is "autonomous adaptation"?', options: ['Government-led adaptation plans', 'Spontaneous responses to climate stimuli', 'International climate agreements', 'Technology-driven solutions'], correctIndex: 1 },
          { question: 'Who faces the greatest climate risks with fewest resources?', options: ['Developed nations', 'Large corporations', 'Developing nations and vulnerable communities', 'Technology companies'], correctIndex: 2 },
          { question: 'Adaptation and mitigation are:', options: ['The same thing', 'Complementary approaches', 'Competing strategies', 'Unrelated concepts'], correctIndex: 1 },
          { question: 'Which organisation distinguishes between autonomous and planned adaptation?', options: ['World Bank', 'IPCC', 'IMF', 'UNEP'], correctIndex: 1 },
        ],
      },
    },
  },
};

const PASS_THRESHOLD = 0.7;

export default function ChapterPage({ params }: { params: { courseId: string; chapterId: string } }) {
  const { courseId, chapterId } = params;
  const courseData = courseChapterData[courseId];
  const chapterData = courseData?.chapters[chapterId];

  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!courseData || !chapterData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Chapter Not Found</h1>
          <Link href={`/courses/${courseId}`} className="text-primary hover:underline">← Back to Course</Link>
        </div>
      </div>
    );
  }

  const quiz = chapterData.quiz;
  const totalQuestions = quiz.length;

  const score = submitted
    ? quiz.reduce((acc, q, i) => acc + (selectedAnswers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;
  const percentage = submitted ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= PASS_THRESHOLD * 100;

  function handleSelect(qIndex: number, optIndex: number) {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  }

  function handleSubmit() {
    if (Object.keys(selectedAnswers).length < totalQuestions) return;
    setSubmitted(true);
    setAttempts((a) => a + 1);
  }

  function handleRetry() {
    setSelectedAnswers({});
    setSubmitted(false);
  }

  const chapterNum = parseInt(chapterId, 10);
  const nextChapterId = String(chapterNum + 1);
  const hasNextChapter = !!courseData.chapters[nextChapterId];

  return (
    <div className="min-h-screen bg-background">
      {/* Chapter Header */}
      <section className="bg-gradient-to-br from-green-50 via-teal-50/60 to-emerald-50 dark:from-green-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 border-b border-border py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/courses/${courseId}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} />
            Back to {courseData.title}
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <BookOpen size={12} />
            Chapter {chapterId}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{chapterData.title}</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Chapter Content */}
        {!quizStarted && (
          <section className="space-y-5">
            <div className="prose prose-sm max-w-none space-y-4">
              {chapterData.content.map((para, i) => (
                <p key={i} className={`text-foreground leading-relaxed ${para.startsWith('[Please') ? 'bg-muted/50 border border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground italic' : ''}`}>
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
              <button
                onClick={() => setQuizStarted(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 shadow-md shadow-primary/20"
              >
                Take Chapter Quiz
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Quiz Section */}
        {quizStarted && (
          <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Chapter {chapterId} Quiz</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {totalQuestions} Questions · Pass: 70%
              </span>
            </div>

            {/* Result Banner */}
            {submitted && (
              <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${passed ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'}`}>
                {passed ? (
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold text-sm ${passed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {passed ? `Congratulations! You scored ${percentage}% — Chapter Passed!` : `You scored ${percentage}% — You need 70% to pass.`}
                  </p>
                  <p className={`text-xs mt-0.5 ${passed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {score} out of {totalQuestions} correct · Attempt #{attempts}
                  </p>
                </div>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-6">
              {quiz.map((q, qIndex) => {
                const selected = selectedAnswers[qIndex];
                const isCorrect = submitted && selected === q.correctIndex;
                const isWrong = submitted && selected !== undefined && selected !== q.correctIndex;

                return (
                  <div key={qIndex} className={`p-4 rounded-xl border ${submitted ? (isCorrect ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' : isWrong ? 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20' : 'border-border') : 'border-border'}`}>
                    <p className="font-medium text-sm text-foreground mb-3">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => {
                        const isSelected = selected === optIndex;
                        const isCorrectOpt = submitted && optIndex === q.correctIndex;
                        const isWrongOpt = submitted && isSelected && optIndex !== q.correctIndex;

                        return (
                          <label
                            key={optIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-100 ${
                              isCorrectOpt
                                ? 'border-green-400 bg-green-50 dark:bg-green-950/30 dark:border-green-600'
                                : isWrongOpt
                                ? 'border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-600'
                                : isSelected
                                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/40 hover:bg-muted/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${qIndex}`}
                              value={optIndex}
                              checked={isSelected}
                              onChange={() => handleSelect(qIndex, optIndex)}
                              disabled={submitted}
                              className="accent-primary"
                            />
                            <span className="text-sm text-foreground">{option}</span>
                            {isCorrectOpt && <CheckCircle size={14} className="text-green-600 ml-auto flex-shrink-0" />}
                            {isWrongOpt && <XCircle size={14} className="text-red-600 ml-auto flex-shrink-0" />}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
              {!submitted ? (
                <>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <AlertCircle size={12} />
                    Answer all {totalQuestions} questions to submit
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < totalQuestions}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
                  >
                    <RotateCcw size={14} />
                    Try Again
                  </button>
                  {passed && hasNextChapter && (
                    <Link
                      href={`/courses/${courseId}/chapters/${nextChapterId}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95"
                    >
                      Next Chapter
                      <ChevronRight size={16} />
                    </Link>
                  )}
                  {passed && !hasNextChapter && (
                    <Link
                      href={`/courses/${courseId}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 active:scale-95"
                    >
                      <CheckCircle size={16} />
                      Course Complete!
                    </Link>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
