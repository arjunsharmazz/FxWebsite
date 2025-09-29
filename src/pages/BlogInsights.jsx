
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import styles from "./css/BlogInsights.module.css";
import Education2 from "../animcomponents/Education2";
import posts from "../dummydata/BlgPost.js"

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
