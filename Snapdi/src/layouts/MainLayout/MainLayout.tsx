import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const MainLayout: React.FC = () => {

  return (
    <>
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
