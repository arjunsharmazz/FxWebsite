// File: BlogInsights.jsx
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import styles from "./css/BlogInsights.module.css";

const BlogInsights = () => {
  const posts = [
    { title: "Technical Analysis: EUR/USD Outlook", img: "https://images.unsplash.com/photo-1569025690938-a00729c9e2e9?auto=format&fit=crop&w=900&q=80", desc: "EUR/USD is testing resistance zones. See what patterns traders are watching this week.", tag: "Technical Analysis", author: "Mark T." },
    { title: "Weekly Market Recap", img: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=900&q=80", desc: "Catch up on how major forex pairs, gold, and indices performed in the past week.", tag: "Market Recap", author: "Sarah K." },
    { title: "PayKuber FX Updates", img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=900&q=80", desc: "We’re launching smart alerts and advanced charting tools for pro-level trading.", tag: "Company News", author: "Team PayKuber" },
    { title: "Guest Insights: Risk Management", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80", desc: "Pro trader John Davis shares his golden rules for surviving volatile forex markets.", tag: "Guest Trader", author: "John Davis" },
    { title: "Top 5 Mistakes Beginners Make", img: "https://images.unsplash.com/photo-1581091226825-10f0c9b7bf97?auto=format&fit=crop&w=900&q=80", desc: "Avoid the most common pitfalls and accelerate your learning curve as a trader.", tag: "Education", author: "Emily R." },
    { title: "The Rise of AI in Forex", img: "https://images.unsplash.com/photo-1600267185393-e1588df7b331?auto=format&fit=crop&w=900&q=80", desc: "Artificial Intelligence is changing trading strategies. Here's how to adapt.", tag: "Innovation", author: "Alex N." },
    { title: "Gold Outlook 2025", img: "https://images.unsplash.com/photo-1590490360181-d7e37c95f1b2?auto=format&fit=crop&w=900&q=80", desc: "As inflation rises, traders turn to gold. Here’s the technical and fundamental view.", tag: "Commodities", author: "Lisa M." },
    { title: "Psychology of Trading", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80", desc: "Master your emotions to master the markets. Learn practical psychology tips.", tag: "Mindset", author: "David G." },
    { title: "Crypto & Forex Correlation", img: "https://images.unsplash.com/photo-1621507419387-56f33923995f?auto=format&fit=crop&w=900&q=80", desc: "Discover how crypto volatility impacts forex pairs and how to hedge smartly.", tag: "Crypto", author: "Sophia B." },
    { title: "Scalping Strategies 2025", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80", desc: "High-speed trading techniques that thrive in volatile conditions.", tag: "Strategy", author: "Chris P." },
    { title: "Oil Prices & Market Impact", img: "https://images.unsplash.com/photo-1581090123619-6e3f3e2f4d2a?auto=format&fit=crop&w=900&q=80", desc: "Energy markets continue to shift global currency values. Here’s what to watch.", tag: "Energy", author: "Nina J." },
    { title: "Swing Trading Mastery", img: "https://images.unsplash.com/photo-1542224566-4eb8f5c13779?auto=format&fit=crop&w=900&q=80", desc: "How to identify medium-term opportunities with high probability setups.", tag: "Trading Style", author: "Michael Z." },
    { title: "GBP/USD Weekly Watch", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80", desc: "Brexit aftershocks still impact GBP/USD volatility. Here’s this week’s outlook.", tag: "Currency Pair", author: "Hannah K." },
    { title: "How to Read Order Flow", img: "https://images.unsplash.com/photo-1531379410501-252f3e12d3ae?auto=format&fit=crop&w=900&q=80", desc: "Order book data gives smart traders an edge. Learn how to interpret it.", tag: "Pro Tools", author: "Daniel L." },
    { title: "Algorithmic Trading 101", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80", desc: "Learn how bots and algos dominate modern forex markets and how to start building one.", tag: "Automation", author: "Kevin P." },
    { title: "Women in Forex", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80", desc: "How women traders are reshaping global financial markets with unique strategies.", tag: "Community", author: "Rachel Y." },
    { title: "Risk-to-Reward Secrets", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80", desc: "The ultimate ratio that separates pros from amateurs in trading.", tag: "Risk Management", author: "Ethan W." },
    { title: "How Central Banks Move Markets", img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=900&q=80", desc: "Interest rates, policy changes, and how to stay ahead of announcements.", tag: "Fundamentals", author: "Olivia H." },
    { title: "Trading with Smart Money Concepts", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80", desc: "Institutional order blocks and liquidity hunts explained for retail traders.", tag: "Advanced", author: "Jason Q." },
    { title: "2025 Market Predictions", img: "https://images.unsplash.com/photo-1600267185393-e1588df7b331?auto=format&fit=crop&w=900&q=80", desc: "Where top analysts see forex, commodities, and crypto heading this year.", tag: "Forecast", author: "Team PayKuber" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 700,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className={styles.blogWrapper}>
      <svg className={styles.bgSvg} viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            {/* <stop offset="0%" stopColor="#0ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ff2e63" stopOpacity="0.06" /> */}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="400" fill="url(#g1)" />
      </svg>

      <motion.h2
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.heading}
      >
        Market Insights & Blog
      </motion.h2>

      <div className={styles.sliderWrap}>
        <Slider {...settings} className={styles.slider}>
          {posts.slice(0, 6).map((post, i) => (
            <motion.div
              key={i}
              className={styles.card}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className={styles.imageWrapper}>
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className={styles.tag}>{post.tag}</span>
                <div className={styles.gloss} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.desc}>{post.desc}</p>
                <div className={styles.metaRow}>
                  <span className={styles.author}>✍ {post.author}</span>
                  <button className={styles.readBtn} aria-label={`Read ${post.title}`}>
                    Read
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>

      <div className={styles.grid}>
        {posts.map((post, i) => (
          <motion.article
            key={i}
            className={styles.gridCard}
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className={styles.gridImage}>
              <img src={post.img} alt={post.title} loading="lazy" />
              <span className={styles.gridTag}>{post.tag}</span>
            </div>
            <div className={styles.gridContent}>
              <h4>{post.title}</h4>
              <p>{post.desc}</p>
              <div className={styles.gridFooter}>
                <span>{post.author}</span>
                <button className={styles.cta}>View</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default BlogInsights;
