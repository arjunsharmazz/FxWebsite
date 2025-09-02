import React, { useEffect, useRef } from "react";
import styles from "./css/StarsEffect.module.css";

const StarsEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const starsContainer = containerRef.current;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add(styles.star);

      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;

      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      star.style.animationDelay = `${Math.random() * 5}s`;

      starsContainer.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className={styles.stars}></div>;
};

export default StarsEffect;
