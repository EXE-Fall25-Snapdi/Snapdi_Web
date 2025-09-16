import Section from "../Section/Section";
import "./Home.css";
import Image from "../../assets/images/app-sample.png";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container id="home" className="home-container">
      <Section
        title="Welcome to Snapdi"
        content="Welcome to our amazing platform! Discover new possibilities and connect with others in a whole new way."
        imageSrc={Image}
        imageAlt="Home Avatar"
        button={{
          content: "Get Started",
          href: "/get-started",
          variant: "primary",
        }}
      />
    </Container>
  );
}

export default Home;
