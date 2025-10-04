import React from "react";
import { motion } from "framer-motion";
import styles from "./css/News.module.css";
import StepsSection from "../componenets/StepsSection";
import Education2 from "../animcomponents/Education2";
import  newsData from "../dummydata/newsData.js"
import NewsletterSection from "../componenets/NewsletterSection.jsx";
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

<motion.section
  className={styles.highlights}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
  variants={fadeInUp}
>
  <div className={styles.sectionHead}>
    <h2>Market Highlights</h2>
    <p>Quick bites from today’s forex moves.</p>
  </div>

  <div className={styles.highlightsGrid}>
    {newsData.slice(0, 3).map((n) => (
      <article key={`hi-${n.id}`} className={styles.highlightCard}>
        <img src={n.img} alt={n.title} />
        <div className={styles.highlightBody}>
          <span className={styles.tag}>{n.tag}</span>
          <h3>{n.title}</h3>
          <p>{n.desc}</p>
          <div className={styles.cardMeta}>
            <span className={styles.date}>{n.date}</span>
            <button className={styles.readMoreSm}>Read</button>
          </div>
        </div>
      </article>
    ))}
  </div>
</motion.section>

<motion.section
  className={styles.editors}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
  variants={fadeInUp}
>
  <div className={styles.sectionHead}>
    <h2>Editor’s Picks</h2>
    <p>Handpicked reads to level up your strategy.</p>
  </div>

  <div className={styles.editorsRow}>
    {newsData.slice(1, 5).map((n) => (
      <article key={`ep-${n.id}`} className={styles.editorsItem}>
        <div className={styles.editorsThumb}>
          <img src={n.img} alt={n.title} />
        </div>
        <div className={styles.editorsContent}>
          <span className={styles.tag}>{n.tag}</span>
          <h3>{n.title}</h3>
          <p>{n.desc}</p>
          <div className={styles.listFooter}>
            <span className={styles.date}>{n.date}</span>
            <button className={styles.readMore}>Read More</button>
          </div>
        </div>
      </article>
    ))}
  </div>
</motion.section>

<motion.section
  className={styles.topics}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
  variants={fadeInUp}
>
  <div className={styles.sectionHeadCompact}>
    <h3>Browse by Topic</h3>
  </div>
  <div className={styles.chips}>
    {[...new Set(newsData.map(n => n.tag))].slice(0, 12).map((t, i) => (
      <button key={`chip-${i}`} className={styles.chip}>{t}</button>
    ))}
  </div>
</motion.section>

<motion.section
  className={styles.blog}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
  variants={fadeInUp}
>
  <div className={styles.sectionHead}>
    <h2>From the Blog</h2>
    <p>Deep dives, guides, and thought pieces.</p>
  </div>

  <div className={styles.blogGrid}>
    {newsData.slice(0, 6).map((n) => (
      <article key={`bl-${n.id}`} className={styles.blogItem}>
        <img src={n.img} alt={n.title} className={styles.blogImg}/>
        <div className={styles.blogBody}>
          <span className={styles.tag}>{n.tag}</span>
          <h3>{n.title}</h3>
          <p>{n.desc}</p>
          <div className={styles.blogMeta}>
            <span className={styles.date}>{n.date}</span>
            <a className={styles.inlineLink} href="#">Read article →</a>
          </div>
        </div>
      </article>
    ))}
  </div>
</motion.section>


    <StepsSection/>
        <NewsletterSection />
    </>
  );
};

export default News;
