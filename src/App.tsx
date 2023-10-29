import React from 'react';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Blogs from './components/Blogs/Blogs';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import Masonry from "react-responsive-masonry";
import Works from './components/Works/Works';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <div className="footer-container">
          <Footer/>
        </div>
      </div>

    </div>
    </Router>
  );
}

export default App;
