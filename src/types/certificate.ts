// src/types/certificate.ts

export interface CertificateData {
  fullName: string;
  courseTitle: string;
  dateCompleted: string;
  finalScore: string;
  uniqueCertId: string;
}

// Add the missing Chapter interface to satisfy TypeScript
export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  duration: number;
  previousChapter?: string; // Optional: ID of the previous chapter
  nextChapter?: string;     // Optional: ID of the next chapter
}
