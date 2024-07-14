import React, { FC, useEffect, useState } from "react";
import "./Orders.css";
import { myWork } from "../../interface/myWork";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import country_codes from "../../constants/country_code.json";
import emailjs from "emailjs-com";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { OrderFormDataField } from "../../interface/OrderFormData";
import CustomToast from "../CustomToast/CustomToast";
import { FAQItem } from "../../interface/FAQItem";
import { commissionWork } from "../../interface/commissionWork";
import { Helmet } from "react-helmet-async";
import Preloader from "../Preloader/Preloader";
import Select from "react-select";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState<commissionWork[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [orderType, setOrderType] = useState("");
  const [formData, setFormData] = useState<OrderFormDataField>({
    artworkType: "",
    communication: "",
    contactNumber: "",
    countryCode: "",
    deliveryLocation: "",
    description: "",
    email: "",
    instagramUsername: "",
    name: "",
    referenceImages: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    document.title = "Orders | The Arts Diary";
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1200,
      once: true, 
    });
    const fetchCommissionWorks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "commissionWorks"));
        const commissionsData: commissionWork[] = [];
        querySnapshot.forEach((doc) => {
          commissionsData.push(doc.data() as commissionWork);
        });
        commissionsData.sort((a, b) => b.year - a.year);
        setCommissions(commissionsData);
      } catch (error) {
        console.error("Failed to fetch commission works:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const faqsSnapshot = await getDocs(collection(db, "faqs"));
        const faqsData: FAQItem[] = [];
        faqsSnapshot.forEach((doc) => {
          faqsData.push(doc.data() as FAQItem);
        });
        setFaqs(faqsData);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissionWorks();
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

    emailjs
      .send(
        "service_fk0i5tc",
        "template_y4bjyb9",
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "50px",
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

  function validateFormData(data: OrderFormDataField): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex

    if (!data.artworkType) {
      setShowToast({
        show: true,
        message: "Artwork type is required.",
        type: "error",
      });
      return false;
    }

    if (!data.communication) {
      setShowToast({
        show: true,
        message: "Preferred mode of communication is required.",
        type: "error",
      });
      return false;
    }

    if (!data.contactNumber) {
      setShowToast({
        show: true,
        message: "Contact number is required.",
        type: "error",
      });
      return false;
    }

    if (!data.countryCode) {
      setShowToast({
        show: true,
        message: "Country code is required.",
        type: "error",
      });
      return false;
    }

    if (!data.deliveryLocation) {
      setShowToast({
        show: true,
        message: "Delivery location is required.",
        type: "error",
      });
      return false;
    }

    if (!data.description) {
      setShowToast({
        show: true,
        message: "Description of the artwork is required.",
        type: "error",
      });
      return false;
    }

    if (!data.email) {
      setShowToast({
        show: true,
        message: "Email is required.",
        type: "error",
      });
      return false;
    } else if (!emailRegex.test(data.email)) {
      setShowToast({
        show: true,
        message: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }

    if (!data.name) {
      setShowToast({
        show: true,
        message: "Name is required.",
        type: "error",
      });
      return false;
    }

    // Additional checks can be added as needed
    return true; // If all validations pass
  }

  const [step, setStep] = useState(1);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);

      const fileReaders = filesArray.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader;
      });

      const images = fileReaders.map((reader) => {
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });
    }
  };

  const handleNextStep = () => {
    // Example validation check
    if (step === 1 && formData.artworkType && formData.description) {
      setStep(2);
    } else {
      setShowToast({
        show: true,
        message: "Please complete all required fields.",
        type: "error",
      });
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const uploadImages = async (): Promise<string[]> => {
    const urls = await Promise.all(
      selectedFiles.map(async (file) => {
        const fileRef = ref(storage, `orders/images/${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      })
    );
    return urls;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form data here as per your validation function
    if (!validateFormData(formData)) {
      return;
    }

    const imageUrls = await uploadImages(); // Upload images and get URLs
    const fullFormData = {
      ...formData,
      referenceImages: imageUrls, // Add URLs to form data
      insertedOn: Timestamp.fromDate(new Date()), // Set the timestamp
    };

    try {
      await addDoc(collection(db, "orders"), fullFormData);
      sendEmail(formData.name, JSON.stringify(formData));
      setShowToast({
        show: true,
        message: "Order received successfully! We will get back to you soon.",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          artworkType: "",
          communication: "",
          contactNumber: "",
          countryCode: "",
          deliveryLocation: "",
          description: "",
          email: "",
          instagramUsername: "",
          name: "",
          referenceImages: [],
        });
        setSelectedFiles([]);
        setStep(1);
      }, 4000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      setShowToast({
        show: true,
        message: "Failed to place the order.",
        type: "error",
      });
    }
  };

  const filteredCountryCodes = country_codes.country_code.filter((code) =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countryCodeOptions = country_codes.country_code.map((code) => ({
    value: code.dial_code,
    label: `${code.code} (${code.dial_code})`,
  }));

  const handleCountryCodeChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      countryCode: selectedOption.value,
    });
  };

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <div className="Orders padded-container">
          <Helmet>
            <title>The Arts Diary | Custom Orders - Get Personalized Artworks Crafted to Your Preference</title>
            <meta
              name="description"
              content="Order personalized artworks tailored to your preferences at The Arts Diary. Whether it's a portrait, a landscape, or a unique piece for a special occasion, we bring your ideas to life with exquisite craftsmanship and attention to detail."
            />
            <meta
              name="keywords"
              content="custom artwork, personalized portraits, art commission, bespoke art services, order custom art, portrait artist, custom gifts"
            />
            <meta property="og:title" content="The Arts Diary | Custom Orders - Get Personalized Artworks Crafted to Your Preference" />
            <meta property="og:type" content="website" />
            <meta
              property="og:description"
              content="Order personalized artworks tailored to your preferences at The Arts Diary. Whether it's a portrait, a landscape, or a unique piece for a special occasion, we bring your ideas to life with exquisite craftsmanship and attention to detail."
            />
            <meta
              property="og:image"
              content="https://theartsdiary.ayushkarn.in/assets/thumb_orders.jpg"
            />
            <meta
              property="og:url"
              content="https://theartsdiary.ayushkarn.in/orders"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="The Arts Diary | Custom Orders - Get Personalized Artworks Crafted to Your Preference" />
            <meta
              name="twitter:description"
              content="Order personalized artworks tailored to your preferences at The Arts Diary. Whether it's a portrait, a landscape, or a unique piece for a special occasion, we bring your ideas to life with exquisite craftsmanship and attention to detail."
            />
            <meta
              name="twitter:image"
              content="https://theartsdiary.ayushkarn.in/assets/thumb_orders.jpg"
            />
          </Helmet>
          <div className="recent-works">
            <div className="container-title" data-aos="fade-up">
              <p>Recent Comisssions</p>
            </div>

            <Slider {...settings}>
              {commissions.map((item, index) => (
                <div className="slider-item" key={index}>
                  <img
                    className="slider-image"
                    src={item.imageLink}
                    alt={item.title}
                  />
                  <div className="slider-text">
                    {/* <h3 className="slider-title">{item.title}</h3> */}
                    <div className="tags">
                      <Badge bg="secondary" className="mr-1">
                        {item?.category}
                      </Badge>
                      {item.size && item.size.length > 0 && (
                        <Badge bg="secondary">{item.size} size</Badge>
                      )}
                      {item.country && item.country.length > 0 && (
                        <Badge bg="secondary">{item?.country}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="order-place mt-5">
            <div className="container-title" data-aos="fade-up">
              <p>Order Your Custom Artwork or Portrait Today!</p>
            </div>
            <div className="container-description" data-aos="fade-up">
              <p>
                Transform your memories into a <b>timeless piece of art</b>. We
                will meticulously craft an{" "}
                <b>
                  exquisite artwork or portrait based on your preferences and
                  imagination
                </b>
                . Whether it's a cherished memory, a beloved pet, a special
                occasion, or a loved one's portrait, we will bring your visions
                to life
              </p>
            </div>
            <div className="container-content mt-4">
              <div className="highlights">
                <div className="row">
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" data-aos="fade-up">
                    <img
                      className="highlight-img"
                      src="/assets/personalized_artwork.jpeg"
                      alt="personalized artwork highlight"
                    />
                    <div className="highlight-desc mt-2">
                      Handcrafted to your Specifications
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" data-aos="fade-up">
                    <img
                      className="highlight-img"
                      src="/assets/quality_materials.jpeg"
                      alt="quality materials highlight"
                    />
                    <span className="highlight-desc mt-2">
                      Premium Quality and Craftsmanship
                    </span>
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" data-aos="fade-up">
                    <img
                      className="highlight-img"
                      src="/assets/easy_order.jpeg"
                      alt="easy ordering highlight"
                    />
                    <span className="highlight-desc mt-2">
                      Hassle-Free ordering process
                    </span>
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" data-aos="fade-up">
                    <img
                      className="highlight-img"
                      src="/assets/happy_customer.jpeg"
                      alt="happy constomer highlight"
                    />
                    <span className="highlight-desc mt-2">
                      Perfect gift to bring smiles
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-form-container mt-5">
                <div className="order-form-image" data-aos="fade-right">
                  <img
                    className="order-form-image-img"
                    src="/assets/wall_mockup_beautyWithin.jpg"
                    alt="Transform Your Space into Timless Art"
                  />
                </div>
                {/* Steps to Order */}
                <div className="order-process">
                  <div className="container-title pb-2" data-aos="fade-up">
                    <h3>Start Your Artistic Adventure</h3>
                  </div>
                  <div className="steps-container">
                    <div className="step" data-aos="fade-up">
                      <div className="step-circle">1</div>
                      <div className="step-text">
                        Share your vision with us.
                      </div>
                    </div>
                    <div className="step" data-aos="fade-up">
                      <div className="step-circle">2</div>
                      <div className="step-text">
                        We'll explore ideas together in a consultation.
                      </div>
                    </div>
                    <div className="step" data-aos="fade-up">
                      <div className="step-circle">3</div>
                      <div className="step-text">
                        We finalize the masterpiece and bring it to life.
                      </div>
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit} data-aos="fade-up">
                    {step === 1 && (
                      <>
                        <div className="order-type-selection">
                          <Form.Label>Select order type</Form.Label>
                          <div className="card-container">
                            {[
                              "B/W Portrait",
                              "Colour Portrait",
                              "Large Scale Work",
                              "Digital Illustration",
                              "Others",
                            ].map((type, index) => (
                              <Card
                                key={index}
                                className={`order-type-card ${
                                  formData.artworkType === type
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    artworkType: type,
                                  })
                                }
                              >
                                <Card.Body>{type}</Card.Body>
                              </Card>
                            ))}
                          </div>
                        </div>
                        <Form.Group controlId="description">
                          <Form.Label>Tell us your vision</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="imageUpload">
                          <Form.Label>
                            Reference Images (if available)
                          </Form.Label>
                          <Form.Control
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
                        </Form.Group>
                        <div className="container-buttons">
                          <Button
                            onClick={handleNextStep}
                            className="btn-container-action-inverted mt-4"
                            style={{
                              border: "2px solid var(--permanent-dark-color)",
                              color: "var(--permanent-dark-color)",
                              backgroundColor:"var(--dim-white-color)",
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="name">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <Form.Group controlId="email">
                              <Form.Label>Country Code</Form.Label>
                              <Select
                                options={countryCodeOptions}
                                onChange={handleCountryCodeChange}
                                value={countryCodeOptions.find(
                                  (option) =>
                                    option.value === formData.countryCode
                                )}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group controlId="email">
                              <Form.Label>Mobile Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder="123-4567-890"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={5}>
                            <Form.Group controlId="instagramUsername">
                              <Form.Label>Instagram Username</Form.Label>
                              <Form.Control
                                type="text"
                                name="instagramUsername"
                                value={formData.instagramUsername}
                                onChange={handleInputChange}
                                placeholder="@"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="order-type-selection">
                          <Form.Label>How shall we reach out</Form.Label>
                          <div className="communication-card-container">
                            {["Email", "Whatsapp", "Instagram"].map(
                              (type, index) => (
                                <Card
                                  key={index}
                                  className={`communication-type-card ${
                                    formData.communication === type
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      communication: type,
                                    })
                                  }
                                >
                                  <Card.Body>{type}</Card.Body>
                                </Card>
                              )
                            )}
                          </div>
                        </div>
                        <Form.Group controlId="description">
                          <Form.Label>Delivery Location</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="deliveryLocation"
                            value={formData.deliveryLocation}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <div className="container-buttons justify-content-between">
                          <Button
                            onClick={handlePreviousStep}
                            className="btn-container-action-inverted mt-4"
                            style={{
                              border: "2px solid var(--permanent-dark-color)",
                              color: "var(--permanent-dark-color)",
                              backgroundColor:"var(--dim-white-color)",
                            }}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="btn-container-action mt-4"
                          >
                            Submit
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="faq-section mt-5 padded-container" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" data-aos="fade-up">
                <div
                  className={`faq-question ${openFAQ === index ? "open" : ""}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </div>
                <div
                  className={`faq-answer ${openFAQ === index ? "open" : ""}`}
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <CustomToast
            show={showToast.show}
            message={showToast.message}
            onClose={() => setShowToast({ ...showToast, show: false })}
            type={showToast.type}
            delay={3000}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
