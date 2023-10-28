import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import './Works.css';
import myWork from "../../interface/myWork";
//import Masonry, {ResponsiveMasonry  } from "react-responsive-masonry";
import Masonry from 'react-layout-masonry';


interface WorksProps {}

const Works: FC<WorksProps> = () => {
  
  const [myWorks, setMyWorks] = useState<myWork[]>([]);

  useEffect(() => {
    const fetchMyWorks = async () => {
      const querySnapshot = await getDocs(collection(db, "myWorks"));
      const worksData: myWork[] = [];
      querySnapshot.forEach((doc) => {
        console.log("Pushed: "+doc.data().title);
        worksData.push(doc.data() as myWork);
      });
      worksData.sort((a, b) => b.year - a.year);
      setMyWorks(worksData);
    };

    fetchMyWorks();
  }, []);

  return (

    <Masonry columns={{ 640: 1, 768: 2, 1024: 3}} gap={30}
    >
      {myWorks.map((work) => (
        <div key={work.title}>
        <Card className="card">
          <Card.Img variant="top" src={work.imageLink} alt={work.title} />
          <Card.Body>
            <Card.Title>{work.title}</Card.Title>
            <Card.Text>{work.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      ))}
    </Masonry>
  );
};

export default Works;
