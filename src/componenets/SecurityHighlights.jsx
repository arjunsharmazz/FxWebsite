import React from "react";
import { ShieldCheck, Lock, Server, KeyRound } from "lucide-react";
import styles from "./css/SecurityHighlights.module.css";
import { motion } from "framer-motion";

const features = [
  { icon: <KeyRound size={26} />, title: "2FA Enabled", desc: "Extra layer of account protection" },
  { icon: <ShieldCheck size={26} />, title: "Cold Wallets", desc: "Secure storage for digital assets" },
  { icon: <Server size={26} />, title: "DDOS Protection", desc: "Advanced infrastructure shielding" },
  { icon: <Lock size={26} />, title: "Bank-level Encryption", desc: "Enterprise-grade data security" },
];

const SecurityHighlights = () => {
  const parentVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.2 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Security Highlights
        </motion.h2>
        
        <motion.p 
          className={styles.subheading}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Your safety is our top priority. Multi-layered protection for peace of mind.
        </motion.p>

        <motion.div 
          className={styles.grid}
          variants={parentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              className={styles.card}
              variants={cardVariant}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div 
                className={styles.icon} 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {f.icon}
              </motion.div>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityHighlights;
