import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const MainLayout: React.FC = () => {

  return (
    <>
      <div className="app">
        <Header />
        <div className="flex-1">
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
