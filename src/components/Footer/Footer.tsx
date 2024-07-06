import React, { FC } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faTiktok, faBehance } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";


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
          style={{ fill: "var(--light-background-color)" }}
          fill-opacity="1"
          d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
        <path
          style={{ fill: "var(--dark-background-color)" }}
          fill-opacity="1"
          d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,117.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div className="Footer py-3 ">
      <div className="footer-left">
        <div className="footer-logo">
          <img
            alt=""
            src="/assets/logo.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </div>
        <div className="footer-design-trademark">
          <div className="footer-design footer-text">
            Crafted with care by Ayush
          </div>
          <div className="footer-trademark footer-text">
            &copy; {currentYear} The Arts Diary
          </div>
        </div>
      </div>

      <div className="footer-image-container">
        <img
          src="/assets/footer_brush_2.png"
          alt="Decorative"
          className="footer-image"
        />
      </div>

      <div className="footer-right">
        <div className="footer-follow">
          <a href="https://instagram.com/theartsdiary" className="social-icon">
          <FontAwesomeIcon icon={faInstagram}/>
          </a>
          <a href="https://facebook.com/theartsdiary" className="social-icon">
          <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://tiktok.com" className="social-icon">
          <FontAwesomeIcon icon={faBehance} />
          </a>
          <a href="https://behance.net" className="social-icon">
          <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
        <div className="footer-quicklink">
          <ul className="footer-nav">
            <li className="footer-nav-item">
            <Link to="/termsofservice" className='footer-nav-link'>
                Terms of Service
            </Link>
            </li>
            <li className="footer-nav-item">
            <Link to="/privacypolicy" className='footer-nav-link'>
                Privacy Policy
            </Link>
            </li>
            <li className="footer-nav-item">
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
