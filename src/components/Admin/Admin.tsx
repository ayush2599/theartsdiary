import React, { FC, useState, useEffect } from "react";
import { Tab, Tabs, Table, Button } from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { myWork } from "../../interface/myWork";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import your custom CSS file for styling

interface AdminProps {}

const Admin: FC<AdminProps> = () => {
  const [myWorks, setMyWorks] = useState<myWork[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    document.title = "Admin | The Arts Diary";
    fetchMyWorks();
  }, []); // Fetch works when the component mounts

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

  return (
    <div className="admin-container">
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
          <Tab eventKey="blogs" title="Blogs">
            <h2>Content for Tab 2</h2>
            <p>This is the content for Tab 2.</p>
          </Tab>
          <Tab eventKey="testimonials" title="Testimonials">
            <h2>Content for Tab 3</h2>
            <p>This is the content for Tab 3.</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
