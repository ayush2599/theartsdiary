import React, { FC } from 'react';
import './PrivacyPolicy.css';

interface PrivacyPolicyProps {}

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => (
  <div className="PrivacyPolicy">
    <div className="container-title pt-5">
          <p>Privacy Policy</p>
        </div>
    <div className="pdf-iframe">
      <iframe
        src="/assets/PrivacyPolicy.pdf"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="Terms of Service"
      ></iframe>
    </div>
  </div>
);

export default PrivacyPolicy;
