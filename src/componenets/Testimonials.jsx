import React from "react";
import styles from "./css/Testimonials.module.css";

const Testimonials = () => {
  const data = [
    {
      feedback: "Best trading platform I’ve ever used. Super smooth & reliable!",
      name: "Rahul Mehta",
      role: "Crypto Investor",
    },  
    {
      feedback: "Real-time insights helped me take better trading decisions.",
      name: "Sophia Sharma",
      role: "Stock Trader",
    },
    {
      feedback: "Secure, fast, and all-in-one platform. Highly recommended!",
      name: "Arjun Patel",
      role: "Forex Enthusiast",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          What Our <span className={styles.highlight}>Traders Say</span>
        </h2>

        <div className={styles.grid}>
          {data.map((item, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.feedback}>"{item.feedback}"</p>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.role}>{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
