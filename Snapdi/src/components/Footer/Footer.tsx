import { Container } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <Container className="footer-container">
      <p>&copy; {new Date().getFullYear()} Layze. All rights reserved.</p>
    </Container>
  );
}

export default Footer;
