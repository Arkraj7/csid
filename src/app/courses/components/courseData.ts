// src/app/courses/components/courseData.ts
import { Chapter } from '@/types/certificate';

// Define the overall Course type
export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

// Your actual course data
export const courseData: Course = {
  id: "climate-finance-101",
  title: "Climate Finance & The Adaptive Thematic Framework",
  description: "A comprehensive guide to understanding global climate finance mechanisms.",
  chapters: [
    {
      id: "intro",
      title: "Introduction to Climate Finance",
      content: "<h2>What is Climate Finance?</h2><p>Climate finance refers to local, national, or transnational financing—drawn from public, private and alternative sources of financing—that seeks to support mitigation and adaptation actions that will address climate change.</p><br/><p>The UNFCCC, the Kyoto Protocol and the Paris Agreement call for financial assistance from Parties with more financial resources to those that are less endowed and more vulnerable.</p>",
      order: 1,
      duration: 10,
      nextChapter: "frameworks" // Links to the next chapter ID
    },
    {
      id: "frameworks",
      title: "The Adaptive Thematic Framework",
      content: "<h2>Understanding the Framework</h2><p>All CSID courses are derived from the Adaptive Thematic Framework™ — a proprietary capital allocation model developed by Arciteq Capital. The framework synthesizes data from the Climate Policy Initiative, UNEP Adaptation Gap Report 2024, and leading academic climate finance literature.</p>",
      order: 2,
      duration: 15,
      previousChapter: "intro",     // Links back to the first chapter ID
      nextChapter: "policy"         // Links to the final chapter ID
    },
    {
      id: "policy",
      title: "Global Policy Documents",
      content: "<h2>Multilateral Fund Guidelines</h2><p>This final chapter explores the guidelines set forth by major multilateral funds. Understanding these documents is crucial for effectively navigating the climate economy and securing project funding.</p><br/><p>Congratulations on reaching the end of the reading material! You are now ready to take the final assessment.</p>",
      order: 3,
      duration: 20,
      previousChapter: "frameworks" // Links back to the second chapter ID
      // No nextChapter here, because this is the last one! The "Take Quiz" button will appear.
    }
  ]
};
