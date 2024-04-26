import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./Home.css";
import { Button } from "react-bootstrap";
import { myWork } from "../../interface/myWork";
//import Masonry, {ResponsiveMasonry  } from "react-responsive-masonry";
import Masonry from "react-layout-masonry";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);

  const calculateGap = (width: number): number => {
    if (width < 768) return 20;  // Smaller screens
    return 50;                  // Larger screens
  };

  const [gapSize, setGapSize] = useState<number>(calculateGap(window.innerWidth));
  

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

    const handleResize = () => {
      setGapSize(calculateGap(window.innerWidth));
    };
  
    // Set the initial gap based on the current window size
    handleResize();
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

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
            <Button className="btn-place-order me-2">
              Place an order
            </Button>
            <Button className="btn-read-story">
              Read my story
            </Button>
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
      </div>

    </div>
  );
};

export default Home;
