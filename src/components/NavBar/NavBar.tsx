import React, { FC, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    setIsNavCollapsed(true);
  }, [location]);
  
  return (
    <Navbar expand="lg" fixed="top" expanded={!isNavCollapsed}>
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavCollapse} 
        className={isNavCollapsed ? 'collapsed' : ''}/>
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="ml-auto">
          
            <Link to="/" className='nav-link' role='button' onClick={handleNavCollapse}>HOME</Link>
          
          
            <Link to="/works" className='nav-link' role='button' onClick={handleNavCollapse}>WORKS</Link>
          
          
            <Link to="/orders" className='nav-link' role='button' onClick={handleNavCollapse}>ORDERS</Link>
          
          
            {/* <Link to="/blogs" className='nav-link' role='button' onClick={handleNavCollapse}>BLOGS</Link> */}
          
          
            <Link to="/about" className='nav-link' role='button' onClick={handleNavCollapse}>ABOUT</Link>
          
          
            <Link to="/contact" className='nav-link' role='button' onClick={handleNavCollapse}>CONTACT</Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
