import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// Component Imports
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Blogs from "./components/Blogs/Blogs";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Admin from "./components/Admin/Admin";
import Works from "./components/Works/Works";
import NewWork from "./components/NewWork/NewWork";
import NewFaq from "./components/NewFaq/NewFaq";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import NewTestimonial from "./components/NewTestimonial/NewTestimonial";
import NewComissionWork from "./components/NewComissionWork/NewComissionWork";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <NavBar />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/admin/login" element={<AdminLoginWrapper />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/newwork" element={<NewWork />} />
                  <Route path="/admin/newwork/:id" element={<NewWork />} />
                  <Route path="/admin/newcomissionwork" element={<NewComissionWork />} />
                  <Route path="/admin/newcomissionwork/:id" element={<NewComissionWork />} />
                  <Route path="/admin/newtestimonial" element={<NewTestimonial />} />
                  <Route path="/admin/newtestimonial/:id" element={<NewTestimonial />} />
                  <Route path="/admin/newfaq" element={<NewFaq />} />
                  <Route path="/admin/newfaq/:id" element={<NewFaq />} />
                  <Route path="/admin/orderdetails/:id" element={<OrderDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <div className="footer-container">
                <Footer />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme(); // Correct use of useTheme within context
  return (
    <button className="theme-switcher" onClick={toggleTheme}>
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
    </button>
  );
}

function AdminLoginWrapper() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Login successful");
    navigate("/admin");
  };

  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
}

export default App;
