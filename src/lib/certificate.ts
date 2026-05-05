import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  score: number;
  maxScore: number;
}

export async function generateCertificatePDF(
  certificateElementId: string,
  data: CertificateData
): Promise<void> {
  try {
    const element = document.getElementById(certificateElementId);
    if (!element) {
      throw new Error('Certificate element not found');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Get dimensions
    const imgWidth = 297; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Calculate dimensions to fit page
    let finalWidth = pageWidth;
    let finalHeight = (canvas.height * pageWidth) / canvas.width;

    if (finalHeight > pageHeight) {
      finalHeight = pageHeight;
      finalWidth = (canvas.width * pageHeight) / canvas.height;
    }

    const x = (pageWidth - finalWidth) / 2;
    const y = (pageHeight - finalHeight) / 2;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

    // Save with filename
    const filename = `CSID-Certificate-${data.certificateId}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    throw error;
  }
}

export function downloadCertificate(
  certificateElementId: string,
  data: CertificateData
): Promise<void> {
  return generateCertificatePDF(certificateElementId, data);
}
