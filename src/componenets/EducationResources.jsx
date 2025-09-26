import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./css/EducationResources.module.css";
import img1 from "../assets/sopiha.png";
import img2 from "../assets/arjun.png";
import Education2 from "../animcomponents/Education2";

const data = [
  {
    feedback: "Best trading platform I’ve ever used. Super smooth & reliable!",
    name: "Rahul Mehta",
    role: "Crypto Investor",
    img: img1,
  },
  {
    feedback: "Real-time insights helped me take better trading decisions.",
    name: "Krthik Sharma",
    role: "Stock Trader",
    img: img2,
  },
  {
    feedback: "Secure, fast, and all-in-one platform. Highly recommended!",
    name: "Arjun Patel",
    role: "Forex Enthusiast",
    img: img1,
  },
  {
    feedback:
      "Loved the clean UI and smooth navigation. Made trading stress-free!",
    name: "Kabir Kapoor",
    role: "Day Trader",
    img: img2,
  },
  {
    feedback: "Excellent customer support and fast execution. Can’t ask for more!",
    name: "Aryan Verma",
    role: "Long-term Investor",
    img: img1,
  },
  {
    feedback: "It feels futuristic — fast, reliable, and professional. Kudos!",
    name: "Rohit Malhotra",
    role: "Scalper",
    img: img2,
  },
];

export default function EducationResources() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.carouselSection}>
      {/* <h2 className={styles.heading}>What Our Traders Say</h2> */}
      <Education2 name="Testimonials"/>

      <div className={styles.carouselContainer}>
        {/*Mobile*/}
        {isMobile ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.card}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className={styles.avatarWrapper}>
                <motion.img
                  src={data[activeIndex].img}
                  alt={data[activeIndex].name}
                  className={styles.avatar}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <p className={styles.feedback}>"{data[activeIndex].feedback}"</p>
              <h3 className={styles.name}>{data[activeIndex].name}</h3>
              <span className={styles.role}>{data[activeIndex].role}</span>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Desktop 
          data.map((item, i) => {
            const offset = i - activeIndex;
            return (
              <motion.div
                key={i}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: Math.abs(offset) > 1 ? 0 : 1,
                  scale: i === activeIndex ? 1 : 0.75,
                  x: offset * 360,
                  zIndex: i === activeIndex ? 10 : 0,
                  rotateY: offset * -15,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <div className={styles.avatarWrapper}>
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className={styles.avatar}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <p className={styles.feedback}>"{item.feedback}"</p>
                <h3 className={styles.name}>{item.name}</h3>
                <span className={styles.role}>{item.role}</span>
              </motion.div>
            );
          })
        )}
      </div>

      {/*Nav */}
      <div className={styles.navWrapper}>
        <motion.button
          onClick={prevSlide}
          className={styles.navBtn}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className={styles.navBtn}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {data.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`${styles.dot} ${
              i === activeIndex ? styles.activeDot : ""
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}
