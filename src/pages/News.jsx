import React from "react";
import { motion } from "framer-motion";
import styles from "./css/News.module.css";
import StepsSection from "../componenets/StepsSection";
import Education2 from "../animcomponents/Education2";
import  newsData from "../dummydata/newsData.js"


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const News = () => {
  return (
    <>
    <div className={styles.newsWrapper}>
      {/* Header */}
      <motion.header
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
      >
              <Education2 name="Forex News"/>
                      {/* <p className={styles.subtitle}>
          Market insights, updates and reports to help you stay ahead in trading.
        </p> */}
      </motion.header>

      {/* Featured News */}
      <motion.div
        className={styles.featured}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        variants={fadeInUp}
      >
        <img src={newsData[0].img} alt={newsData[0].title} />
        <div className={styles.featuredContent}>
          <span className={styles.tag}>{newsData[0].tag}</span>
          <h2>{newsData[0].title}</h2>
          <p>{newsData[0].desc}</p>
          <span className={styles.date}>{newsData[0].date}</span>
        </div>
      </motion.div>

      {/* 2 Grid News */}
      <div className={styles.grid}>
        {newsData.slice(1, 3).map((news, index) => (
          <motion.article
            key={news.id}
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            variants={fadeInUp}
          >
            <img src={news.img} alt={news.title} />
            <div className={styles.cardContent}>
              <span className={styles.tag}>{news.tag}</span>
              <h3>{news.title}</h3>
              <p>{news.desc}</p>
              <span className={styles.date}>{news.date}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* List Style News */}
      <div className={styles.list}>
        {newsData.slice(3).map((news, index) => (
          <motion.article
            key={news.id}
            className={styles.listItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            variants={fadeInUp}
          >
            <div className={styles.listImage}>
              <img src={news.img} alt={news.title} />
            </div>
            <div className={styles.listContent}>
              <span className={styles.tag}>{news.tag}</span>
              <h3>{news.title}</h3>
              <p>{news.desc}</p>
              <div className={styles.listFooter}>
                <span className={styles.date}>{news.date}</span>
                <button className={styles.readMore}>Read More</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
    <StepsSection/>
    </>
  );
};

export default News;
