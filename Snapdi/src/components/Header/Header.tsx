
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import "./Header.css";
// import Logo from "../assets/images/logoup.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

    const handleNavigation = (path: string) => {
      if (location.pathname !== path) {
        setIsLeaving(true);
        setTimeout(() => {
          setIsLeaving(false); // Reset the state after navigation
          navigate(path);
        }, 500); // Wait for slide-up animation to complete
      }
    };

  return (
    <Container className={`nav-container ${isLeaving ? "leave" : ""}`}>
      <Navbar className="nav">
        <Navbar.Brand onClick={() => handleNavigation("/")} className="logo">
          {/* <Image src={Logo} alt="Logo" height={60} /> */}
        </Navbar.Brand>
        <Nav className="nav-link-container">
          <Nav.Link
            onClick={() => handleNavigation("/")}
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavigation("/contact")}
            className={`nav-link contact ${location.pathname === "/contact" ? "active" : ""}`}
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}

export default Header;
