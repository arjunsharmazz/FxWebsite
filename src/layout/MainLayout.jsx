import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";
import Navbar from "../componenets/Navbar";
import StarsEffect from "../componenets/StarsEffect";
import Footer from "../componenets/Footer";

const MainLayout = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
      bg.style.backgroundPosition = `${x}% ${y}%`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Fixed Background */}
      <div ref={bgRef} className={styles.homeContainer}>
        <StarsEffect />
      </div>

      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Pages */}
      <div className={styles.pageContent}>
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default MainLayout;
