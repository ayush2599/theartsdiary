import React, { FC, useEffect } from 'react';
import './TermsOfService.css';
import { Helmet } from 'react-helmet-async';

interface TermsOfServiceProps {}

const TermsOfService: FC<TermsOfServiceProps> = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
  <div className="TermsOfService">
    <Helmet>
        <title>The Arts Diary | Terms of Service - Understand Our Terms and Conditions</title>
        <meta name="description" content="Review the Terms of Service for The Arts Diary to understand the conditions under which our services and content are provided. It's important to us that you know your rights and our commitments." />
        <meta name="keywords" content="terms of service, service conditions, user rights, legal terms, art service terms, usage policy" />
        <meta property="og:title" content="The Arts Diary | Terms of Service - Understand Our Terms and Conditions" />
        <meta property="og:description" content="Review the Terms of Service for The Arts Diary to understand the conditions under which our services and content are provided. It's important to us that you know your rights and our commitments." />
        <meta property="og:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/termsofservice" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Arts Diary | Terms of Service - Understand Our Terms and Conditions" />
        <meta name="twitter:description" content="Review the Terms of Service for The Arts Diary to understand the conditions under which our services and content are provided. It's important to us that you know your rights and our commitments." />
        <meta name="twitter:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
      </Helmet>
    <div className="container-title pt-5">
          <p>Terms of Service</p>
        </div>
    <div className="pdf-iframe">
      <iframe
        src="/assets/TermsOfService.pdf"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="Terms of Service"
      ></iframe>
    </div>
  </div>
);
};

export default TermsOfService;
