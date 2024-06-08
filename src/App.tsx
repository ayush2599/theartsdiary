import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Blogs from "./components/Blogs/Blogs";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import "./App.css";
import "./styles/color_variable.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
// import Masonry from "react-responsive-masonry";
import Works from "./components/Works/Works";
import NewWork from "./components/NewWork/NewWork";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "./ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <NavBar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/newwork" element={<NewWork />} />
              <Route path="/admin/newwork/:id" element={<NewWork />} />
            </Routes>
            <div className="footer-container">
              <Footer />
              {/* <ThemeSwitcher /> */}
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme(); // Correct use of useTheme within context
  return (
    <div>
      <h1>Home Page</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default App;
