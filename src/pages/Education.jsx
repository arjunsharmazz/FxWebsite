import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Education.module.css";
import Cards from "../animcomponents/Cards";
import Education2 from "../animcomponents/Education2";

const Education = () => {
  return (
    <div className={styles.page}>
      <Education2 />
     <Cards/>
    </div>
  );
};

export default Education;
