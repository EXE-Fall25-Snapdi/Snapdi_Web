import { Container } from "react-bootstrap";
import Button from "../../components/Button/Button";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Container className="not-found">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-text">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button variant="primary" content="Back to Home" href={"/"} />
    </Container>
  );
};

export default NotFound;
