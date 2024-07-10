import React, { FC, useEffect } from "react";
import "./PrivacyPolicy.css";
import { Helmet } from "react-helmet-async";

interface PrivacyPolicyProps {}

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="PrivacyPolicy">
      <Helmet>
        <title>The Arts Diary | Privacy Policy</title>
        <meta name="description" content="Read our privacy policy." />
        <meta name="keywords" content="privacy policy, data protection, legal" />
        <meta property="og:title" content="The Arts Diary | Privacy Policy" />
        <meta property="og:description" content="Read our privacy policy." />
        <meta property="og:image" content="URL_TO_YOUR_IMAGE" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/privacypolicy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Arts Diary | Privacy Policy" />
        <meta name="twitter:description" content="Read our privacy policy." />
        <meta name="twitter:image" content="URL_TO_YOUR_SMALL_IMAGE" />
      </Helmet>
      <div className="container-title pt-5">
        <p>Privacy Policy</p>
      </div>
      <div className="pdf-iframe">
        <iframe
          src="/assets/PrivacyPolicy.pdf"
          width="100%"
          height="600px"
          style={{ border: "none" }}
          title="Terms of Service"
        ></iframe>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
