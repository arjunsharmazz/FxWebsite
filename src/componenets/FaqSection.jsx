import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/FaqSection.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import faqs from "../dummydata/AllFaq.js"
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className={styles.faqSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`${styles.faqItem} ${
              openIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.question}>
              {faq.question}
              {openIndex === index ? (
                <FaChevronUp className={styles.icon} />
              ) : (
                <FaChevronDown className={styles.icon} />
              )}
            </div>

            {/* Expand/Collapse animation */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div>{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FaqSection;
