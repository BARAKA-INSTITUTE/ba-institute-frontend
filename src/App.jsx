import "./App.css";
import Navbar from "@components/Navbar";
import Home from "@pages/Home"; 
import Footer from "@components/Footer";
import { useState, useEffect } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Home />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}

export default App;
