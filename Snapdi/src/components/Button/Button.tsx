import { Button as BootstrapButton } from "react-bootstrap";
import "./Button.css";

interface ButtonProps {
  content: string;
  href: string;
  variant: string;
}

function Button({ content, href, variant }: ButtonProps) {
  return (
    <BootstrapButton className={`button-${variant}`} href={href}>
      {content}
    </BootstrapButton>
  );
}

export default Button;
