import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Education.module.css";
import Cards from "../animcomponents/Cards";
import Education2 from "../animcomponents/Education2";
import YouTubeCards from "../animcomponents/YouTubeCards";

const Education = () => {
  return (
    <div className={styles.page}>
      <Education2 />
     <Cards/>
     <YouTubeCards/>
     
    </div>
  );
};

export default Education;
