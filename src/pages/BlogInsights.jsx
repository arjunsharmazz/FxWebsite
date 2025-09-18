import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import styles from "./css/BlogInsights.module.css";

const BlogInsights = () => {
  const posts = [
    {
      title: "Technical Analysis: EUR/USD Outlook",
      img: "https://images.unsplash.com/photo-1569025690938-a00729c9e2e9?auto=format&fit=crop&w=900&q=80",
      desc: "EUR/USD is testing resistance zones. See what patterns traders are watching this week.",
      tag: "Technical Analysis",
      author: "Mark T."
    },
    {
      title: "Weekly Market Recap",
      img: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=900&q=80",
      desc: "Catch up on how major forex pairs, gold, and indices performed in the past week.",
      tag: "Market Recap",
      author: "Sarah K."
    },
    {
      title: "PayKuber FX Updates",
      img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=900&q=80",
      desc: "We’re launching smart alerts and advanced charting tools for pro-level trading.",
      tag: "Company News",
      author: "Team PayKuber"
    },
    {
      title: "Guest Insights: Risk Management",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      desc: "Pro trader John Davis shares his golden rules for surviving volatile forex markets.",
      tag: "Guest Trader",
      author: "John Davis"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 800,
    responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }]
  };

  return (
    <div className={styles.blogWrapper}>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.heading}
      >
        Market Insights & Blog
      </motion.h2>

      {/* Slider Section */}
      <Slider {...settings} className={styles.slider}>
        {posts.map((post, i) => (
          <motion.div
            key={i}
            className={styles.card}
            whileHover={{ scale: 1.04 }}
          >
            <div className={styles.imageWrapper}>
              <img src={post.img} alt={post.title} />
              <span className={styles.tag}>{post.tag}</span>
            </div>
            <div className={styles.cardBody}>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <div className={styles.author}>✍ {post.author}</div>
            </div>
          </motion.div>
        ))}
      </Slider>

      {/* Grid Section */}
      <div className={styles.grid}>
        {posts.concat(posts).map((post, i) => (
          <motion.div
            key={i}
            className={styles.gridCard}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={post.img} alt={post.title} />
            <div className={styles.gridContent}>
              <h4>{post.title}</h4>
              <p>{post.desc}</p>
              <span className={styles.meta}>
                {post.tag} • {post.author}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogInsights;
