# Certificate Generation Feature

## Overview

This implementation adds automated certificate generation and PDF download functionality to the CSID course platform. Students who pass the final assessment (≥70% score) can now download their completion certificate as a PDF.

## What Was Implemented

### 1. **Certificate Utility Library** (`src/lib/certificate.ts`)

- `generateCertificatePDF()` - Converts HTML certificate element to PDF using html2canvas and jsPDF
- `downloadCertificate()` - User-facing function to trigger certificate download
- `CertificateData` interface - Defines certificate metadata structure

### 2. **Updated FinalAssessmentModal** (`src/app/courses/components/FinalAssessmentModal.tsx`)

- Added download button in the results screen for students who pass
- Integrated certificate generation functionality
- Hidden certificate HTML element with complete certificate design
- Download state management with loading indicator
- Error handling with toast notifications

### 3. **Certificate Design**

- Professional certificate template with:
  - CSID header with gradient background
  - Student name display area
  - Course name and completion details
  - Certificate ID (auto-generated with timestamp)
  - Completion date
  - Final score display
  - Signature line and verification seal
  - Footer with verification URL and certificate ID

## How It Works

1. **Student takes final assessment** (15 questions)
2. **Student scores ≥70%** to pass
3. **Success screen appears** with two buttons:
   - "Download Certificate" - Downloads PDF immediately
   - "Unlock Certificate" - Proceeds to payment flow (₹49)
4. **Certificate PDF generated** with:
   - Student's performance data
   - Unique certificate ID
   - Completion date
   - Course information
5. **PDF downloaded** as `CSID-Certificate-{CERTIFICATE_ID}.pdf`

## Technical Details

### Dependencies Added

- `html2canvas` - Converts DOM elements to canvas for PDF export
- `jspdf` - Generates PDF files from canvas images

### Key Features

- **Client-side processing** - Certificate generation happens entirely in the browser
- **High-quality output** - PDF generated at 2x scale for crisp rendering
- **Responsive certificate design** - Maintains aspect ratio on any screen size
- **Error handling** - Toast notifications for success/failure states
- **Loading state** - Button disabled during download to prevent duplicate requests

## File Changes

1. **Created**: `/src/lib/certificate.ts` - Certificate generation utilities
2. **Updated**: `/src/app/courses/components/FinalAssessmentModal.tsx` - Added download UI and logic
3. **Created**: `/src/app/components/CertificatePreviewSection.tsx` - Already existed with design template

## Usage

Students can download certificates by:

1. Completing all chapters of a course
2. Taking the final assessment (minimum 15 questions)
3. Achieving ≥70% score
4. Clicking "Download Certificate" button in the success screen

## Future Enhancements

- Add certificate to student dashboard/progress page
- Email certificate to student automatically
- Support certificate verification via unique ID
- Add digital signature validation
- Store certificate records in database for audit trail
- Generate certificates for multiple languages

## Testing

The build completes successfully with:

- TypeScript type checking ✓
- All pages generate correctly ✓
- No compilation errors ✓
- Certificate module properly imported and used ✓

Build output:

```
✓ Compiled successfully
✓ Checking validity of types
✓ Generating static pages (14/14)
✓ Exporting (3/3)
```
