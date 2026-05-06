/* eslint-disable @next/next/no-img-element */
'use client';

import React, { forwardRef } from 'react';
import { CertificateData } from '@/types/certificate';

interface Props {
  data: CertificateData;
}

const CertificateTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  // IMPORTANT: Since you are hosting on GitHub Pages at arkraj7.github.io/csid/
  // We must prefix the image path so html2canvas can find the logo.
  const basePath = '/csid';

  return (
    <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
      <div
        ref={ref}
        style={{
          width: '1122px', // A4 Landscape width at 96 DPI
          height: '793px', // A4 Landscape height
          backgroundColor: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          padding: '0',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333',
        }}
      >
        {/* Top Green Banner */}
        <div style={{ backgroundColor: '#10895a', padding: '30px', color: 'white' }}>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}
          >
            {/* Standard img tag is required here for html2canvas to work properly */}
            <img
              src={`${basePath}/assets/images/app_logo.png`}
              alt="CSID Logo"
              style={{ width: '40px', height: 'auto' }}
              crossOrigin="anonymous"
            />
            <h2 style={{ margin: 0, fontSize: '32px' }}>CSID</h2>
          </div>
          <p style={{ margin: '10px 0 0 0', letterSpacing: '2px', fontSize: '14px' }}>
            CENTER FOR SUSTAINABILITY AND INCLUSIVE DEVELOPMENT
          </p>
        </div>

        {/* Certificate Body */}
        <div style={{ padding: '60px 80px' }}>
          <p
            style={{
              color: '#666',
              letterSpacing: '2px',
              fontSize: '16px',
              textTransform: 'uppercase',
            }}
          >
            This certifies that
          </p>

          <h1
            style={{
              fontSize: '56px',
              color: '#0d1b2a',
              fontFamily: 'Georgia, serif',
              margin: '20px 0',
              fontStyle: 'italic',
            }}
          >
            {data.fullName}
          </h1>

          <div
            style={{
              width: '150px',
              height: '3px',
              backgroundColor: '#10895a',
              margin: '0 auto 30px auto',
            }}
          ></div>

          <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
            has successfully completed
          </p>

          <h2 style={{ fontSize: '28px', color: '#111', margin: '0 0 10px 0' }}>
            {data.courseTitle}
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '50px' }}>
            Issued by CSID Center for Sustainability and Inclusive Development
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', marginBottom: '40px' }} />

          {/* Data Grid */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '60px',
              padding: '0 40px',
            }}
          >
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Date of Completion</p>
              <p style={{ margin: 0, color: '#666' }}>{data.dateCompleted}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Certificate ID</p>
              <p style={{ margin: 0, color: '#666' }}>{data.uniqueCertId}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Final Score</p>
              <p style={{ margin: 0, color: '#666' }}>{data.finalScore}</p>
            </div>
          </div>

          {/* Signatures & Footer */}
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginBottom: '40px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #999', width: '200px', height: '40px' }}></div>
              <p style={{ marginTop: '10px', color: '#555' }}>Course Director, CSID</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{ fontSize: '40px', color: '#10895a', height: '40px', lineHeight: '40px' }}
              >
                ❂
              </div>
              <p style={{ marginTop: '10px', color: '#555' }}>CSID Verified</p>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#777' }}>
            Verify at <strong>csid.education/verify</strong> using Certificate ID
          </p>
        </div>
      </div>
    </div>
  );
});

CertificateTemplate.displayName = 'CertificateTemplate';
export default CertificateTemplate;
