import React from "react";
import styles from "./css/HowItWorks.module.css";

const HowItWorks = () => {
  const steps = [
    {
      icon: "📝",
      title: "Create Account",
      desc: "Sign up in minutes with secure KYC verification.",
    },
    {
      icon: "💳",
      title: "Add Funds",
      desc: "Deposit via bank transfer, UPI, or crypto wallet.",
    },
    {
      icon: "📈",
      title: "Start Trading",
      desc: "Buy & sell crypto, stocks, or forex instantly.",
    },
    {
      icon: "📲",
      title: "Track Anywhere",
      desc: "Monitor your portfolio from PaykuberFx website.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          How <span className={styles.highlight}>It Works</span>
        </h2>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
