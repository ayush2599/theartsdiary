import React, { FC, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'
import { Link } from 'react-router-dom';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar expand="lg" fixed="top">
      <Navbar.Brand href="#home" className="d-flex align-contents-center">
        <div className="logo">
          <img
                  alt=""
                  src="/assets/logo.png"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
        </div>
        <div className="title my-auto pl-3">
            The Arts Diary
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          
            <Link to="/" className='nav-link' role='button'>HOME</Link>
          
          
            <Link to="/works" className='nav-link' role='button'>WORKS</Link>
          
          
            <Link to="/orders" className='nav-link' role='button'>ORDERS</Link>
          
          
            <Link to="/blogs" className='nav-link' role='button'>BLOGS</Link>
          
          
            <Link to="/about" className='nav-link' role='button'>ABOUT</Link>
          
          
            <Link to="/contact" className='nav-link' role='button'>CONTACT</Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
