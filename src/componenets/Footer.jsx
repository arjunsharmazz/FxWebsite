import React from "react";
import { motion } from "framer-motion";
import styles from "./css/Footer.module.css"; // Make sure this path is correct
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Section (Newsletter + Columns) */}
      <motion.div
        className={styles.footerContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Newsletter */}
        <motion.div
          className={`${styles.footerSection} ${styles.newsletterSection}`}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className={styles.newsletterTitle}>Don't Miss Out</h3>
          <p className={styles.newsletterText}>
            Sign up for the latest updates, market news, and offers.
          </p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Enter Your Email Address" required />
            <input type="date" required />
            <button type="submit">Sign Up</button>
          </form>
          <p className={styles.note}>
            By signing up, you agree to our{" "}
            <Link to="/privacy">Privacy Policy</Link> and{" "}
            <Link to="/terms">Terms of Use</Link>.
          </p>
        </motion.div>

        {/* Footer Columns */}
        <motion.div className={`${styles.footerSection} ${styles.linksSection}`} whileHover={{ x: 5 }}>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/review">Review</Link></li>
            <li><Link to="/education">Education</Link></li>
          </ul>
        </motion.div>

        <motion.div className={`${styles.footerSection} ${styles.linksSection}`} whileHover={{ x: 5 }}>
          <h3>Resources</h3>
          <ul>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/socialmedia">Social Media</Link></li>
            <li><Link to="/forexaccount">Account Types</Link></li>
          </ul>
        </motion.div>

        <motion.div className={`${styles.footerSection} ${styles.linksSection}`} whileHover={{ x: 5 }}>
          <h3>Legal</h3>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            {/* <li><Link to="/disclaimer">Disclaimer</Link></li> */}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className={styles.footerBottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className={styles.socialIcons}>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaTelegramPlane /></a>
        </div>
        <div className={styles.bottomLinks}>
          {/* <Link to="/sitemap">Site Map</Link> */}
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          {/* <Link to="/userContent">User Content Terms</Link> */}
        </div>
        <p>⚠️ Trading involves risk. Please trade responsibly.</p>
        <p>© {new Date().getFullYear()} Paykuber Fx. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
