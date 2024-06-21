import React, { FC } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faBehance, faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

interface ContactProps {}

const Contact: FC<ContactProps> = () => (
  <div className="contact padded-container">
    <div className="container-title">
      <p>Contact Us</p>
    </div>

    <div className="contact-content">
      <div className="branding">
        <img src="assets/logo.png" alt="The Arts Diary Logo" className="brand-logo" />
        <h2>The Arts Diary</h2>
        <div className="contact-info">
          <p><FontAwesomeIcon icon={faPhone} /> +91 8300875021 | +977 9841830776</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> theartsdiary@gmail.com</p>
        </div>
        <div className="social-media-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faBehance} /></a>
        </div>
      </div>
      <div className="contact-form">
        <h3>Let's work together!</h3>
        <p>Or send me a message to chat :)</p>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Message" rows={4} required></textarea>
          <div className="container-buttons ">
            <Button type="submit" variant="primary" className="btn-container-action" style={{width : "100%"}}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
