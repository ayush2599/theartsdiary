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
        <title>The Arts Diary | Privacy Policy - Our Commitment to Your Privacy</title>
        <meta name="description" content="Our Privacy Policy at The Arts Diary outlines our practices regarding the collection, use, and protection of your personal information. We are committed to safeguarding your privacy and ensuring transparency." />
        <meta name="keywords" content="privacy policy, personal information protection, privacy practices, data security, information transparency" />
        <meta property="og:title" content="The Arts Diary | Privacy Policy - Our Commitment to Your Privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Our Privacy Policy at The Arts Diary outlines our practices regarding the collection, use, and protection of your personal information. We are committed to safeguarding your privacy and ensuring transparency." />
        <meta property="og:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/privacypolicy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Arts Diary | Privacy Policy - Our Commitment to Your Privacy" />
        <meta name="twitter:description" content="Our Privacy Policy at The Arts Diary outlines our practices regarding the collection, use, and protection of your personal information. We are committed to safeguarding your privacy and ensuring transparency." />
        <meta name="twitter:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
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
