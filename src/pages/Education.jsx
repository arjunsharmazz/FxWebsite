import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Education.module.css";
import Cards from "../animcomponents/Cards";
import Education2 from "../animcomponents/Education2";
import YouTubeCards from "../animcomponents/YouTubeCards";
import CTABanner from "../componenets/CTABanner";

const Education = () => {
  return (
    <div className={styles.page}>
      <Education2 />
     <Cards/>
     <YouTubeCards/>
     <CTABanner/>
     
    </div>
  );
};

export default Education;
