import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./css/Paymentslogo.module.css";
const withdrawals = [
  {
    title: "Paykuber",
    description: "Withdraw funds using popular cryptocurrencies.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "UPI",
    description: "Fast and secure withdrawals directly to your UPI apps.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Bank Transfer",
    description: "Quick transfer to your local bank account.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Paytm",
    description: "Instant withdrawal with Paytm wallet support.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Google Pay",
    description: "Withdraw instantly using Google Pay UPI.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "PhonePe",
    description: "Seamless withdrawal via PhonePe UPI.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Amazon Pay",
    description: "Withdraw funds directly to Amazon Pay wallet.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Skrill",
    description: "Trusted e-wallet withdrawals worldwide.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Neteller",
    description: "Instant global withdrawals to your Neteller wallet.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "PayPal",
    description: "Fast international withdrawals via PayPal.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Visa",
    description: "Withdraw funds directly to your Visa debit/credit card.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Mastercard",
    description: "Quick withdrawals supported on Mastercard cards.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "RuPay",
    description: "Domestic withdrawals via RuPay cards in India.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "IMPS",
    description: "Instant bank withdrawals using IMPS service.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "NEFT",
    description: "Standard withdrawals via NEFT bank transfer.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "RTGS",
    description: "High-value withdrawals with RTGS settlement.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Crypto (BTC)",
    description: "Withdraw funds directly to your Bitcoin wallet.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Crypto (ETH)",
    description: "Withdraw Ethereum securely to your crypto wallet.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Crypto (USDT)",
    description: "Withdraw instantly via Tether (USDT).",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Wise (TransferWise)",
    description: "Withdraw internationally with low fees via Wise.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Revolut",
    description: "Instant withdrawals for Revolut account holders.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
  {
    title: "Cashfree",
    description: "Trusted Indian gateway for instant withdrawals.",
    image: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw",
  },
];




const Collections = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleWithdrawals = showAll ? withdrawals : withdrawals.slice(0, 6);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.postSliders}>
        <h2 className={styles.sectionHeading}>Withdrawal</h2>

        <div className={styles.postSlider}>
          <div className={`${styles.postSliderHeader} ${styles.headerCard}`}>
            <h2 className={styles.headerCardTitle}>Quick Withdrawal</h2>
            <p className={styles.headerCardSponsor}>
              With local payment options
            </p>
          </div>

          <div className={styles.miniCardGrid}>
            <AnimatePresence>
              {visibleWithdrawals.map((item, index) => (
                <motion.article
                  key={item.title}
                  className={styles.miniCard}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.miniCardImg}
                  />
                  <h3 className={styles.miniCardTitle}>{item.title}</h3>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.btnWrap}>
          <button
            className={styles.viewAllBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collections;
