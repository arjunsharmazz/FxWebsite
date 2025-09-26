import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/FaqSection.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is trading free or paid?",
      answer:
        "Creating an account and using our demo platform is free. For live trading, minimal spreads or commissions may apply depending on the asset.",
    },
    {
      question: "How secure is my money?",
      answer:
        "We use bank-grade encryption, segregated accounts, and 2FA authentication to ensure that your funds and data remain protected.",
    },
    {
      question: "What is the minimum deposit to start trading?",
      answer:
        "You can start trading with as little as $10, depending on your account type and funding method.",
    },
    {
      question: "Do you offer a demo account?",
      answer:
        "Yes, we provide a free demo account where you can practice trading with virtual funds before switching to a live account.",
    },
    {
      question: "What trading platforms do you support?",
      answer:
        "We support leading platforms like MetaTrader 4 (MT4) and our own web-based trading terminal.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, there are no hidden fees. We maintain full transparency — only spreads, swaps, or commissions may apply depending on the instrument.",
    },
    {
      question: "What leverage do you offer?",
      answer:
        "We offer flexible leverage options up to 1:500, depending on your region and regulatory requirements.",
    },
    {
      question: "Can I withdraw my funds anytime?",
      answer:
        "Yes, you can withdraw your funds at any time. Withdrawal requests are typically processed within 24 hours.",
    },
    {
      question: "Do you provide educational resources?",
      answer:
        "Yes, we offer free tutorials, webinars, and market analysis to help traders of all levels improve their skills.",
    },
  ];

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
