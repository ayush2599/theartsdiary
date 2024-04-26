import React, { FC, useState, useEffect } from "react";
import { Form, Button, Container, Toast } from "react-bootstrap";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { myWorkFields } from "../../interface/myWorkFields";

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
  });

  const [showToast, setShowToast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const isEditing = !!id; // Check if an ID is present in the URL

  useEffect(() => {
    if (isEditing && id) {
      // Fetch the work data based on the ID and set the form data
      const fetchWorkData = async () => {
        // Replace 'your-collection-name' with your actual Firebase collection name
        const workDocRef = doc(db, 'myWorks', id);

        try {
          const workDocSnap = await getDoc(workDocRef);

          console.log(workDocSnap);
          if (workDocSnap.exists()) {
            const workData = workDocSnap.data();

            if (workData) {
              // Populate the form fields with the fetched data
              setFormData({
                title: workData.title || "",
                description: workData.description || "",
                year: workData.year || 0,
                category: workData.category || "",
                size: workData.size || "",
                imageLink: workData.imageLink || "",
                thumbLink: workData.thumbLink || "",
                instaPostLink: workData.instaPostLink || "",
              });
            }
            console.log(formData);
          } else {
            console.error(`Work with ID ${id} not found.`);
            // Handle the case where the work with the given ID is not found
          }
        } catch (error) {
          console.error("Error fetching work data: ", error);
          // Handle any errors that occur during the fetch
        }
      };

      fetchWorkData();
    }
  }, [isEditing, id]);

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

          if (isEditing && id) {
            // Handle edit operation (update the existing work)
            const workDocRef =  doc(db, "myWorks", id); // Replace 'your-collection-name' with your actual collection name

            try {
              await setDoc(workDocRef, updatedFormData, { merge: true }); // Use setDoc to update the existing document
              console.log(`Work with ID ${id} updated successfully`);
            } catch (error) {
              console.error(`Error updating work with ID ${id}:`, error);
              // Handle the error or show a toast message
            }
          } else {
            // Handle add operation (add a new work)
            const docRef = await addDoc(
              collection(db, "myWorks"),
              updatedFormData
            );
          }

          setShowToast(true);
          setFormData({
            title: "",
            description: "",
            year: 0,
            category: "",
            size: "",
            imageLink: "",
            thumbLink: "",
            instaPostLink: "",
          });
          setSelectedImage(null);
          setTimeout(() => {
            navigate("/admin");
          }, 5000);
        } else {
          console.error("Image upload failed.");
          // Handle the error or show a toast message
        }
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  return (
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
          <Form.Control
            type="file"
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

        <Button variant="primary" type="submit">
          {isEditing ? "Update" : "Submit"}
        </Button>
      </Form>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
      >
        <Toast.Header style={{ backgroundColor: '#3b3b3b', color:'#fff'}}>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          My Work {isEditing ? "updated" : "added"} successfully!
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default NewWork;
