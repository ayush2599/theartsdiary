import React, { FC, useEffect, useState } from "react";
import "./Orders.css";
import { myWork } from "../../interface/myWork";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Card, Button, Form, Row, Col } from "react-bootstrap";
import country_codes from "../../constants/country_code.json";
import emailjs from 'emailjs-com';

interface FAQItem {
  question: string;
  answer: string;
}

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    document.title = "Orders | The Arts Diary"; 
    const fetchMyWorks = async () => {
      const querySnapshot = await getDocs(collection(db, "myWorks"));
      const worksData: myWork[] = [];
      querySnapshot.forEach((doc) => {
        console.log("Pushed: " + doc.data().title);
        worksData.push(doc.data() as myWork);
      });
      worksData.sort((a, b) => b.year - a.year);
      setMyWorks(worksData);
    };

    const fetchFAQs = async () => {
      const faqsSnapshot = await getDocs(collection(db, "faqs"));
      const faqsData: FAQItem[] = [];
      faqsSnapshot.forEach((doc) => {
        faqsData.push(doc.data() as FAQItem);
      });
      setFaqs(faqsData);
    };

    fetchMyWorks();
    fetchFAQs();
  }, []);

  const CustomPrevArrow = (props: any) => (
    <div className="custom-arrow prev" onClick={props.onClick}>
      <FontAwesomeIcon icon="arrow-left" />
    </div>
  );

  const CustomNextArrow = (props: any) => (
    <div className="custom-arrow next" onClick={props.onClick}>
      <FontAwesomeIcon icon="arrow-right" />
    </div>
  );

  const sendEmail = (name: string, message: string) => {
    const templateParams = {
      from_name: name,
      to_name: "Ayush",
      message: message,
    };
  
    emailjs.send("service_fk0i5tc", "template_y4bjyb9", templateParams, "i-tIKh4WccTEswjQ8")
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
      }, err => {
        console.log('FAILED...', err);
      });
  };
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 1,
          infinite: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
    ],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
        .value,
      communication: (
        e.currentTarget.elements.namedItem("communication") as HTMLInputElement
      ).value,
      email: (e.currentTarget.elements.namedItem("user-email") as HTMLInputElement)
        .value,
      countryCode: (
        e.currentTarget.elements.namedItem("countryCode") as HTMLSelectElement
      ).value,
      contactNumber: (
        e.currentTarget.elements.namedItem("contactNumber") as HTMLInputElement
      ).value,
      instagramUsername: (
        e.currentTarget.elements.namedItem(
          "instagramUsername"
        ) as HTMLInputElement
      ).value,
      artworkType: (
        e.currentTarget.elements.namedItem("artworkType") as HTMLSelectElement
      ).value,
      description: (
        e.currentTarget.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      deliveryLocation: (
        e.currentTarget.elements.namedItem(
          "deliveryLocation"
        ) as HTMLTextAreaElement
      ).value,
      expectedDeliveryDate: (
        e.currentTarget.elements.namedItem(
          "expectedDeliveryDate"
        ) as HTMLInputElement
      ).value,
      offerCode: (
        e.currentTarget.elements.namedItem("offerCode") as HTMLInputElement
      ).value,
    };

    try {
      await addDoc(collection(db, "orders"), formData);
      sendEmail(formData.name, JSON.stringify(formData))
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting the request: ", error);
    }
  };

  return (
    <div className="Orders">
      <div className="recent-works">
        <div className="container-title">
          <p>Recent Comisssions</p>
        </div>

        <Slider {...settings}>
          {myWorks.map((item, index) => (
            <div className="slider-item" key={index}>
              <img
                className="slider-image"
                src={item.imageLink}
                alt={item.title}
              />
              <div className="slider-text">
                <h3 className="slider-title">{item.title}</h3>
                <div className="tags">
                  <Badge bg="secondary" className="mr-1">
                    Category: {item?.category}
                  </Badge>
                  <Badge bg="secondary">Size: {item?.size}</Badge>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="order-place mt-4">
        <div className="container-title">
          <p>Order Your Custom Artwork or Portrait Today!</p>
        </div>
        <div className="container-description">
          <p>
            Transform your memories into a <b>timeless piece of art</b>. We will
            meticulously craft an{" "}
            <b>
              exquisite artwork or portrait based on your preferences and
              imagination
            </b>
            . Whether it's a cherished memory, a beloved pet, a special
            occasion, or a loved one's portrait, we will bring your visions to
            life
          </p>
        </div>
        <div className="container-content">
          <div className="highlights">
            <div className="row">
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                <img
                  className="highlight-img"
                  src="/assets/personalized_artwork.jpeg"
                  width="180"
                  height="180"
                  alt="personalized artwork highlight"
                />
                <div className="highlight-desc mt-2">
                  Handcrafted to your Specifications
                </div>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                <img
                  className="highlight-img"
                  src="/assets/quality_materials.jpeg"
                  width="180"
                  height="180"
                  alt="quality materials highlight"
                />
                <span className="highlight-desc mt-2">
                  Premium Quality and Craftsmanship
                </span>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                <img
                  className="highlight-img"
                  src="/assets/easy_order.jpeg"
                  width="180"
                  height="180"
                  alt="easy ordering highlight"
                />
                <span className="highlight-desc mt-2">
                  Hassle-Free ordering process
                </span>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                <img
                  className="highlight-img"
                  src="/assets/happy_customer.jpeg"
                  width="180"
                  height="180"
                  alt="happy constomer highlight"
                />
                <span className="highlight-desc mt-2">
                  Perfect gift to bring smiles
                </span>
              </div>
            </div>
          </div>
          <div className="order-form mt-3 mx-auto">
            <h2>Place Your Order</h2>
            <p>
              We will contact you within 24 hours of placing the order to
              understand your requirements and process your order.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="name">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-md-5">
                  Preferred Mode of Communication
                  <span className="text-danger">*</span>
                </label>
                <div className="form-check col-md-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communication"
                    id="email"
                    value="email"
                    required
                  />
                  <label className="form-check-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="form-check col-md-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communication"
                    id="whatsapp"
                    value="whatsapp"
                  />
                  <label className="form-check-label" htmlFor="whatsapp">
                    Whatsapp
                  </label>
                </div>
                <div className="form-check col-md-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communication"
                    id="instagram"
                    value="instagram"
                  />
                  <label className="form-check-label" htmlFor="instagram">
                    Instagram
                  </label>
                </div>
              </div>

              <div className="form-group ">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="user-email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group row">
                <label htmlFor="contactNumber">Contact Number*</label>
                <div className="form-group col-md-2">
                  <select
                    className="custom-select form-control"
                    id="countryCode"
                    required
                  >
                    <option selected value="" disabled>
                      {" "}
                      + XXX
                    </option>
                    {country_codes.country_code.map((country, index) => (
                      <option key={index} value={country.dial_code}>
                        {country.code} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    placeholder="Contact number (preferably whatsapp)"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="instagramUsername">Instagram username</label>
                <input
                  type="text"
                  className="form-control"
                  id="instagramUsername"
                  placeholder="Enter your Instagram username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="artworkType">
                  Artwork Type<span className="text-danger">*</span>
                </label>
                <select className="form-control" id="artworkType" required>
                  <option value="" disabled selected>
                    Select the artwork type
                  </option>
                  <option>B/W Portrait</option>
                  <option>Colour Portrait</option>
                  <option>Large Scale Work</option>
                  <option>Digital Illustration</option>
                  <option>Logo Design</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={3}
                  placeholder="Describe your requirements"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="deliveryLocation">
                  Delivery Location<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="deliveryLocation"
                  rows={3}
                  placeholder="Enter delivery location details"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="expectedDeliveryDate">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expectedDeliveryDate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="offerCode">Offer Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="offerCode"
                  placeholder="Enter offer code"
                />
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-primary ">
                  Place Order
                </button>
              </div>
            </form>
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={5000}
              autohide
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            >
              <Toast.Header
                style={{ backgroundColor: "#3b3b3b", color: "#fff" }}
              >
                <strong className="mr-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Order placed successfully!</Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </div>
            <div className={`faq-answer ${openFAQ === index ? "open" : ""}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
