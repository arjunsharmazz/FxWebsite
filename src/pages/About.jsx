import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./css/About.module.css";
import img from "../assets/dash.png";
import img2 from "../assets/dash2.png";
import FaqSection from "../componenets/FaqSection";
import TradeSection from "../componenets/TradeSection";
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.3 },
});

const cards = [
  {
    title: "Smart Execution",
    text: "Low-latency order routing with deep liquidity access for tighter spreads and fewer requotes.",
  },
  {
    title: "Transparent Pricing",
    text: "No hidden fees. Clear commissions and real-time cost breakdowns on every trade.",
  },
  {
    title: "Education-First",
    text: "Live webinars, trading guides, and strategy playbooks built for every skill level.",
  },
  {
    title: "Safety by Design",
    text: "Bank-grade encryption, segregated accounts, and rigorous risk controls.",
  },
];

const milestones = [
  { year: "2020", title: "Launch", text: "PayKuberFX goes live with web platform & 1k users." },
  { year: "2021", title: "Mobile Apps", text: "iOS & Android apps ship, usage triples." },
  { year: "2022", title: "Education Hub", text: "Daily webinars + strategy library roll out." },
  { year: "2023", title: "Pro Tools", text: "Advanced analytics, depth, and alerts." },
  { year: "2024", title: "AI Assist", text: "Smart insights for risk and timing." },
];

const faqs = [
  {
    q: "What is PayKuberFX?",
    a: "A global forex & multi-asset trading platform with education, analytics, and 24/7 support.",
  },
  {
    q: "Is my money safe?",
    a: "We use bank-grade security, data encryption, and segregated client funds with strict controls.",
  },
  {
    q: "How do I start?",
    a: "Create an account, verify KYC, fund your wallet, and practice with a demo before going live.",
  },
  {
    q: "Do you offer education?",
    a: "Yes—step-by-step courses, live sessions, and strategy playbooks for beginners to pros.",
  },
];

export default function About() {
  // subtle parallax on hero art
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <motion.div className={styles.heroArt} style={{ y: yHero }}>
          {/* replace this image */}
          <img src={img} alt="PayKuberFX hero" />
          <div className={styles.blobA} />
          <div className={styles.blobB} />
        </motion.div>

        <motion.div {...fadeUp(0)} className={styles.heroContent}>
          <h1>
            Built for <span className={styles.accent}>clarity</span>. Powered by{" "}
            <span className={styles.accent}>speed</span>.
          </h1>
          <p>
            PayKuberFX helps traders make smarter decisions with transparent pricing, pro-grade tools,
            and always-on support.
          </p>
          <div className={styles.heroCtas}>
            <motion.a whileHover={{ scale: 1.03 }} className={styles.primaryBtn} href="#get-started">
              Get Started
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} className={styles.ghostBtn} href="#learn-more">
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* INTRO SPLIT */}
      <section id="learn-more" className={styles.split}>
        <motion.div {...fadeUp(0)} className={styles.splitText}>
          <h2>Trading that feels effortless</h2>
          <p>
            From onboarding to execution, every step is crafted to reduce friction. Fast charts, intuitive
            order tickets, and real-time risk—so you can focus on the move, not the menu.
          </p>
          <ul className={styles.tickList}>
            <li>Lightning-fast charting & watchlists</li>
            <li>One-tap risk presets & alerts</li>
            <li>Unified wallet with instant transfers</li>
          </ul>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className={styles.splitMedia}>
          {/* replace this image */}
          <img src={img2} alt="Platform preview" />
        </motion.div>
      </section>

      {/* TIMELINE (horizontal scroll on mobile, grid on desktop) */}

      {/* MISSION STRIPE */}
      <section className={styles.mission}>
        <motion.div {...fadeUp(0)} className={styles.missionCard}>
          <h3>Our mission</h3>
          <p>
            Make trading feel simple, safe, and data-driven—without hiding the details. We give you the
            knowledge, tools, and support to reach your goals with confidence.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <motion.div {...fadeUp(0)} className={styles.stat}>
          <span>120K+</span>
          <label>trades / day</label>
        </motion.div>
        <motion.div {...fadeUp(0.05)} className={styles.stat}>
          <span>70+</span>
          <label>countries</label>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className={styles.stat}>
          <span>24/7</span>
          <label>support</label>
        </motion.div>
        <motion.div {...fadeUp(0.15)} className={styles.stat}>
          <span>15</span>
          <label>industry awards</label>
        </motion.div>
      </section>

      {/* FEATURE CARDS */}
      <section className={styles.features}>
        <motion.h3 {...fadeUp(0)} className={styles.sectionTitle}>
          Why traders choose PayKuberFX
        </motion.h3>
        <div className={styles.featureGrid}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className={styles.featureCard}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LANGUAGES / SUPPORT */}
      <section className={styles.languages}>
        <motion.h3 {...fadeUp(0)} className={styles.sectionTitle}>
          Global reach. Local support.
        </motion.h3>
        <motion.p {...fadeUp(0.05)} className={styles.langSub}>
          Talk to us in your language—anytime.
        </motion.p>
        <div className={styles.langGrid}>
          {["English", "हिन्दी", "العربية", "Русский", "Türkçe", "Español", "Français", "Deutsch"].map(
            (l, i) => (
              <motion.div
                key={l}
                className={styles.langTag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                {l}
              </motion.div>
            )
          )}
        </div>
      </section>
          <TradeSection/>
          <FaqSection/>

      {/* FINAL CTA */}
      <section className={styles.finalCta} id="get-started">
        <motion.h3 {...fadeUp(0)}>
          Ready to trade with clarity?
        </motion.h3>
        <motion.p {...fadeUp(0.05)}>
          Join PayKuberFX and get the tools, insights, and support you deserve.
        </motion.p>
        <motion.a whileHover={{ scale: 1.03 }} className={styles.primaryBtn} href="/signup">
          Create Free Account
        </motion.a>
      </section>
    </div>
  );
}
