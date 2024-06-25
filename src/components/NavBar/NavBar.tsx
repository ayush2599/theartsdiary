import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'
import { Link } from 'react-router-dom';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {

  const toggleNavbar = () => {
    const navbar = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbar && navbarToggler) {
      if (navbar.classList.contains('show')) {
        navbarToggler.classList.add('collapsed');
        navbar.classList.remove('show');
        console.log('removed');
      } else {
        navbarToggler.classList.remove('collapsed');
        navbar.classList.add('show');
        console.log('added');
      }
    } else {
      console.error("Navbar element not found.");
    }
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
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="ml-auto">
          
            <Link to="/" className='nav-link' role='button' onClick={toggleNavbar}>HOME</Link>
          
          
            <Link to="/works" className='nav-link' role='button' onClick={toggleNavbar}>WORKS</Link>
          
          
            <Link to="/orders" className='nav-link' role='button' onClick={toggleNavbar}>ORDERS</Link>
          
          
            {/* <Link to="/blogs" className='nav-link' role='button' onClick={toggleNavbar}>BLOGS</Link> */}
          
          
            <Link to="/about" className='nav-link' role='button' onClick={toggleNavbar}>ABOUT</Link>
          
          
            <Link to="/contact" className='nav-link' role='button' onClick={toggleNavbar}>CONTACT</Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
