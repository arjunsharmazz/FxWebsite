// src/pages/Term.jsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Term.module.css";

export default function Term() {
  const sections = [
    {
      title: "1. Eligibility",
      text: "You must be at least 18 years old to open an account and trade with PayKuberFX. By registering, you confirm that you meet this requirement and have full legal capacity to enter into a binding agreement.",
    },
    {
      title: "2. Risk Disclosure",
      text: "Forex, CFDs, and commodities trading involve a high level of risk. Leverage can work both for and against you. You may lose some or all of your invested capital. PayKuberFX does not guarantee profits.",
    },
    {
      title: "3. Account Registration",
      text: "To access our services, you must register and provide accurate, complete, and verifiable information. KYC verification may be required to comply with AML regulations.",
    },
    {
      title: "4. Trading Platform",
      text: "PayKuberFX provides a secure platform for Forex, Commodities, Indices, and Cryptocurrencies. While we strive for uninterrupted access, we are not responsible for delays or downtime.",
    },
    {
      title: "5. Deposits & Withdrawals",
      text: "All deposits and withdrawals must be made through verified accounts. Processing times may vary depending on your payment provider. Fees may apply.",
    },
    {
      title: "6. Compliance & AML Policy",
      text: "PayKuberFX follows strict Anti-Money Laundering and Counter Financing of Terrorism policies. All suspicious activity will be reported to relevant authorities.",
    },
    {
      title: "7. Limitation of Liability",
      text: "PayKuberFX will not be liable for any direct or indirect financial losses arising from your trading activity. All decisions are your sole responsibility.",
    },
    {
      title: "8. Amendments",
      text: "We reserve the right to modify these Terms & Conditions at any time without prior notice. Continued use of our services means acceptance of updated terms.",
    },
    {
      title: "9. Contact Us",
      text: "For any queries regarding these Terms & Conditions, please email us at support@paykuberfx.com",
    },
  ];

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.glassCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Terms & Conditions
        </motion.h1>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to <span className={styles.brand}>PayKuberFX</span>. By using
          our website and trading platform, you agree to the following Terms
          and Conditions. Please read carefully before proceeding.
        </motion.p>

        <div className={styles.sectionWrapper}>
          {sections.map((sec, index) => (
            <motion.div
              key={index}
              className={styles.section}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px #ff3b3b55" }}
            >
              <h2>{sec.title}</h2>
              <p>{sec.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
