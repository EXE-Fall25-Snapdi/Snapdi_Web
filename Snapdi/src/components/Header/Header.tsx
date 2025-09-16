import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import "./Header.css";
import Logo from "../../assets/images/logo.png";

function Header() {
  const [activeSection, setActiveSection] = useState("home");

  // Handle smooth scrolling to sections
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(sectionId);
      }, 300);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "download", "about"];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container className="nav-container">
      <Navbar className="nav">
        <Nav onClick={() => handleScrollToSection("home")} className="nav-logo">
          <Image src={Logo} alt="Logo" height={60} />
        </Nav>
        <Nav className="nav-link-container">
          <Nav.Link
            onClick={() => handleScrollToSection("home")}
            className={`nav-link home ${activeSection === "home" ? "active" : ""}`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => handleScrollToSection("features")}
            className={`nav-link features ${activeSection === "features" ? "active" : ""}`}
          >
            Features
          </Nav.Link>
          <Nav.Link
            onClick={() => handleScrollToSection("download")}
            className={`nav-link download ${activeSection === "download" ? "active" : ""}`}
          >
            Download
          </Nav.Link>
          <Nav.Link
            onClick={() => handleScrollToSection("about")}
            className={`nav-link about ${activeSection === "about" ? "active" : ""}`}
          >
            About Us
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}

export default Header;
