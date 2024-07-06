import React, { FC } from 'react';
import './TermsOfService.css';

interface TermsOfServiceProps {}

const TermsOfService: FC<TermsOfServiceProps> = () => (
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

export default TermsOfService;
