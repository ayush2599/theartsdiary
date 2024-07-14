import React, { FC, useEffect } from "react";
import "./About.css";
import { Helmet } from "react-helmet-async";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AboutProps {}

const About: FC<AboutProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1200,
      once: true, 
    });
  }, []);

  return(
  <div className="about padded-container">
    <Helmet>
        <title>The Arts Diary | About Us - Learn About Our Artistic Journey and Vision</title>
        <meta name="description" content="Learn about The Arts Diary and our passion for art. From our artistic philosophy to our commitment to quality and creativity, find out what drives us to create art that resonates and inspires." />
        <meta name="keywords" content="about The Arts Diary, our artistic journey, our vision, art philosophy, commitment to art quality, creative art studio, artist info" />
        <meta property="og:title" content="The Arts Diary | About Us - Learn About Our Artistic Journey and Vision" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Learn about The Arts Diary and our passion for art. From our artistic philosophy to our commitment to quality and creativity, find out what drives us to create art that resonates and inspires." />
        <meta property="og:image" content="https://theartsdiary.ayushkarn.in/assets/thumb_about.jpg" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Arts Diary | About Us - Learn About Our Artistic Journey and Vision" />
        <meta name="twitter:description" content="Learn about The Arts Diary and our passion for art. From our artistic philosophy to our commitment to quality and creativity, find out what drives us to create art that resonates and inspires." />
        <meta name="twitter:image" content="https://theartsdiary.ayushkarn.in/assets/thumb_about.jpg" />
      </Helmet>
    <div className="container-title" data-aos="fade-up">
      <p>Behind the Canvas</p>
    </div>

    <div className="about-container">
      <div className="container-image about-container-image" data-aos="fade-up">
        <img src="assets/about_profile.jpg" alt="Ayush at work" />
      </div>

      <div className="container-text about-container-text">
        <h3 data-aos="fade-up">Early Beginnings</h3>
        <p data-aos="fade-up">
          Hello! I'm <strong>Ayush</strong>, the creative force behind <strong>The Arts Diary</strong>, a brand dedicated to bringing the
          beauty of realistic and hyper-realistic graphite and charcoal works,
          as well as digital illustrations, to life. My journey with art started
          as a curious kid, and over the past eight years, it's grown into a
          professional pursuit that has been my full-time focus for the last
          four years.
        </p>

        <p data-aos="fade-up">
          Art has always been my escape and my joy. As I grew up, I found myself
          increasingly fascinated by the artistic expressions I encountered on
          social media. Mimicking the styles of artists I admired, I honed
          various techniques, gradually developing my own unique approach to
          art.
        </p>

        <h3 data-aos="fade-up">University and The Fine Arts Club</h3>
        <p data-aos="fade-up">
          My university years were a pivotal time for me. Joining <strong>The Fine Arts
          Club VIT</strong>, I connected with a vibrant community of like-minded
          artists. Together, we explored diverse forms of art, from sketches and
          paintings to 3D installations and murals, contributing to campus
          festivals and participating in competitions nationwide. As the lead
          charcoal artist and eventually the club head, I had the privilege of
          guiding many of these creative endeavors.
        </p>

        <h3 data-aos="fade-up">Professional Pursuits</h3>
        <p data-aos="fade-up">
          Now, through The Arts Diary, I've had the pleasure of working with
          clients both within my country and internationally. My portfolio
          includes <strong>customized artworks for home decor, gifts, large murals,
          digital designs, brand illustrations, and more</strong>. Each piece is crafted
          with meticulous detail and a personal touch, tailored to meet modern
          needs.
        </p>

        <blockquote data-aos="fade-right">
          "Ayush's approach to art is not just professional but deeply personal, making every piece tell a story."
        </blockquote>

        <h3 data-aos="fade-up">Sharing My Passion</h3>
        <p data-aos="fade-up">
          Beyond creating art, I also love sharing my skills and knowledge
          through <strong>workshops</strong>. I offer <strong>sketching classes for artists of all
          levels</strong>, from beginners to advanced, both virtually and in-person. To
          date, I've conducted multiple workshops, helping budding artists
          refine their techniques and discover their unique artistic voice.
        </p>

        <h3 data-aos="fade-up">A Fun Fact</h3>
        <p data-aos="fade-up">
          I'm deeply intrigued by portraits. Walking down the street, I often find myself observing people's facial structures,
          imagining how they'd look as a portrait work. This curiosity fuels my
          passion and inspires my art every day.
        </p>

        <p className="mt-5" data-aos="fade-up">
          Thank you for visiting The Arts Diary and taking the time to learn
          about my artistic journey. I look forward to the opportunity to create
          something special for you! 🎨✨
        </p>
      </div>
    </div>
  </div>
);
};

export default About;
