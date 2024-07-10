import { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal"; // Import the Modal component
import Button from "react-bootstrap/Button"; // Import the Button component
import "./Works.css";
import { myWork } from "../../interface/myWork";
//import Masonry, {ResponsiveMasonry  } from "react-responsive-masonry";
import Masonry from "react-layout-masonry";
import { Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

interface WorksProps {}

const Works: FC<WorksProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedWork, setSelectedWork] = useState<myWork | null>(null); // State for selected card data

  useEffect(() => {
    document.title = "Works | The Arts Diary";
    window.scrollTo(0, 0);
    
    const fetchMyWorks = async () => {
      const querySnapshot = await getDocs(collection(db, "myWorks"));
      const worksData: myWork[] = [];
      querySnapshot.forEach((doc) => {
        worksData.push(doc.data() as myWork);
      });
      worksData.sort((a, b) => b.year - a.year);
      setMyWorks(worksData);
    };

    fetchMyWorks();
  }, []);

  // Click event handler to show the modal and set the selected card data
  const handleCardClick = (work: myWork) => {
    setSelectedWork(work);
    setShowModal(true);
  };

  function addLineBreaks(description: any) {
    if (description) {
      // Define a regular expression to match <br> tags.
      const lineBreakRegex = /<br\s*\/?>/i;

      // Use the regex to split the description into an array of parts.
      const parts: string[] = description.split(lineBreakRegex);

      // Function to handle nested HTML tags, specifically <b> and </b>
      const parseHtml = (text: string) => {
        const htmlRegex = /(<\/?b>)/i;
        const htmlParts = text.split(htmlRegex).filter((part) => part !== "");

        return htmlParts.map((part, index) => {
          if (part.match(/<b>/i)) {
            return <b key={`b-open-${index}`}>{/* Opening <b> tag */}</b>;
          } else if (part.match(/<\/b>/i)) {
            return <b key={`b-close-${index}`}>{/* Closing <b> tag */}</b>;
          } else {
            return part;
          }
        });
      };

      // Map over the parts and wrap them in <p> tags, handling nested <b> tags.
      const descriptionWithBreaks = parts.map((part, index) => (
        <p key={index}>{parseHtml(part)}</p>
      ));

      return descriptionWithBreaks;
    } else {
      // Handle the case where description is undefined or empty.
      return null; // or return a default value as needed
    }
  }

  return (
    <Masonry columns={{ 400: 2, 768: 2, 1024: 3 }} gap={20} className="works">
      <Helmet>
        <title>The Arts Diary | Works</title>
        <meta name="description" content="Explore our diverse collection of artworks." />
        <meta name="keywords" content="art, gallery, paintings, sculptures, custom art" />
        <meta property="og:title" content="The Arts Diary | Works" />
        <meta property="og:description" content="Explore our diverse collection of artworks." />
        <meta property="og:image" content="https://theartsdiary.ayushkarn.in/assets/thumb_works.jpg" />
        <meta property="og:url" content="https://theartsdiary.ayushkarn.in/works" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Arts Diary | Works" />
        <meta name="twitter:description" content="Explore our diverse collection of artworks." />
        <meta name="twitter:image" content="https://theartsdiary.ayushkarn.in/assets/thumb_works.jpg" />
      </Helmet>
      {myWorks.map((work) => (
        <div key={work.title}>
          <Card
            className="work-custom-card"
            onClick={() => handleCardClick(work)}
          >
            <div className="work-card-image">
              <Card.Img variant="top" src={work.imageLink} alt={work.title} />
              <div className="work-image-overlay">
                <div className="work-overlay-text">{work.title}</div>
              </div>
            </div>
          </Card>
        </div>
      ))}
      

      {/* Modal to display card details */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        closeButton
      >
        <Modal.Body>
          <Row>
            <Col md={7}>
              <img
                src={selectedWork?.imageLink}
                alt={selectedWork?.title}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={5}>
              <div className="workDetails">
                <h2>{selectedWork?.title}</h2>
                <div className="workDetails-description">
                  <p>{addLineBreaks(selectedWork?.description)}</p>
                </div>
                <div className="tags">
                  <Badge bg="secondary" className="mr-1">
                    Year: {selectedWork?.year}
                  </Badge>
                  <Badge bg="secondary" className="mr-1">
                    Category: {selectedWork?.category}
                  </Badge>
                  {selectedWork?.size && selectedWork?.size.length > 0 && (
                    <Badge bg="secondary">Size: {selectedWork?.size}</Badge>
                  )}
                </div>
                {selectedWork?.instaPostLink &&
                  selectedWork?.instaPostLink.length > 0 && (
                    <div className="workDetails-instaLink">
                      <a
                        href={selectedWork?.instaPostLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram"></i>
                        View on Instagram
                      </a>
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Masonry>
  );
};

export default Works;
