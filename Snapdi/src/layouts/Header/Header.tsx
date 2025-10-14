import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import Logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import MainSidebar from "../MainSidebar/MainSidebar";

function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Trang chủ", key: "home" },
    // { path: "/snaper", label: "Snaper", key: "snaper" },
    { path: "/blog", label: "Blog", key: "blog" },
    { path: "/about", label: "Về chúng tôi", key: "about" },
    { path: "/contact", label: "Liên hệ", key: "contact" },
  ];

  return (
    <>
      <Navbar className="w-full h-28 md:h-28 flex justify-between px-4 md:pl-24 md:pr-14 py-12 font-sf-pro" expand="lg" fixed="top">
        <Nav className="nav-logo">
          <img src={Logo} alt="Logo" />
          {/* <p className="font-sf-pro font-extrabold text-black text-2xl md:text-[32px]">SNAPDI</p> */}
        </Nav>

        {/* Desktop Navigation */}
        <Nav className="font-sf-pro hidden lg:flex h-12 px-8 rounded-full bg-[#126951]">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-4 
              ${isActive ? " !text-[#98BF33]" : "!text-white"}
              ${hoveredIndex === index ? " scale-110" : ""}
              ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-75" : ""}`
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="font-sf-pro text-lg block whitespace-nowrap ">{item.label}</span>
            </NavLink>
          ))}
        </Nav>

        {/* Desktop Buttons */}
        {/* <Nav className="hidden lg:flex gap-2 items-center">
          <button className="bg-[#34D399] text-white px-4 py-2 rounded-3xl hover:scale-105 font-sf-pro font-bold text-xl transition-transform">
            Tải ngay
          </button>
          <a
            className="bg-[#34D399] text-white! px-6 py-2 rounded-3xl hover:scale-105 font-sf-pro font-bold text-xl transition-transform flex items-center justify-center"
            href="/login"
          >
            Đăng nhập
          </a>
        </Nav> */}

        {/* Mobile Menu Button */}
        <Nav className="lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#34D399] text-black px-3 py-2 rounded-lg font-sf-pro font-bold text-sm hover:scale-105 transition-transform"
          >
            {/* Simple hamburger menu icon */}
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
            </div>
          </button>
        </Nav>
      </Navbar>

      {/* Mobile Sidebar */}
      <MainSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* </Container> */}
    </>
  );
}

export default Header;
