import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LearnMore from "../../components/LearnMore/Learnmore";


const MainLayout: React.FC = () => {

  return (
    <>
      <div className="app">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <div className="lg:w-10/12 w-full mx-auto">
        <LearnMore />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
