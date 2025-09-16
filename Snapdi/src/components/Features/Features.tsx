import Section from "../Section/Section";
import "./Features.css";
import Image from "../../assets/images/app-sample.png";
import { Container } from "react-bootstrap";

function Features() {
  return (
    <Container id="features" className="feature-container">
      <Section
        title="Ours Features"
        content="Welcome to our amazing platform! Discover new possibilities and connect with others in a whole new way."
        imageSrc={Image}
        imageAlt="Home Avatar"
      />
    </Container>
  );
}

export default Features;
