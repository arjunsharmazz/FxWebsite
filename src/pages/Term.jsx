import React from "react";
import styles from "./css/Term.module.css";
import { motion } from "framer-motion";
import Education2 from "../animcomponents/Education2";
import sections from "../dummydata/Terms&cdata";
export default function Terms() {


 return (
  <>
    <Education2 name ="Terms & Conditions"/>
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Welcome to <span className={styles.brand}>PayKuberFX</span>, your
          trusted platform for Forex and CFD trading. Please read these Terms &
          Conditions carefully, as they explain your rights, obligations, and
          risks while using our services.
        </motion.p>

        <div className={styles.sections}>
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              className={styles.section}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2>{sec.title}</h2>
              <p>{sec.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
