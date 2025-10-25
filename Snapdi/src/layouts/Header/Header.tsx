import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import Logo from "../../assets/images/logo-withBG.svg";
import { NavLink } from "react-router-dom";
import MainSidebar from "../MainSidebar/MainSidebar";
import Icons from "../../components/icon";

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
      <Navbar className="absolute top-[75px] z-9999 w-full justify-between items-center px-[100px] font-sf-pro flex" expand="lg" fixed="top">
        <Nav className="nav-logo">
          <img src={Logo} alt="Logo" className="w-[70px] h-[60px] hidden lg:flex" />
          {/* <p className="font-sf-pro font-extrabold text-black text-2xl md:text-[32px]">SNAPDI</p> */}
          <p className="font-sf-pro font-extrabold text-black text-2xl md:text-4xl ml-9 hidden lg:flex">SNAPDI</p>
        </Nav>

        {/* Desktop Navigation */}
        <Nav className="font-sf-pro hidden lg:flex h-12 rounded-full bg-none border-1 border-[#12C6A3]">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-6 font-semibold
              ${isActive ? " !text-white bg-[#12C6A3] rounded-4xl" : "!text-black"}
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
        <Nav.Link
          className="bg-gradient-to-r from-[#00EA80] to-[#00C9A7] h-12 text-white! -py-2 rounded-3xl hover:scale-105 font-sf-pro font-bold text-xl transition-transform hidden lg:flex items-center justify-center"
          href="/signup"
        >
          Đăng ký
          <span className="text-lg font-semibold text-white"><Icons.ArrowUpRight className="w-8 h-8 font-extrabold!" /></span>
        </Nav.Link>

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
      </Navbar >

      {/* Mobile Sidebar */}
      < MainSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)
        }
      />
      {/* </Container> */}
    </>
  );
}

export default Header;
