import React from "react";
import styles from "./css/SocialMediaPage.module.css";
import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaTiktok,
  FaPinterest,
  FaShieldAlt,
  FaStar,
  FaAward,
} from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqSection from "../componenets/FaqSection";
import CTABanner from "../componenets/CTABanner";
import Marquee3D from "../animcomponents/Marquee3D";
import phone1 from "../assets/phone1.png";
import phone2 from "../assets/phone2.png";
import Education2 from "../animcomponents/Education2";

function NextArrow({ onClick }) {
  return (
    <button className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
      ➜
    </button>
  );
}
function PrevArrow({ onClick }) {
  return (
    <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
      ←
    </button>
  );
}

export default function SocialMediaPage() {
  const storySettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "20px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, centerMode: false },
      },
    ],
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    centerMode: true,
    centerPadding: "30px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
    <div className={styles.wrapper}>
      {/* ==== Hero Section ==== */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Where Traders Meet Opportunity</h1>
          <p>
            A global community of traders sharing experiences, strategies, and
            success stories every single day.
          </p>
        </motion.div>

        <div className={styles.heroPhones}>
          {/* <img src={phone1} alt="Phone1" className={styles.phone1} /> */}
          <img src={phone2} alt="Phone2" className={styles.phone2} />
        </div>
      </section>

      {/* ==== Social Media Section ==== */}
      <section className={styles.socials}>
        <h2>Social Media Reach</h2>
        <p>
          Millions of people follow us for daily market insights, trader stories,
          and real-time updates.
        </p>
        <div className={styles.socialGrid}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <FaYoutube /> YouTube <span>520K+</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <FaInstagram /> Instagram <span>210K+</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <FaFacebook /> Facebook <span>1.4M+</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <FaTelegram /> Telegram <span>20K+</span>
          </motion.div>
        </div>
      </section>

      {/* ==== Trust Section ==== */}
      <section className={styles.trust}>
        <h2>Trusted by Traders Worldwide</h2>
        <div className={styles.trustGrid}>
          <div>
            <FaShieldAlt />
            <h4>Secure Platform</h4>
            <p>Bank-grade encryption ensures your funds and data are safe.</p>
          </div>
          <div>
            <FaStar />
            <h4>4.8/5 Rating</h4>
            <p>Rated by over 1M verified traders across the globe.</p>
          </div>
          <div>
            <FaAward />
            <h4>Award Winning</h4>
            <p>Recognized for innovation and transparency in trading.</p>
          </div>
        </div>
      </section>

      {/* ==== Community Section ==== */}
      <section className={styles.community}>
        <h2>Local Communities</h2>
        <p>
          Join traders from your own country and grow together with
          region-specific insights, discussions, and mentorship.
        </p>

        <div className={styles.communityGrid}>
          <div>
            <FaFacebook /> Facebook Groups
          </div>
          <div>
            <FaTwitter /> Twitter Spaces
          </div>
          <div>
            <FaTiktok /> TikTok Live
          </div>
          <div>
            <FaPinterest /> Pinterest Boards
          </div>
        </div>

        <Slider {...testimonialSettings} className={styles.slider}>
          <div className={styles.testimonial}>
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Anna"
            />
            <p>
              “I joined the India community and found genuine mentors who guided
              me every step of the way.”
            </p>
            <h4>Anna Smith</h4>
          </div>
          <div className={styles.testimonial}>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="David"
            />
            <p>
              “The Brazil group is full of energy and strategies. I’ve learned
              more in 6 months here than in 2 years trading alone.”
            </p>
            <h4>David Lee</h4>
          </div>
        </Slider>
      </section>

      {/* ==== Stories Section ==== */}
      <section className={styles.stories}>
        <h2>Our Traders’ Stories</h2>
        <p>
          Real experiences from traders across the globe who grew with patience,
          strategies, and the power of community.
        </p>

        <Slider {...storySettings} className={styles.slider}>
          <div className={styles.storyCard}>
            <img
              src="https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Brazil Trader"
            />
            <div className={styles.storyContent}>
              <h3>Wanderson Lima</h3>
              <p className={styles.country}>🇧🇷 Brazil</p>
              <p>
                Runs weekly Zoom calls helping new traders analyze charts,
                manage risk, and build confidence.
              </p>
            </div>
          </div>
          <div className={styles.storyCard}>
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="USA Trader"
            />
            <div className={styles.storyContent}>
              <h3>Emily Johnson</h3>
              <p className={styles.country}>🇺🇸 USA</p>
              <p>
                Shares market breakdowns on Instagram every week, helping
                thousands of beginners understand trading basics.
              </p>
            </div>
          </div>
          <div className={styles.storyCard}>
            <img
              src="https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="India Trader"
            />
            <div className={styles.storyContent}>
              <h3>Rahul Mehta</h3>
              <p className={styles.country}>🇮🇳 India</p>
              <p>
                Turned a $200 account into $20,000 through consistency and now
                mentors others via Telegram.
              </p>
            </div>
          </div>
        </Slider>
      </section>

      <Marquee3D />
      <FaqSection />
      <CTABanner />
    </div></>
  );
}
  