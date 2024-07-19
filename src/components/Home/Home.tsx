import React, { FC, useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Home.css";
import { Button } from "react-bootstrap";
import { myWork } from "../../interface/myWork";
//import Masonry, {ResponsiveMasonry  } from "react-responsive-masonry";
import Masonry from "react-layout-masonry";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonial } from "../../interface/testimonial";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Preloader from "../Preloader/Preloader";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [loading, setLoading] = useState(true);
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null); // Ref for the scrolling container

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
    document.title = "The Arts Diary";
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1200,
      once: true,
    });

    const fetchMyWorks = async () => {
      setLoading(true);
      const q = query(
        collection(db, "myWorks"),
        where("isFeatured", "==", true)
      );

      try {
        const querySnapshot = await getDocs(q);
        const worksData: myWork[] = [];
        querySnapshot.forEach((doc) => {
          console.log("Pushed: " + doc.data().title);
          worksData.push(doc.data() as myWork);
        });
        worksData.sort((a, b) => b.year - a.year);
        setMyWorks(worksData);
      } catch (error) {
        console.error("Failed to fetch my works: ", error);
      } finally {
        setLoading(false);
      }
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

  useEffect(() => {
    if (myWorks.length > 0 && scrollRef.current) {
      const panels = gsap.utils.toArray(".featured-artwork");
      const offsetWidth = scrollRef.current.offsetWidth; // Store this to avoid multiple accesses
      gsap.to(panels, {
        xPercent: -105 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          pin: true,
          scrub: 2,
          end: () => `+=${offsetWidth * (panels.length - 1) * 1.5}`,
          invalidateOnRefresh: true,
        },
      });
    }
  }, [myWorks]); // Ensuring that gsap initializes only if myWorks and scrollRef.current are ready

  const EmptyArrow = () => <div style={{ display: "none" }} />;

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
    prevArrow: <EmptyArrow />, // Hides the previous arrow
  };

  const getColumnCount = (count: number) => {
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    if (count === 4) return 2;
    if (count === 5) return 3;
    if (count === 6) return 3;
    if (count === 7) return 2;
    return 3;
  };

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <div className="Home">
          <Helmet>
            <title>
              The Arts Diary | Home - Discover Unique Artworks and Creative
              Inspirations
            </title>
            <meta
              name="description"
              content="Explore The Arts Diary to discover unique artworks that transform spaces and evoke emotions. Perfect for gifts, home decor, and personal collections, our diverse range of art pieces and custom portraits captures the essence of creativity and personal touch."
            />
            <meta
              name="keywords"
              content="unique artworks, home decoration, art for gifts, custom portraits, art inspirations, buy art online, art gallery"
            />
            <meta
              property="og:title"
              content="The Arts Diary | Home - Discover Unique Artworks and Creative Inspirations"
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:description"
              content="Explore The Arts Diary to discover unique artworks that transform spaces and evoke emotions. Perfect for gifts, home decor, and personal collections, our diverse range of art pieces and custom portraits captures the essence of creativity and personal touch."
            />
            <meta
              property="og:image"
              content="https://theartsdiary.ayushkarn.in/assets/thumb_home.jpg"
            />
            <meta
              property="og:url"
              content="https://theartsdiary.ayushkarn.in/"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="The Arts Diary | Home - Discover Unique Artworks and Creative Inspirations"
            />
            <meta
              name="twitter:description"
              content="Explore The Arts Diary to discover unique artworks that transform spaces and evoke emotions. Perfect for gifts, home decor, and personal collections, our diverse range of art pieces and custom portraits captures the essence of creativity and personal touch."
            />
            <meta
              name="twitter:image"
              content="https://theartsdiary.ayushkarn.in/assets/thumb_home.jpg"
            />
          </Helmet>
          <div className="header-image-container">
            <img
              src="assets/header.webp"
              alt="Header"
              className="header-image"
            />
            <div className="header-image-overlay"></div>
            <div className="header-content">
              <h1 className="header-title" data-aos="fade-up">
                Weaving Dreams into Artistic Realities
              </h1>
              <div className="cta-buttons">
                <Link to="/orders">
                  <Button className="btn-place-order me-2" data-aos="fade-up">
                    Place an order
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="btn-read-story" data-aos="fade-up">
                    Read my story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="featured-artworks-container padded-container"
          >
            <div className="featured-artwork intro-slide">
              <h1>Spotlight Wall</h1>
            </div>
            {myWorks.map((work, index) => (
              <div className="featured-artwork" key={index}>
                <div className="custom-card">
                  <div className="card-image">
                    <img src={work.imageLink} alt={work.title} />
                  </div>
                </div>
                <div className="artwork-details">
                  <h2>{work.title}</h2>
                  <p>
                    {work.category}
                    <br />
                    {work?.size && work.size.length > 0 && (
                      <>
                        {work.size} <br />
                      </>
                    )}
                    Artist - Ayush Karn <br />
                    {work.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="workshops padded-container">
            <div className="container-title" data-aos="fade-up">
              <p>Workshops</p>
            </div>
            <div className="container-images" data-aos="fade-up">
              <img
                className="workshop-img side-image"
                src="assets/workshop_1.jpg"
                alt="Virtual Sketch workshop"
                data-aos="fade-right"
              />
              <img
                className="workshop-img center-image"
                src="assets/workshop_2.jpg"
                alt="Live Sketch workshop"
                data-aos="fade-down"
              />
              <img
                className="workshop-img side-image"
                src="assets/workshop_3.jpg"
                alt="Student at live workshop"
                data-aos="fade-left"
              />
            </div>
            <div className="container-text workshop-text" data-aos="fade-up">
              <p>
                <strong>Step into the world of creativity</strong> in my art
                workshops, tailored for enthusiasts at all levels—
                <strong>from beginners </strong>
                learning the basics of sketching with graphite and charcoal{" "}
                <strong>to advanced artists </strong> perfecting hyper-realism.
                Whether you join
                <strong> virtually or in person</strong>, I'm here to guide you
                through every stroke on your journey to mastering the art you
                love.
              </p>
              <p>
                Interested in a personalized workshop or have specific
                requirements? <strong>Reach out to me</strong>, and let’s make
                art happen together!
              </p>
            </div>
            <div className="container-buttons mt-2 mb-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  className="btn-container-action-inverted me-2"
                >
                  Reach out
                </Button>
              </Link>
            </div>
          </div>

          <div className="services padded-container">
            <div className="container-title" data-aos="fade-up">
              <p>Services</p>
            </div>

            <div className="services-container">
              <div className="service-card" data-aos="fade-up">
                <div className="service-image">
                  <img
                    src="assets/frame_gift.jpeg"
                    alt="Custom Artwork Creation"
                  />
                </div>
                <div className="service-content">
                  <h4>Bespoke Art Tailored to Your Imagination</h4>
                  <ul>
                    <li>
                      Personalized portraits that capture essence and emotion
                    </li>
                    <li>Custom-designed artworks for unique home decor</li>
                    <li>Perfect for gifts, commemorating special occasions</li>
                  </ul>
                  <Link to="/orders">
                    <Button variant="primary" className="service-button">
                      Commission Your Vision
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="service-card" data-aos="fade-up">
                <div className="service-image">
                  <img src="assets/buddha_mural.jpeg" alt="Large Scale Works" />
                </div>
                <div className="service-content">
                  <h4>Transform Spaces with Captivating Murals</h4>
                  <ul>
                    <li>
                      Eye-catching murals for businesses, schools, and public
                      spaces
                    </li>
                    <li>
                      Enhance your community with large-scale visual
                      storytelling
                    </li>
                    <li>Durable, high-quality materials for lasting impact</li>
                  </ul>
                  <Link to="/orders">
                    <Button variant="primary" className="service-button">
                      Envision Bigger
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="service-card" data-aos="fade-up">
                <div className="service-image">
                  <img
                    src="assets/digital_illustration.jpeg"
                    alt="Digital Illustrations"
                  />
                </div>
                <div className="service-content">
                  <h4>Digital Artwork for Modern Needs</h4>
                  <ul>
                    <li>
                      Vibrant illustrations for digital media, books, and
                      advertising
                    </li>
                    <li>
                      Tailored graphics for websites, apps, and online content
                    </li>
                    <li>Quick turnaround to meet business timelines</li>
                  </ul>
                  <Link to="/orders">
                    <Button variant="primary" className="service-button">
                      Digitalize Your Vision
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials padded-container">
            <div className="container-title" data-aos="fade-up">
              <p>Hear from the clients</p>
            </div>
            <div className="testimonial-slider" data-aos="fade-up">
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
                        src={testimonial.imageLink}
                        alt="Client or Artwork"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
