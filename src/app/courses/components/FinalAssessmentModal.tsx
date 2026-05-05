'use client';

import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificateTemplate from './CertificateTemplate';
import { CertificateData } from '@/types/certificate';

interface FinalAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  courseTitle: string;
  onPass?: () => void;
}

export default function FinalAssessmentModal({
  isOpen,
  onClose,
  score,
  totalQuestions,
  courseTitle,
  onPass,
}: FinalAssessmentModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState('Student Name');

  const passingScore = Math.ceil(totalQuestions * 0.8);
  const passed = score >= passingScore;

  useEffect(() => {
    const storedUser = localStorage.getItem('csid_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.name) setUserName(parsedUser.name);
      } catch (e) {
        console.error('Could not parse user', e);
      }
    }

    if (isOpen && passed && onPass) {
      onPass();
    }
  }, [isOpen, passed, onPass]);

  if (!isOpen) return null;

  const certData: CertificateData = {
    fullName: userName,
    courseTitle,
    dateCompleted: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    finalScore: `${Math.round((score / totalQuestions) * 100)}% (${score}/${totalQuestions})`,
    uniqueCertId: `CSID-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`,
  };

  const generatePDF = async () => {
    if (!certificateRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certData.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('There was an error generating your certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
        <div className="p-6 sm:p-8 text-center">
          <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? 'Assessment Passed!' : 'Assessment Failed'}
          </h2>

          <div className="text-6xl font-bold mb-2">{Math.round((score / totalQuestions) * 100)}%</div>

          <p className="text-gray-600 mb-8">
            You scored {score} out of {totalQuestions} questions correctly.
            {!passed && ' You need 80% to pass and earn your certificate.'}
          </p>

          <div className="flex flex-col gap-3">
            {passed && (
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? 'Generating PDF...' : 'Download Certificate'}
              </button>
            )}

            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                passed ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {passed ? 'Return to Course' : 'Try Again'}
            </button>
          </div>
        </div>

        <div className="overflow-hidden h-0 w-0 absolute">
          <CertificateTemplate ref={certificateRef} data={certData} />
        </div>
      </div>
    </div>
  );
}
