import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/TeamCarousel.module.css";

const teamMembers = [
  { name: "Emily Kim", role: "Founder" },
  { name: "Michael Steward", role: "Creative Director" },
  { name: "Emma Rodriguez", role: "Lead Developer" },
  { name: "Julia Gimmel", role: "UX Designer" },
  { name: "Lisa Anderson", role: "Marketing Manager" },
  { name: "James Wilson", role: "Product Manager" }
];

const images = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop"
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const finalIndex = (newIndex + images.length) % images.length;
    setCurrentIndex(finalIndex);

    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.aboutTitle}>OUR TEAM</h1>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navArrow} ${styles.left}`}
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          ‹
        </button>

        <div className={styles.carouselTrack}>
          {images.map((src, i) => {
            const offset = (i - currentIndex + images.length) % images.length;
            let positionClass = styles.hidden;

            if (offset === 0) positionClass = styles.center;
            else if (offset === 1) positionClass = styles.right1;
            else if (offset === 2) positionClass = styles.right2;
            else if (offset === images.length - 1) positionClass = styles.left1;
            else if (offset === images.length - 2) positionClass = styles.left2;

            return (
              <div
                key={i}
                className={`${styles.card} ${positionClass}`}
                onClick={() => updateCarousel(i)}
              >
                <img src={src} alt={teamMembers[i].name} />
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.navArrow} ${styles.right}`}
          onClick={() => updateCarousel(currentIndex + 1)}
        >
          ›
        </button>
      </div>

      {/* Animated Member Info */}
      <div className={styles.memberInfo}>
        <AnimatePresence mode="wait">
          <motion.div
            key={teamMembers[currentIndex].name}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.memberName}>
              {teamMembers[currentIndex].name}
            </h2>
            <p className={styles.memberRole}>
              {teamMembers[currentIndex].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === currentIndex ? styles.active : ""}`}
            onClick={() => updateCarousel(i)}
          ></div>
        ))}
      </div>

      {/* Touch Events */}
      <div
        className={styles.swipeLayer}
        onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].screenX)}
        onTouchEnd={(e) => {
          touchEndX.current = e.changedTouches[0].screenX;
          handleSwipe();
        }}
      ></div>
    </div>
  );
}
