import { Col, Container, Row, Image } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <Container className="home-container">
      <Col className="home-col-image" data-aos="fade-right">
        {/* <Image height={"600px"} width={"500px"} src={Layze} alt="Avatar" data-aos="zoom-in" /> */}
      </Col>

      <Col className="home-col-content" data-aos="fade-left">
        <Row className="home-heading" data-aos="fade-up">
          <p>Hi, It's </p>
          <p style={{ marginLeft: "10px", color: "blueviolet" }}>Layze</p>
        </Row>
        <Row className="home-subheading" data-aos="fade-up" data-aos-delay="200">
          <p style={{ marginRight: "7px" }}>I'm a</p>
          <p style={{ marginRight: "7px", color: "blueviolet" }}>Web Developer</p>
          <p style={{ marginRight: "7px" }}>on my way to become</p>
          <p style={{ color: "blueviolet" }}>Full Stack Developer</p>
        </Row>
        <Row className="home-content" data-aos="fade-up" data-aos-delay="400">
          <p>This is my portfolio website where I showcase my information, skills, projects and experiences.</p>
          <p>
            I'm currently learning new technologies and building projects to improve my skills. I'm open to new
            opportunities and would love to work with you. Feel free to contact me.
          </p>
        </Row>
        <Row className="home-icons" data-aos="zoom-in" data-aos-delay="600">
          <a href="https://www.facebook.com/vohoangcongtri" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={35} />
          </a>
          <a href="https://www.instagram.com/vh.congtri/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={35} />
          </a>
          <a href="https://www.linkedin.com/in/hoang-cong-tri-vo-a6b7b3346/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={35} />
          </a>
          <a href="https://github.com/CongTri282" target="_blank" rel="noopener noreferrer">
            <FaGithub size={35} />
          </a>
          <a href="mailto:layzegot@example.com">
            <FaEnvelope size={35} />
          </a>
        </Row>
        <Button variant="primary" content="Contact Me" href="/contact" data-aos="fade-up" data-aos-delay="800" />
      </Col>
    </Container>
  );
}

export default Home;
