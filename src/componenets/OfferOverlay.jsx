// OfferOverlay.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/OfferOverlay.css";
import img from "../assets/bonus.png";
export default function OfferOverlay() {
  const [show, setShow] = useState(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="offer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="offer-box"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
          >
            <button className="close-btn" onClick={() => setShow(false)}>
              ×
            </button>

            <div className="offer-content">
              {/* Left Content */}
              <div className="offer-text">
                <h2 className="highlight">🎁 Future Bonus Offer</h2>
                <h1>Supercharge Your Trading.. </h1>
                <p>
                  Get an <span className="bonus">+75% Boost</span> on deposits.  
                  Unlock futuristic rewards and trade with next-gen power.
                </p>
                <div className="actions">
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px #ff4b4b" }}
                    whileTap={{ scale: 0.95 }}
                    className="cta-primary"
                  >
                    Claim Bonus
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "0 0 15px #fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="cta-secondary"
                    onClick={() => setShow(false)}
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="offer-image">
                <img src={img} alt="Bonus Offer" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
