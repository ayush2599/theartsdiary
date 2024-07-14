import React, { FC, useEffect, useState } from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faBehance,
  faWhatsapp,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "emailjs-com";
import CustomToast from "../CustomToast/CustomToast";
import { Helmet } from "react-helmet-async";

interface ContactProps {}

const Contact: FC<ContactProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (name: string, message: string, subject: string) => {
    const templateParams = {
      from_name: name,
      to_name: "Ayush",
      message: message,
      subject: subject
    };

    emailjs
      .send(
        "service_fk0i5tc",
        "template_6o8op4s",
        templateParams,
        "i-tIKh4WccTEswjQ8"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add to Firebase
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date(),
      });

      sendEmail(formData.name, JSON.stringify(formData), formData.subject);

      // Reset form data
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowToast({
        show: true,
        message:
          "Thank you for your message. We will get back to you shortly!.",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setShowToast({
        show: true,
        message: "Failed to send your message. Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <div className="contact padded-container">
      <Helmet>
        <title>The Arts Diary | Contact Us - Reach Out for Inquiries or Collaborations</title>
        <meta name="description" content="Contact The Arts Diary for inquiries, collaborations, or to discuss a potential art project. We are here to assist you with any questions about our artworks or services." />
        <meta name="keywords" content="contact art gallery, art inquiries, collaborate with artists, art project discussion, contact The Arts Diary, artist contact" />
        <meta property="og:title" content="The Arts Diary | Contact Us - Reach Out for Inquiries or Collaborations" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Contact The Arts Diary for inquiries, collaborations, or to discuss a potential art project. We are here to assist you with any questions about our artworks or services." />
        <meta property="og:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Arts Diary | Contact Us - Reach Out for Inquiries or Collaborations" />
        <meta name="twitter:description" content="Contact The Arts Diary for inquiries, collaborations, or to discuss a potential art project. We are here to assist you with any questions about our artworks or services." />
        <meta name="twitter:image" content="https://theartsdiary.ayushkarn.in/assets/logo.png" />
      </Helmet>
      <div className="container-title">
        <p>Contact Us</p>
      </div>

      <div className="contact-content">
        <div className="branding">
          <img
            src="assets/logo.png"
            alt="The Arts Diary Logo"
            className="brand-logo"
          />
          <h2>The Arts Diary</h2>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faPhone} /> +91 8300875021
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +977 9841830776
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> theartsdiary@gmail.com
            </p>
          </div>
          <div className="social-media-icons">
            <a
              href="https://instagram.com/theartsdiary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://facebook.com/theartsdiaryofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://wa.me/+918300875021"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faBehance} />
            </a>
          </div>
        </div>
        <div className="contact-form">
          <h3>Let's work together!</h3>
          <p>Or send me a message to chat :)</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="container-buttons">
              <Button
                type="submit"
                variant="primary"
                className="btn-container-action"
                style={{ width: "100%" }}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
      <CustomToast
        show={showToast.show}
        message={showToast.message}
        onClose={() => setShowToast({ ...showToast, show: false })}
        type={showToast.type}
        delay={3000}
      />
    </div>
  );
};

export default Contact;
