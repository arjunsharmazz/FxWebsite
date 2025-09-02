import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMobileAlt, FaCheck, FaIdCard } from "react-icons/fa";
import "./css/StepsSection.css";

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function StepsSection() {
  const steps = [
    { icon: <FaPhoneAlt className="icon green" />, title: "Step 1", text: "Click 'Register' and enter email and password" },
    { icon: <FaEnvelope className="icon red" />, title: "Step 2", text: "Enter the verification code sent to your email" },
    { icon: <FaMobileAlt className="icon blue" />, title: "Step 3", text: "Verify your phone number with OTP" },
    { icon: <FaCheck className="icon yellow" />, title: "Step 4", text: "Yay! You can now start trading!" },
    { icon: <FaIdCard className="icon purple" />, title: "Step 5", text: "Complete KYC to trade higher amounts" },
  ];

  return (
    <section className="steps-section">
      <div className="steps-container">
        {/* Left Steps */}
        <div className="steps-list">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="step-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={stepVariants}
            >
              {step.icon}
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Section */}
        <motion.div
          className="steps-right"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="subtext">JOIN EASILY WITH JUST</p>
          <h2 className="heading">
            5 <span className="highlight">Steps</span>
          </h2>
          <motion.button
            className="btn-register"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
