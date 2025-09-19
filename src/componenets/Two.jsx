import React from "react";
import styles from "./css/Two.module.css";
import twoImage from "../assets/two1.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Two() {
  const navigate = useNavigate();
  const imageVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const contentVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Left Image */}
        <motion.div
          className={styles.imageWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={imageVariant} 
        >
          <img src={twoImage} alt="Celebrating 2 Years" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={contentVariant}
        >
          <h2>
            Celebrating <span>2 Years</span> of Excellence
          </h2>
          <p>
            From humble beginnings to empowering thousands of traders worldwide — 
            our journey continues with innovation, trust, and smarter trading
            experiences.
          </p>

          <div className={styles.actions}>
            <motion.button 
              className={styles.primary}
              whileHover={{ scale: 1.05 }}
               onClick={() => navigate("/signup")}
              whileTap={{ scale: 0.95 }}
            >
             Start Trading
            </motion.button>
            
            <motion.button 
              className={styles.secondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
