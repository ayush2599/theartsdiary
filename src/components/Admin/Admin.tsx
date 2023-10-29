import React, { FC, useState } from "react";
import { Form, Button, Container, Toast } from "react-bootstrap";
import "./Admin.css";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import myWork from "../../interface/myWork";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AdminProps {}

// // Reading data
// async function fetchData() {
//   const querySnapshot = await getDocs(collection(db, 'myWorks'));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
//   });
//   pushData();
// }

// fetchData(); // Call the async function

// async function pushData() {
//   const docRef = await addDoc(collection(db, 'myWorks'), {
//       title: 'The Purr-fect Pari',
//       year: '2023',
//     });
//     console.log('Document written with ID: ', docRef.id);
// }

// // Writing data
// const docRef = await addDoc(collection(db, 'yourCollectionName'), {
//   field1: 'value1',
//   field2: 'value2',
// });
// console.log('Document written with ID: ', docRef.id);

const Admin: FC<AdminProps> = () => {
  const [formData, setFormData] = useState<myWork>({
    title: "",
    description: "",
    year: 0,
    category: "",
    size: "",
    imageLink: "",
    thumbLink: "",
    instaPostLink: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
    }
  };

  const uploadImageToFirebase = async (image: File) => {
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
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

    try {
      if (selectedImage) {
        const imageLink = await uploadImageToFirebase(selectedImage);
        if (imageLink) {
          const updatedFormData = { ...formData, imageLink };
          const docRef = await addDoc(collection(db, "myWorks"), updatedFormData);
          setShowToast(true);
          setFormData({
            title: "",
            description: "",
            year: 0,
            category: "",
            size: "",
            imageLink: "",
            thumbLink: "",
            instaPostLink: ""
          });
          setSelectedImage(null);
        } else {
          console.error("Image upload failed.");
          // Handle the error or show a toast message
        }
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Container>
      <h1>Add My Work</h1>
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
          <Form.Control
            type="file"
            id="custom-file"
            onChange={handleImageUpload}
          />
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

        {/* Add more Form.Group elements for other fields */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>My Work added successfully!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Admin;
