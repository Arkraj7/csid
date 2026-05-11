'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Moon,
  Pause,
  Play,
  Save,
  Sun,
  Volume2,
} from 'lucide-react';
import { updateUserProgress } from '@/lib/progress';
import BiodiversityMap from './BiodiversityMap';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Hotspot = {
  name: string;
  coords: [number, number];
  description: string;
};

type InteractiveContent = {
  type: 'map';
  title: string;
  description: string;
  hotspots: Hotspot[];
};

type CourseChapter = {
  id: string;
  title: string;
  content: string;
  interactiveContent?: InteractiveContent;
  quiz?: QuizQuestion[];
};

type Course = {
  id: string;
  chapters: CourseChapter[];
};

type ContentBlock = {
  type: 'heading' | 'phase' | 'subheading' | 'paragraph';
  text: string;
};

type ActiveWord = {
  blockIndex: number;
  wordIndex: number;
} | null;

type ChapterContentProps = {
  course: Course;
  chapter: CourseChapter;
  completedChapterIds: string[];
  onChapterComplete: (chapterId: string) => Promise<void>;
};

function stripMarkdown(text: string) {
  return text
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim();
}

function stripStructuralMarkdown(text: string) {
  return text
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim();
}

function parseContent(rawText: string): ContentBlock[] {
  return rawText
    .split(/\n{2,}/)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const structuralText = stripStructuralMarkdown(section);
      const phaseMatch = stripMarkdown(structuralText).match(/^Phase\s+(\d+)/i);

      if (/^#{1,6}\s+/.test(section)) {
        if (phaseMatch) {
          return { type: 'phase', text: `Phase ${phaseMatch[1]}` };
        }

        return { type: 'heading', text: structuralText };
      }

      if (/^\*\*[^*]+\*\*:?\s*$/.test(section)) {
        return { type: 'subheading', text: structuralText };
      }

      return {
        type: 'paragraph',
        text: structuralText,
      };
    });
}

function getSpeechPlan(blocks: ContentBlock[]) {
  let cursor = 0;

  return blocks.map((block, blockIndex) => {
    const start = cursor;
    const cleanText = stripMarkdown(block.text);
    cursor += cleanText.length + 2;

    return {
      text: cleanText,
      blockIndex,
      start,
      end: start + cleanText.length,
      words: Array.from(cleanText.matchAll(/\S+/g)).map((match, wordIndex) => ({
        wordIndex,
        text: match[0],
        start: start + (match.index ?? 0),
        end: start + (match.index ?? 0) + match[0].length,
      })),
    };
  });
}

function getPreferredVoice() {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  const preferredNames = [
    'Natural',
    'Neural',
    'Samantha',
    'Google UK English Female',
    'Google US English',
    'Microsoft Aria',
    'Microsoft Jenny',
    'Microsoft Zira',
  ];

  return (
    voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith('en') &&
        preferredNames.some((name) => voice.name.toLowerCase().includes(name.toLowerCase()))
    ) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ??
    null
  );
}

function renderSpokenWords(text: string, blockIndex: number, activeWord: ActiveWord) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  let wordIndex = -1;

  return parts.flatMap((part, partIndex) => {
    const isBold = part.startsWith('**') && part.endsWith('**');
    const isItalic = !isBold && part.startsWith('*') && part.endsWith('*');
    const visiblePart = isBold ? part.slice(2, -2) : isItalic ? part.slice(1, -1) : part;

    return visiblePart.split(/(\s+)/).map((segment, segmentIndex) => {
      if (/^\s+$/.test(segment)) {
        return segment;
      }

      wordIndex += 1;
      const isActive = activeWord?.blockIndex === blockIndex && activeWord.wordIndex === wordIndex;
      const className = isActive
        ? 'rounded bg-yellow-200 px-0.5 text-gray-950 ring-1 ring-yellow-300 dark:bg-yellow-400 dark:text-gray-950 dark:ring-yellow-500'
        : undefined;

      const word = (
        <span key={`${blockIndex}-${partIndex}-${segmentIndex}-${segment}`} className={className}>
          {segment}
        </span>
      );

      if (isBold) {
        return (
          <strong
            key={`${blockIndex}-${partIndex}-${segmentIndex}-${segment}`}
            className="font-bold"
          >
            {word}
          </strong>
        );
      }

      if (isItalic) {
        return (
          <em key={`${blockIndex}-${partIndex}-${segmentIndex}-${segment}`} className="italic">
            {word}
          </em>
        );
      }

      return word;
    });
  });
}

export default function ChapterContent({
  course,
  chapter,
  completedChapterIds,
  onChapterComplete,
}: ChapterContentProps) {
  const router = useRouter();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [speechState, setSpeechState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [activeWord, setActiveWord] = useState<ActiveWord>(null);

  const blocks = useMemo(() => parseContent(chapter.content), [chapter.content]);
  const speechPlan = useMemo(() => getSpeechPlan(blocks), [blocks]);
  const speechText = useMemo(
    () => speechPlan.map((block) => block.text).join('\n\n'),
    [speechPlan]
  );
  const quiz = chapter.quiz ?? [];
  const currentIndex = course.chapters.findIndex((item) => item.id === chapter.id);
  const isFirstChapter = currentIndex <= 0;
  const isLastChapter = currentIndex === course.chapters.length - 1;
  const requiresQuiz = quiz.length > 0;
  const allQuestionsAnswered =
    requiresQuiz && quiz.every((question) => answers[question.id] !== undefined);
  const canContinue = !requiresQuiz || isQuizSubmitted;
  const isChapterComplete = completedChapterIds.includes(chapter.id);

  useEffect(() => {
    setAnswers({});
    setIsQuizSubmitted(false);
    setSpeechState('idle');
    setActiveWord(null);

    const startTime = Date.now();
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    return () => {
      window.speechSynthesis?.cancel();

      const hoursSpent = (Date.now() - startTime) / (1000 * 60 * 60);
      if (hoursSpent > 0.004) {
        updateUserProgress({ hoursLearned: Number(hoursSpent.toFixed(2)) });
      }
    };
  }, [chapter.id]);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechText);
    const preferredVoice = getPreferredVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 0.95;
    utterance.volume = 0.9;
    utteranceRef.current = utterance;

    utterance.onboundary = (event) => {
      const nextBlock = speechPlan.find(
        (block) => event.charIndex >= block.start && event.charIndex <= block.end
      );
      const nextWord = nextBlock?.words.find(
        (word) => event.charIndex >= word.start && event.charIndex <= word.end
      );

      if (nextBlock && nextWord) {
        setActiveWord({
          blockIndex: nextBlock.blockIndex,
          wordIndex: nextWord.wordIndex,
        });
      }
    };

    utterance.onend = () => {
      setSpeechState('idle');
      setActiveWord(null);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setSpeechState('idle');
      setActiveWord(null);
      utteranceRef.current = null;
    };

    setSpeechState('speaking');
    setActiveWord({ blockIndex: 0, wordIndex: 0 });
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!('speechSynthesis' in window)) return;

    if (speechState === 'speaking') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    }
  };

  const toggleDarkMode = () => {
    const nextIsDark = !isDarkMode;
    document.documentElement.classList.toggle('dark', nextIsDark);
    localStorage.theme = nextIsDark ? 'dark' : 'light';
    setIsDarkMode(nextIsDark);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!allQuestionsAnswered) return;
    setIsQuizSubmitted(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateUserProgress({ lessonsCompleted: 0 });
    setIsSaving(false);
  };

  const handleNext = async () => {
    if (!canContinue) return;

    setIsSaving(true);
    await onChapterComplete(chapter.id);

    if (isLastChapter) {
      router.push(`/courses/${course.id}`);
    } else {
      router.push(`/courses/${course.id}/chapters/${course.chapters[currentIndex + 1].id}`);
    }
  };

  const handlePrevious = () => {
    if (!isFirstChapter) {
      router.push(`/courses/${course.id}/chapters/${course.chapters[currentIndex - 1].id}`);
    }
  };

  return (
    <article className="max-w-4xl mx-auto p-6 md:p-10 pb-32">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-colors font-semibold text-sm"
          >
            <Home size={17} />
            Home
          </button>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        <button
          onClick={toggleDarkMode}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 transition-colors font-semibold text-sm"
        >
          {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          {isDarkMode ? 'Day Mode' : 'Night Mode'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-3">
            Chapter {currentIndex + 1} {isChapterComplete ? '- Complete' : ''}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {stripMarkdown(chapter.title)}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleReadAloud}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-gray-800 text-green-700 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm shrink-0"
          >
            {speechState === 'idle' ? <Volume2 size={18} /> : <Play size={18} />}
            {speechState === 'idle' ? 'Read Aloud' : 'Restart'}
          </button>
          {speechState !== 'idle' && (
            <button
              onClick={handlePauseResume}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm shrink-0"
            >
              {speechState === 'paused' ? <Play size={18} /> : <Pause size={18} />}
              {speechState === 'paused' ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-none mb-16">
        {blocks.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={`${chapter.id}-block-${index}`}
                className="mt-8 mb-3 px-2 py-1 rounded-md text-base md:text-[17px] font-bold text-justify text-gray-950 dark:text-white leading-relaxed"
              >
                {renderSpokenWords(block.text, index, activeWord)}
              </h2>
            );
          }

          if (block.type === 'phase') {
            return (
              <h2
                key={`${chapter.id}-block-${index}`}
                className="mt-8 mb-3 px-2 py-1 rounded-md text-sm md:text-base font-bold uppercase tracking-wide text-green-700 dark:text-green-400 leading-relaxed"
              >
                {renderSpokenWords(block.text, index, activeWord)}
              </h2>
            );
          }

          if (block.type === 'subheading') {
            return (
              <h3
                key={`${chapter.id}-block-${index}`}
                className="mt-7 mb-3 px-2 py-1 rounded-md text-base md:text-[17px] font-bold italic text-justify text-gray-900 dark:text-gray-100 leading-relaxed"
              >
                {renderSpokenWords(block.text, index, activeWord)}
              </h3>
            );
          }

          return (
            <p
              key={`${chapter.id}-block-${index}`}
              className="mb-5 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify whitespace-pre-line"
            >
              {renderSpokenWords(block.text, index, activeWord)}
            </p>
          );
        })}
      </div>

      {chapter.interactiveContent && chapter.interactiveContent.type === 'map' && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {chapter.interactiveContent.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {chapter.interactiveContent.description}
          </p>
          <BiodiversityMap hotspots={chapter.interactiveContent.hotspots} />
        </div>
      )}

      {requiresQuiz && (
        <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 md:p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Chapter Knowledge Check
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Complete this quiz to unlock Save & Next.
          </p>

          <div className="space-y-8">
            {quiz.map((question, index) => (
              <div
                key={question.id}
                className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-xl shadow-sm"
              >
                <p className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  {index + 1}. {stripMarkdown(question.question)}
                </p>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[question.id] === optionIndex;
                    const isCorrect = optionIndex === question.correctAnswer;

                    let buttonClass =
                      'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                    if (isQuizSubmitted) {
                      if (isCorrect) {
                        buttonClass +=
                          'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300';
                      } else if (isSelected) {
                        buttonClass +=
                          'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300';
                      } else {
                        buttonClass +=
                          'border-gray-200 dark:border-gray-700 text-gray-500 opacity-50';
                      }
                    } else {
                      buttonClass += isSelected
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 text-gray-700 dark:text-gray-300';
                    }

                    return (
                      <button
                        key={`${question.id}-${optionIndex}`}
                        onClick={() => handleOptionSelect(question.id, optionIndex)}
                        className={buttonClass}
                        disabled={isQuizSubmitted}
                      >
                        {stripMarkdown(option)}
                      </button>
                    );
                  })}
                </div>

                {isQuizSubmitted && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm leading-relaxed">
                    <strong>Explanation:</strong> {stripMarkdown(question.explanation)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isQuizSubmitted && (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered}
              className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                allQuestionsAnswered
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answers
            </button>
          )}
        </section>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handlePrevious}
          disabled={isFirstChapter}
          className={`flex items-center justify-center px-6 py-3 rounded-lg font-bold w-full sm:w-auto ${
            isFirstChapter
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <ChevronLeft className="mr-2" size={20} />
          Previous
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            <Save className="mr-2" size={20} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue || isSaving}
            className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-lg font-bold text-white transition-colors shadow-lg ${
              !canContinue || isSaving
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLastChapter ? 'Finish Course' : 'Save & Next'}
            {!isLastChapter && <ChevronRight className="ml-2" size={20} />}
          </button>
        </div>
      </div>
    </article>
  );
}
