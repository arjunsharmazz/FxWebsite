import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/Footer.module.css";
import { FaLinkedin, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Navigation style row */}
      <div className={styles.navRow}>
        <div className={styles.logo}>Paykuber Fx</div>

        <ul className={styles.navLinks}>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms & Conditions</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/review">Review</Link></li>
          <li><Link to="/review">Review</Link></li>
          <li><Link to="/socialmedia">SocialMedia</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>

        <div className={styles.socials}>
          <Link to="/" aria-label="LinkedIn"><FaLinkedin /></Link>
          <Link to="/" aria-label="Twitter"><FaTwitter /></Link>
          <Link to="/" aria-label="Telegram"><FaTelegramPlane /></Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <p className={styles.disclaimer}>
          ⚠️ Trading involves risk. Please trade responsibly.
        </p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Paykuber Fx. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
