import { Container } from "react-bootstrap";
import "./MainPage.css";
import Home from "../../components/Home/Home";
import Features from "../../components/Features/Features";

function MainPage() {
  return (
    <Container className="main-page-content">
      <Home />
      <Features />
    </Container>
  );
}

export default MainPage;
