import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
// import Contact from "./pages/Contact/Contact";
// import NotFound from "./pages/NotFound/NotFound";

function App() {
  return <Router>
    <div className="header">
      <Header />
    </div>
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
    <div className="footer">
      <Footer />
    </div>
  </Router>;
}

export default App;
