import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";
import Navbar from "../componenets/Navbar";
import StarsEffect from "../componenets/StarsEffect";
import Footer from "../componenets/Footer";
import img from "../assets/back.png";

const MainLayout = () => {
  const bgRef = useRef(null);
  return (
    <>

      <div ref={bgRef} className={styles.homeContainer}>
        <StarsEffect />
      </div>


      <Navbar />


      <div className={styles.pageContent}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
