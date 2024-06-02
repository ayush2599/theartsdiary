import React, { FC } from "react";
import "./Footer.css";

interface FooterProps {}

const currentYear = new Date().getFullYear();

const Footer: FC<FooterProps> = () => (
  <div>
    <div className="wave-transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1410 250"
        preserveAspectRatio="none"
        style={{ fill: "transparent", width: "100%", height: "100%" }}
      >
        <path
          fill="#ede0e0b0"
          fill-opacity="1"
          d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
        <path
          fill="#1a1818dd"
          fill-opacity="1"
          d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div className="Footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
        <div className="footer-trademark">
          <div className="footer-logo">
          <img
                  alt=""
                  src="/assets/logo.png"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
          </div>
          <div className="footer-text col-md-4 mb-0">
            &copy; {currentYear} The Arts Diary
          </div>
        </div>

        <div className="footer-image-container">
          <img
            src="/assets/footer_brush_2.png"
            alt="Decorative"
            className="footer-image"
          />
        </div>

        <ul className="footer-nav col-md-4 justify-content-end">
          <li className="footer-nav-item">
            <a href="#" className="footer-nav-link px-2">
              Home
            </a>
          </li>
          <li className="footer-nav-item">
            <a href="#" className="footer-nav-link px-2">
              Features
            </a>
          </li>
          <li className="footer-nav-item">
            <a href="#" className="footer-nav-link px-2">
              Pricing
            </a>
          </li>
          <li className="footer-nav-item">
            <a href="#" className="footer-nav-link px-2">
              FAQs
            </a>
          </li>
          <li className="footer-nav-item">
            <a href="#" className="footer-nav-link px-2">
              About
            </a>
          </li>
        </ul>
      </footer>
    </div>
  </div>
);

export default Footer;
