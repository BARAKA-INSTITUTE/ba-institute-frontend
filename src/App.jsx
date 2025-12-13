import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import Home from "@pages/Home";
import About from "@pages/About";
import Services from "@pages/Services";
import Contact from "@pages/Contact";
import { useState, useEffect } from "react";
import Footer from "@components/Footer";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect((e) => {
    document.body.className = isDarkMode ? "dark" : "light";
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
