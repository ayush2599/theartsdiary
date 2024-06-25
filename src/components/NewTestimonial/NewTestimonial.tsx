import React, { FC, useState, useEffect } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { testimonial } from "../../interface/testimonial";
import CustomToast from "../CustomToast/CustomToast";
import "./NewTestimonial.css";
import { testimonialFields } from "../../interface/testimonialFields";

interface NewTestimonialProps {}

const NewTestimonial: FC<NewTestimonialProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<testimonialFields>({
    name: "",
    review: "",
    reviewDate: (new Date()).toISOString(),
    stars: 0,
    subHead: "",
    country: "",
    city: "",
    address: "",
    isImageReview: false,
    imageLink: "",
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && id) {
      const fetchTestData = async () => {
        const testDocRef = doc(db, "testimonials", id);
        const testDocSnap = await getDoc(testDocRef);
        if (testDocSnap.exists()) {
          const testData = testDocSnap.data() as testimonial;
          setFormData({
            ...testData
          }); 
          setImagePreview(testData.imageLink || "");
        } else {
          console.error(`Testimonial with ID ${id} not found.`);
        }
      };

      fetchTestData();
    }
  }, [id, isEditing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const uploadImageToFirebase = async (image: File) => {
    const storageRef = ref(storage, `testimonialImages/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageLink = formData.imageLink;

    if (selectedImage) {
      const uploadResult = await uploadImageToFirebase(selectedImage);
      if (uploadResult) {
        imageLink = uploadResult;
      } else {
        setShowToast({
          show: true,
          message: "Failed to upload image.",
          type: "error",
        });
        return;
      }
    } else if (!isEditing && !imagePreview) {
      setShowToast({
        show: true,
        message: "Image is required for new entries.",
        type: "error",
      });
      return;
    }

    const updatedFormData = {
      ...formData,
      imageLink,
      reviewDate: formData.reviewDate,
    };
    try {
      if (isEditing && id) {
        await setDoc(doc(db, "testimonials", id), updatedFormData, {
          merge: true,
        });
        setShowToast({
          show: true,
          message: "Testimonial updated successfully.",
          type: "success",
        });
      } else {
        await addDoc(collection(db, "testimonials"), updatedFormData);
        setShowToast({
          show: true,
          message: "New testimonial added successfully.",
          type: "success",
        });
      }

      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error("Error processing the form:", error);
      setShowToast({
        show: true,
        message: "Error processing the form.",
        type: "error",
      });
    }
  };

  return (
    <div className="new-testimonial">
      <Container>
        <h1>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="reviewDate">
            <Form.Label>Review Date</Form.Label>
            <Form.Control
              type="date"
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="stars">
            <Form.Label>Stars</Form.Label>
            <Form.Control
              type="number"
              name="stars"
              value={formData.stars}
              min="1"
              max="5"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="subHead">
            <Form.Label>SubHead</Form.Label>
            <Form.Control
              type="text"
              name="subHead"
              value={formData.subHead}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="isImageReview">
            <Form.Check
              type="checkbox"
              label="Is Image Review?"
              name="isImageReview"
              checked={formData.isImageReview}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
            {imagePreview ? (
              <Image
                thumbnail
                className="image-preview"
                src={imagePreview}
                alt="Preview"
              />
            ) : (
              <p>No image selected</p>
            )}
          </Form.Group>
          <Form.Group controlId="imageLink">
            <Form.Label>Image Link (if already uploaded)</Form.Label>
            <Form.Control
              type="text"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Form>
        <CustomToast
          show={showToast.show}
          message={showToast.message}
          onClose={() => setShowToast({ ...showToast, show: false })}
          type={showToast.type}
          delay={3000}
        />
      </Container>
    </div>
  );
};

export default NewTestimonial;
