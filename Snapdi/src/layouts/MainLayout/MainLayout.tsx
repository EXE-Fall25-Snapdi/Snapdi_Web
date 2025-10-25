import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const MainLayout: React.FC = () => {

  return (
    <>
      <div className="app relative">
        <Header />
        <div className="flex-1 w-full overflow-hidden relative">
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
