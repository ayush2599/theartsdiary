import React, { FC, useEffect, useState } from "react";
import "./Orders.css";
import { myWork } from "../../interface/myWork";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);

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
      console.log(myWorks);
    };

    fetchMyWorks();
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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
          {/* <CustomPrevArrow />
          <CustomNextArrow /> */}
        </Slider>
      </div>
    </div>
  );
};

export default Orders;
