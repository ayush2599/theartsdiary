import React, { FC, useEffect, useState } from "react";
import { Container, Button, ListGroup, Col, Row, Image } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import CustomToast from "../CustomToast/CustomToast";
import { OrderFormData } from "../../interface/OrderFormData";

interface OrderDetailsProps {}

const OrderDetails: FC<OrderDetailsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      if (id) {
        const orderDocRef = doc(db, "orders", id);
        const orderDocSnap = await getDoc(orderDocRef);
        if (orderDocSnap.exists()) {
          setOrderData(orderDocSnap.data() as OrderFormData);
        } else {
          console.error(`Order with ID ${id} not found.`);
          setShowToast({
            show: true,
            message: "Order not found.",
            type: "error",
          });
        }
      }
    };

    fetchOrderData();
  }, [id]);

  return (
    <Container className="mt-5">
      <h1>Order Details</h1>
      {orderData ? (
        <>
          <ListGroup>
            <ListGroup.Item>
              <strong>Name:</strong> {orderData.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {orderData.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Artwork Type:</strong> {orderData.artworkType}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {orderData.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Country Code:</strong> {orderData.countryCode}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Contact Number:</strong> {orderData.contactNumber}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Instagram Username:</strong> {orderData.instagramUsername}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Communication:</strong> {orderData.communication}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Delivery Location:</strong> {orderData.deliveryLocation}
            </ListGroup.Item>
            {/* Add more fields as needed */}
          </ListGroup>
          {orderData.referenceImages &&
            orderData.referenceImages.length > 0 && (
              <div>
                <h4>Reference Images</h4>
                <Row xs={1} md={2} lg={3} className="g-3">
                  {orderData.referenceImages.map((img, index) => (
                    <Col key={index}>
                      <Image
                        src={img}
                        alt={`Reference Image ${index + 1}`}
                        className="img-fluid"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
        </>
      ) : (
        <p>Loading order details...</p>
      )}
      <Button className="mt-3" onClick={() => navigate(-1)}>
        Back to Admin
      </Button>
      <CustomToast
        show={showToast.show}
        message={showToast.message}
        onClose={() => setShowToast({ ...showToast, show: false })}
        type={showToast.type}
      />
    </Container>
  );
};

export default OrderDetails;
