import React, { FC, useEffect } from 'react';
import './TermsOfService.css';

interface TermsOfServiceProps {}

const TermsOfService: FC<TermsOfServiceProps> = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
  <div className="TermsOfService">
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
