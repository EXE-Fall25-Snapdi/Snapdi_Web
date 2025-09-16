import { Col, Container, Image } from "react-bootstrap";
import Button from "../Button/Button";
import "./Section.css";

interface SectionProps {
  title?: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  button?: {
    content: string;
    href: string;
    variant: string;
  };
}

function Section({ title, content, imageSrc, imageAlt, button }: SectionProps) {
  return (
    <Container fluid className="section-container">
      <Col lg={2} sm={2} md={2} className="section-col-content" data-aos="fade-left">
        <div className="sec-content-wrapper">
          {title && <h2 className="sec-content-title">{title}</h2>}
          <div className="sec-content-text">{content}</div>
          <div className="sec-button-wrapper">
            {button && <Button content={button.content} href={button.href} variant={button.variant} />}
          </div>
        </div>
      </Col>
      <Col lg={8} sm={8} md={8} className="section-col-image" data-aos="fade-right">
        <Image className="sec-image" src={imageSrc} alt={imageAlt} data-aos="zoom-in" />
      </Col>
    </Container>
  );
}

export default Section;
