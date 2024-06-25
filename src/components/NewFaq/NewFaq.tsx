import React, { FC, useEffect, useState } from 'react';
import './NewFaq.css';
import { Form, Button, Container } from "react-bootstrap";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import CustomToast from '../CustomToast/CustomToast';
import { FAQItemFields } from '../../interface/FAQItem';

interface NewFaqProps {}

const NewFaq: FC<NewFaqProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<FAQItemFields>({
    question:"",
    answer:""
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: 'success' as 'success' | 'error'
  });

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && id) {
      const fetchFaqData = async () => {
        const faqDocRef = doc(db, "faqs", id);
        const faqDocSnap = await getDoc(faqDocRef);
        if (faqDocSnap.exists()) {
          const faqData = faqDocSnap.data();
          setFormData({ ...formData, ...faqData });
        } else {
          console.error(`FAQ with ID ${id} not found.`);
        }
      };

      fetchFaqData();
    }
  }, [id, isEditing]);

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
      if (isEditing && id) {
        await setDoc(doc(db, "faqs", id), formData, { merge: true });
        setShowToast({
          show: true,
          message: "FAQ updated successfully.",
          type: "success",
        });
      } else {
        await addDoc(collection(db, "faqs"), formData);
        setShowToast({
          show: true,
          message: "New faq added successfully.",
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
        <h1>{isEditing ? "Edit FAQ" : "Add New FAQ"}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Question">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="Answer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
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


export default NewFaq;
