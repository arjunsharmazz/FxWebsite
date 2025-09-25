import { motion } from "framer-motion";
import styles from "./css/Contact.module.css";
import { Mail, Phone, MapPin } from "lucide-react";
import Education2 from "../animcomponents/Education2";
// import img from ""; // 👉 apni image yaha dalna

export default function Contact() {
  return (
    <>
    <Education2 name = "Contact Us"/>
    <div className={styles.contactPage}>
      {/* Left Side Image */}
      <motion.div
        className={styles.leftPane}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <img src="https://balajiswitchgears.com/wp-content/uploads/2024/08/depositphotos_41018917-stock-photo-businessman-push-to-contact-us.webp" alt="Contact Us" />
      </motion.div>

      {/* Right Side Content */}
      <div className={styles.rightPane}>
        {/* Hero Section */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1><span className={styles.accent}>PayKuberFX</span></h1>
          <p>We’re here to help you 24/7 — connect with us anytime.</p>
        </motion.div>

        {/* Contact Info Section */}
        <div className={styles.infoGrid}>
          <motion.div className={styles.infoCard} whileHover={{ scale: 1.05 }}>
            <Mail className={styles.icon} />
            <h3>Email Us</h3>
            <p>support@paykuberfx.com</p>
          </motion.div>

          <motion.div className={styles.infoCard} whileHover={{ scale: 1.05 }}>
            <Phone className={styles.icon} />
            <h3>Call Us</h3>
            <p>+91 9999999999</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Send Us a Message</h2>
          <form className={styles.form}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
    </>
  );
}
