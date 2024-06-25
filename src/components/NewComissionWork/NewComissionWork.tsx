import React, { FC, useState, useEffect } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

import CustomToast from "../CustomToast/CustomToast";
import { commissionWork } from "../../interface/commissionWork";
import { commissionWorkFields } from "../../interface/commissionWorkFields";

interface NewCommissionWorkProps {}

const NewCommissionWork: FC<NewCommissionWorkProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [formData, setFormData] = useState<commissionWorkFields>({
    title: "",
    review: "",
    year: new Date().getFullYear(),
    category: "",
    size: "",
    imageLink: "",
    name: "",
    city: "",
    country: "",
    stars: 0,
    isFeatured: false,
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
      const fetchCommissionWorkData = async () => {
        const workDocRef = doc(db, "commissionWorks", id);
        const workDocSnap = await getDoc(workDocRef);
        if (workDocSnap.exists()) {
          const workData = workDocSnap.data() as commissionWork;
          setFormData({ ...formData, ...workData });
          setImagePreview(workData.imageLink || "");
        } else {
          console.error(`Commission work with ID ${id} not found.`);
        }
      };

      fetchCommissionWorkData();
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
    const storageRef = ref(storage, `commissionWorkImages/${image.name}`);
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    } else if (!isEditing) {
      setShowToast({
        show: true,
        message: "Image is required for new entries.",
        type: "error",
      });
      return;
    }

    const updatedFormData = { ...formData, imageLink };
    try {
      if (isEditing && id) {
        await setDoc(doc(db, "commissionWorks", id), updatedFormData, {
          merge: true,
        });
        setShowToast({
          show: true,
          message: "Commission work updated successfully.",
          type: "success",
        });
      } else {
        await addDoc(collection(db, "commissionWorks"), updatedFormData);
        setShowToast({
          show: true,
          message: "New commission work added successfully.",
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
    <div className="new-commission-work">
      <Container>
        <h1>
          {isEditing ? "Edit Commission Work" : "Add New Commission Work"}
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
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
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </Form.Group>
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
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
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
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="isFeatured">
            <Form.Label>Is Featured?</Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
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

export default NewCommissionWork;
