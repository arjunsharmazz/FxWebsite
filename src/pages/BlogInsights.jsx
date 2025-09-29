
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import styles from "./css/BlogInsights.module.css";
import Education2 from "../animcomponents/Education2";


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      aria-label="Next"
      className={`${styles.arrow} ${styles.next}`}
      onClick={onClick}
      type="button"
    >
      →
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      aria-label="Previous"
      className={`${styles.arrow} ${styles.prev}`}
      onClick={onClick}
      type="button"
    >
      ←
    </button>
  );
};

const BlogInsights = () => {
  const posts = [
    { title: "Technical Analysis: EUR/USD Outlook", img: "https://images.unsplash.com/photo-1569025690938-a00729c9e2e9?auto=format&fit=crop&w=1600&q=80", desc: "EUR/USD is testing resistance zones. See what patterns traders are watching this week.", tag: "Technical Analysis", author: "Mark T." },
    { title: "Weekly Market Recap", img: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=1600&q=80", desc: "Catch up on how major forex pairs, gold, and indices performed in the past week.", tag: "Market Recap", author: "Sarah K." },
    { title: "PayKuber FX Updates", img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=1600&q=80", desc: "We’re launching smart alerts and advanced charting tools for pro-level trading.", tag: "Company News", author: "Team PayKuber" },
    { title: "Guest Insights: Risk Management", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80", desc: "Pro trader John Davis shares his golden rules for surviving volatile forex markets.", tag: "Guest Trader", author: "John Davis" },
    { title: "Top 5 Mistakes Beginners Make", img: "https://images.unsplash.com/photo-1581091226825-10f0c9b7bf97?auto=format&fit=crop&w=1600&q=80", desc: "Avoid the most common pitfalls and accelerate your learning curve as a trader.", tag: "Education", author: "Emily R." },
    { title: "The Rise of AI in Forex", img: "https://images.unsplash.com/photo-1600267185393-e1588df7b331?auto=format&fit=crop&w=1600&q=80", desc: "Artificial Intelligence is changing trading strategies. Here's how to adapt.", tag: "Innovation", author: "Alex N." },
    { title: "Gold Outlook 2025", img: "https://images.unsplash.com/photo-1590490360181-d7e37c95f1b2?auto=format&fit=crop&w=1600&q=80", desc: "As inflation rises, traders turn to gold. Here’s the technical and fundamental view.", tag: "Commodities", author: "Lisa M." },
    { title: "Psychology of Trading", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80", desc: "Master your emotions to master the markets. Learn practical psychology tips.", tag: "Mindset", author: "David G." },
    { title: "Crypto & Forex Correlation", img: "https://images.unsplash.com/photo-1621507419387-56f33923995f?auto=format&fit=crop&w=1600&q=80", desc: "Discover how crypto volatility impacts forex pairs and how to hedge smartly.", tag: "Crypto", author: "Sophia B." },
    { title: "Scalping Strategies 2025", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80", desc: "High-speed trading techniques that thrive in volatile conditions.", tag: "Strategy", author: "Chris P." },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4200,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 650,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => <ul className={styles.dots}>{dots}</ul>,
    customPaging: () => <span className={styles.dot} />,
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.05 },
    }),
  };

  return (
    <>
    <Education2 name="Our Blog"/>
    <section className={styles.blogWrapper}>
      <div className={styles.bgFx} aria-hidden />

      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h2 className={styles.heading}>
          <span>Market Insights</span> & Blog
        </h2>
        <p className={styles.sub}>
          Fresh analysis, strategies, and platform updates — tailored for active traders.
        </p>
      </motion.header>

      <div className={styles.sliderWrap}>
        <Slider {...settings}>
          {posts.slice(0, 6).map((post, i) => (
            <motion.article
              key={post.title}
              className={styles.card}
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              custom={i}
              whileHover={{ y: -4 }}
            >
              <div className={styles.imageWrapper}>
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className={styles.tag}>{post.tag}</span>
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.desc}>{post.desc}</p>
                <div className={styles.metaRow}>
                  <span className={styles.author}>✍ {post.author}</span>
                  <button className={styles.readBtn} aria-label={`Read: ${post.title}`}>
                    Read
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </Slider>
      </div>

      <div className={styles.grid}>
        {posts.map((post, i) => (
          <motion.article
            key={`${post.title}-${i}`}
            className={styles.gridCard}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -6 }}
          >
            <div className={styles.gridImage}>
              <img src={post.img} alt={post.title} loading="lazy" />
              <span className={styles.gridTag}>{post.tag}</span>
              <div className={styles.gridOverlay} />
            </div>
            <div className={styles.gridContent}>
              <h4 className={styles.gridTitle}>{post.title}</h4>
              <p className={styles.gridDesc}>{post.desc}</p>
              <div className={styles.gridFooter}>
                <span className={styles.gridAuthor}>{post.author}</span>
                <button className={styles.cta}>View</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
    </>
  );
};

export default BlogInsights;
