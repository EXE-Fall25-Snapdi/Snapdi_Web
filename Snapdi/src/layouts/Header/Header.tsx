import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Header.css";
// import Logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { path: "/", label: "Home", key: "home" },
    { path: "/snaper", label: "Snaper", key: "snaper" },
    { path: "/blog", label: "Blog", key: "blog" },
    { path: "/about", label: "About Us", key: "about" },
    { path: "/contact", label: "Contact", key: "contact" },
  ];

  return (
    <>
      {/* <Container className="nav-container"> */}
      <Navbar className="nav bg-[#D9D9D9] w-full h-16 md:h-20 flex justify-between px-4 md:px-10 py-2 font-sf-pro" expand="lg" fixed="top">
        <Nav className="nav-logo">
          {/* <Image src={Logo} alt="Logo" height={60} /> */}
          <p className="font-sf-pro font-extrabold text-black text-2xl md:text-[32px]">SNAPDI</p>
        </Nav>
        
        {/* Desktop Navigation */}
        <Nav className="nav-link-container font-sf-pro hidden lg:flex gap-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
              `w-full flex items-center font-sf-pro! font-bold text-black! gap-4 px-3 py-2 rounded-xl transition-all duration-300
              ${isActive ? "bg-[#34D399] rounded-xl px-4 py-2 text-white!" : ""}
              ${hoveredIndex === index ? " scale-120" : ""}
              ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-75" : ""}`
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="font-sf-pro font-bold text-lg block whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </Nav>
        
        {/* Desktop Buttons */}
        <Nav className="hidden lg:flex gap-2 items-center">
          <button className="bg-[#34D399] text-white px-4 py-2 rounded-3xl hover:scale-105 font-sf-pro font-bold text-xl transition-transform">
            Download now
          </button>
          <button className="bg-[#34D399] text-white px-6 py-2 rounded-3xl hover:scale-105 font-sf-pro font-bold text-xl transition-transform">
            Sign In
          </button>
        </Nav>
        
        {/* Mobile Menu Button */}
        <Nav className="lg:hidden">
          <button className="bg-[#34D399] text-white px-3 py-2 rounded-lg font-sf-pro font-bold text-sm">
            Menu
          </button>
        </Nav>
      </Navbar>
      {/* </Container> */}
    </>
  );
}

export default Header;
