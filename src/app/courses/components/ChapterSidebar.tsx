'use client';

import React from 'react';
import { Chapter } from '@/types/certificate';

interface Props {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
}

export default function ChapterSidebar({ chapters, activeChapterId, onSelectChapter }: Props) {
  return (
    <div className="w-full md:w-80 bg-white dark:bg-[#112240] border-r border-gray-200 dark:border-gray-800 flex-shrink-0 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Course Content</h2>
        <div className="space-y-3">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(chapter.id)}
                className={`w-full text-left flex items-center justify-between p-4 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${isActive ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                    <span className="text-sm font-bold">{chapter.order}</span>
                  </div>
                  <span className={`font-medium line-clamp-2 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {chapter.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
