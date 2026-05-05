export interface CertificateData {
  fullName: string;
  courseTitle: string;
  dateCompleted: string;
  finalScore: string;
  uniqueCertId: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  duration: number;
  previousChapter?: string;
  nextChapter?: string;
}
