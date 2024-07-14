import { FC, useState, useEffect } from "react";
import { Tab, Tabs, Table, Button } from "react-bootstrap";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { myWork } from "../../interface/myWork";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import your custom CSS file for styling
import { FAQItem } from "../../interface/FAQItem";
import { OrderFormData } from "../../interface/OrderFormData";
import { testimonial } from "../../interface/testimonial";
import { commissionWork } from "../../interface/commissionWork";
import AdminLogin from "../AdminLogin/AdminLogin";
import { useAuthState } from 'react-firebase-hooks/auth';

interface AdminProps {}

const Admin: FC<AdminProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [orders, setOrders] = useState<OrderFormData[]>([]);
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);
  const [commissions, setCommissions] = useState<commissionWork[]>([]);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | The Arts Diary";
    if (user) {
    fetchMyWorks();
    fetchFaq();
    fetchOrders();
    fetchTestimonials();
    fetchCommissions();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <AdminLogin
        onLoginSuccess={() => console.log("Logged in successfully")}
      />
    );
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/home');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const fetchMyWorks = async () => {
    const querySnapshot = await getDocs(collection(db, "myWorks"));
    const worksData: myWork[] = [];
    querySnapshot.forEach((doc) => {
      const workData = doc.data() as myWork;
      workData.id = doc.id; // Add the document ID to the myWork object
      worksData.push(workData);
    });
    setMyWorks(worksData);
  };

  const fetchFaq = async () => {
    const querySnapshot = await getDocs(collection(db, "faqs"));
    const faqsData: FAQItem[] = [];
    querySnapshot.forEach((doc) => {
      const faqData = doc.data() as FAQItem;
      faqData.id = doc.id; // Add the document ID to the myWork object
      faqsData.push(faqData);
    });
    setFaqs(faqsData);
  };

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const ordersData: OrderFormData[] = [];
    querySnapshot.forEach((doc) => {
      const orderData = { ...(doc.data() as OrderFormData), id: doc.id }; // Cast and add id
      ordersData.push(orderData);
    });
    setOrders(ordersData);
  };

  const fetchTestimonials = async () => {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    const testimonialsData: testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const testimonialData = { ...(doc.data() as testimonial), id: doc.id }; // Cast and add id
      testimonialsData.push(testimonialData);
    });
    setTestimonials(testimonialsData);
  };
  const fetchCommissions = async () => {
    const querySnapshot = await getDocs(collection(db, "commissionWorks"));
    setCommissions(
      querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as commissionWork)
      )
    );
  };

   // Fetch works when the component mounts

  const handleDelete = async (documentId: string | null) => {
    try {
      if (documentId) {
        await deleteDoc(doc(db, "myWorks", documentId)); // Use the document ID as the unique identifier
        console.log(`Document with ID ${documentId} deleted successfully`);
        fetchMyWorks(); // Fetch works again to update the list
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (work: myWork) => {
    // Navigate to NewWork component with the work data for editing
    navigate(`/admin/newwork/${work.id}`);
  };

  const handleFaqDelete = async (documentId: string | null) => {
    try {
      if (documentId) {
        await deleteDoc(doc(db, "faqs", documentId)); // Use the document ID as the unique identifier
        console.log(`Document with ID ${documentId} deleted successfully`);
        fetchFaq(); // Fetch works again to update the list
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleFaqEdit = (faq: FAQItem) => {
    // Navigate to NewWork component with the work data for editing
    navigate(`/admin/newfaq/${faq.id}`);
  };

  const handleTestimonialEdit = (faq: testimonial) => {
    navigate(`/admin/newtestimonial/${faq.id}`);
  };

  const handleCommissionEdit = (faq: commissionWork) => {
    navigate(`/admin/newcomissionwork/${faq.id}`);
  };

  const handleOrderDelete = async (documentId: string | null) => {
    try {
      if (documentId) {
        await deleteDoc(doc(db, "orders", documentId)); // Use the document ID as the unique identifier
        console.log(`Document with ID ${documentId} deleted successfully`);
        fetchOrders(); // Fetch works again to update the list
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleTestimonialDelete = async (documentId: string | null) => {
    try {
      if (documentId) {
        await deleteDoc(doc(db, "testimonials", documentId)); // Use the document ID as the unique identifier
        console.log(`Document with ID ${documentId} deleted successfully`);
        fetchTestimonials(); // Fetch works again to update the list
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleCommissionDelete = async (documentId: string | null) => {
    try {
      if (documentId) {
        await deleteDoc(doc(db, "commissionWorks", documentId)); // Use the document ID as the unique identifier
        console.log(`Document with ID ${documentId} deleted successfully`);
        fetchCommissions(); // Fetch works again to update the list
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const viewOrderDetails = (order: OrderFormData) => {
    navigate(`/admin/orderdetails/${order.id}`);
  };

  return (
    <div className="admin-container">
      <Button onClick={handleLogout}>Logout</Button>

      <div className="admin">
        <Tabs defaultActiveKey="works">
          <Tab eventKey="works" title="Works" className="">
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Category</th>
                  <th>
                    Actions
                    <Button
                      className="add-new"
                      onClick={() => {
                        navigate("/admin/newwork");
                      }}
                    >
                      <FontAwesomeIcon icon="add" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {myWorks.map((work) => (
                  <tr key={work.id}>
                    <td>{work.title}</td>
                    <td>{work.year}</td>
                    <td>{work.category}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleEdit(work)}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDelete(work.id ? work.id : null); // Call the delete function with the document ID
                        }}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="comission" title="Commission Works">
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Review</th>
                  <th>
                    Actions
                    <Button
                      className="add-new"
                      onClick={() => {
                        navigate("/admin/newcomissionwork");
                      }}
                    >
                      <FontAwesomeIcon icon="add" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => (
                  <tr key={commission.id}>
                    <td>{commission.name}</td>
                    <td>{commission.title}</td>
                    <td>{commission.review}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleCommissionEdit(commission)}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleCommissionDelete(
                            commission.id ? commission.id : null
                          );
                        }}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="testimonials" title="Testimonials">
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Review</th>
                  <th>Country</th>
                  <th>Review Date</th>
                  <th>
                    Actions
                    <Button
                      className="add-new"
                      onClick={() => {
                        navigate("/admin/newtestimonial");
                      }}
                    >
                      <FontAwesomeIcon icon="add" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>{testimonial.name}</td>
                    <td>{testimonial.review}</td>
                    <td>{testimonial.country}</td>
                    <td>{testimonial.reviewDate}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleTestimonialEdit(testimonial)}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleTestimonialDelete(
                            testimonial.id ? testimonial.id : null
                          );
                        }}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="faqs" title="FAQs">
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>
                    Actions
                    <Button
                      className="add-new"
                      onClick={() => {
                        navigate("/admin/newfaq");
                      }}
                    >
                      <FontAwesomeIcon icon="add" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq.id}>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleFaqEdit(faq)}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleFaqDelete(faq.id ? faq.id : null); // Call the delete function with the document ID
                        }}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Artwork Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.artworkType}</td>
                    <td>
                      <Button
                        onClick={() => viewOrderDetails(order)}
                        variant="primary"
                      >
                        <FontAwesomeIcon icon="eye" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleOrderDelete(order.id ? order.id : null); // Call the delete function with the document ID
                        }}
                        className="action-button"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="blogs" title="Blogs">
            <h2>Content for Tab 2</h2>
            <p>This is the content for Tab 2.</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
