import React, { FC, useState, useEffect } from "react";
import { Form, Button, Container, Toast, Image } from "react-bootstrap";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { myWorkFields } from "../../interface/myWorkFields";
import "./NewWork.css";

interface NewWorkProps {}

const NewWork: FC<NewWorkProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<myWorkFields>({
    title: "",
    description: "",
    year: 0,
    category: "",
    size: "",
    imageLink: "",
    thumbLink: "",
    instaPostLink: "",
    isFeatured: false,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && id) {
      const fetchWorkData = async () => {
        const workDocRef = doc(db, "myWorks", id);
        const workDocSnap = await getDoc(workDocRef);
        if (workDocSnap.exists()) {
          const workData = workDocSnap.data();
          setFormData({ ...formData, ...workData });
          setImagePreview(workData.imageLink || "");
        } else {
          console.error(`Work with ID ${id} not found.`);
        }
      };

      fetchWorkData();
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
    const storageRef = ref(storage, `images/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        await setDoc(doc(db, "myWorks", id), updatedFormData, { merge: true });
        setShowToast({
          show: true,
          message: "Work updated successfully.",
          type: "success",
        });
      } else {
        await addDoc(collection(db, "myWorks"), updatedFormData);
        setShowToast({
          show: true,
          message: "New work added successfully.",
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
    <div className="new-work">
      <Container>
        <h1>{isEditing ? "Edit Work" : "Add My Work"}</h1>
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
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
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
          <Form.Group controlId="thumbLink">
            <Form.Label>Thumbnail Link</Form.Label>
            <Form.Control
              type="text"
              name="thumbLink"
              value={formData.thumbLink}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="instaPostLink">
            <Form.Label>Instagram Post Link</Form.Label>
            <Form.Control
              type="text"
              name="instaPostLink"
              value={formData.instaPostLink}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Is Featured?</Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Yes"
                name="isFeatured"
                type="radio"
                id={`inline-radio-1`}
                value="true"
                checked={formData.isFeatured === true}
                onChange={() => setFormData({ ...formData, isFeatured: true })}
              />
              <Form.Check
                inline
                label="No"
                name="isFeatured"
                type="radio"
                id={`inline-radio-2`}
                value="false"
                checked={formData.isFeatured === false}
                onChange={() => setFormData({ ...formData, isFeatured: false })}
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Form>
        <Toast
          show={showToast.show}
          onClose={() => setShowToast({ ...showToast, show: false })}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            zIndex: 30,
            bottom: "20px",
            right: "20px",
            backgroundColor:
              showToast.type === "success"
                ? "rgba(0, 255, 0, 0.85)"
                : "rgba(255, 0, 0, 0.85)",
          }}
        >
          <Toast.Header
            style={{
              backgroundColor:
                showToast.type === "success" ? "#3b3b3b" : "#ff0000",
              color: "#fff",
            }}
          >
            <strong className="mr-auto">
              {showToast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body>{showToast.message}</Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default NewWork;
