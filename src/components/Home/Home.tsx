import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./Home.css";
import { Button } from "react-bootstrap";
import { myWork, testimonial } from "../../interface/myWork";
//import Masonry, {ResponsiveMasonry  } from "react-responsive-masonry";
import Masonry from "react-layout-masonry";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);

  const calculateGap = (width: number): number => {
    if (width < 768) return 20; // Smaller screens
    return 50; // Larger screens
  };

  const calculateTestimonySliderCount = (width: number): number => {
    if (width < 768) return 1; // Smaller screens
    return 2; // Larger screens
  };

  const [gapSize, setGapSize] = useState<number>(
    calculateGap(window.innerWidth)
  );

  const [testimonySliderCount, setTestimonySliderCount] = useState<number>(
    calculateTestimonySliderCount(window.innerWidth)
  );

  useEffect(() => {
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

    fetchMyWorks();

    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const testimonialData: testimonial[] = [];
      querySnapshot.forEach((doc) => {
        testimonialData.push(doc.data() as testimonial);
      });
      setTestimonials(testimonialData);
    };

    fetchTestimonials();

    const handleResize = () => {
      setGapSize(calculateGap(window.innerWidth));
      setTestimonySliderCount(calculateTestimonySliderCount(window.innerWidth));
    };

    // Set the initial gap based on the current window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const EmptyArrow = () => <div style={{ display: 'none' }} />;

  const testimonialSliderSettings = {
    dots: true, // Enable navigation dots
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: testimonySliderCount, // Show one slide at a time
    slidesToScroll: testimonySliderCount, // Scroll one slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 3000, // Change every 3 seconds
    pauseOnHover: true, // Pause autoplay on hover
    adaptiveHeight: true, // Adjust height based on content
    nextArrow: <EmptyArrow />, // Hides the next arrow
    prevArrow: <EmptyArrow />  // Hides the previous arrow
  };

  return (
    <div className="Home">
      <div className="header-image-container">
        <img src="assets/header.jpg" alt="Header" className="header-image" />
        <div className="header-image-overlay"></div>
        <div className="header-content">
          <h1 className="header-title">
            Weaving Dreams into Artistic Realities
          </h1>
          <div className="cta-buttons">
            <Button className="btn-place-order me-2">Place an order</Button>
            <Button className="btn-read-story">Read my story</Button>
          </div>
        </div>
      </div>
      <div className="featured-artworks padded-container">
        <div className="container-title">
          <p>Featured Artworks</p>
        </div>
        <div className="container">
          <Masonry columns={{ 400: 2, 768: 2, 1024: 3 }} gap={gapSize}>
            {myWorks.map((work) => (
              <div key={work.title}>
                <Card className="custom-card">
                  <div className="card-image">
                    <Card.Img
                      variant="top"
                      src={work.imageLink}
                      alt={work.title}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </Masonry>
          <div className="container-buttons mt-4 mb-4">
            <Button variant="primary" className="btn-container-action me-2">
              See more works
            </Button>
          </div>
        </div>
      </div>

      <div className="workshops padded-container">
        <div className="container-title">
          <p>Workshops</p>
        </div>
        <div className="container-images">
          <img
            className="workshop-img"
            src="https://picsum.photos/200/300"
          ></img>
          <img
            className="workshop-img"
            src="https://picsum.photos/200/300"
          ></img>
          <img
            className="workshop-img"
            src="https://picsum.photos/200/300"
          ></img>
        </div>
        <div className="container-text">
          <p>
            Step into the world of creativity in my art workshops, tailored for
            enthusiasts at all levels—from beginners learning the basics of
            sketching with graphite and charcoal to advanced artists perfecting
            hyper-realism. Whether you join virtually or in person, I'm here to
            guide you through every stroke on your journey to mastering the art
            you love.
            <br />
            <br />
            Interested in a personalized workshop or have specific requirements?
            Reach out to me, and let’s make art happen together!
          </p>
        </div>
        <div className="container-buttons mt-2 mb-4">
          <Button
            variant="primary"
            className="btn-container-action-inverted me-2"
          >
            Reach out
          </Button>
        </div>
      </div>

      <div className="services padded-container">
        <div className="container-title">
          <p>Services</p>
        </div>
      </div>

      <div className="testimonials padded-container">
        <div className="container-title">
          <p>Hear from the clients</p>
        </div>
        <div className="testimonial-slider">
          <Slider {...testimonialSliderSettings}>
            {testimonials.map((testimonial) => (
              <div className="testimonial-container" key={testimonial.id}>
                <div className="testimonial-text">
                  <p>"{testimonial.review}"</p>
                  <span className="client-details">
                    - {testimonial.name}, {testimonial.city},{" "}
                    {testimonial.country}
                  </span>
                </div>
                <div className="testimonial-image">
                  <img
                    src="/assets/happy_customer.jpeg"
                    alt="Client or Artwork"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
