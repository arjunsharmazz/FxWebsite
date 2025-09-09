import React from "react";
import styles from "./css/News.module.css";
import news2 from "../assets/news2.png";
import news1 from "../assets/news1.png";
import news3 from "../assets/news3.png";
import news4 from "../assets/news4.png";
import news5 from "../assets/news5.png";
import news6 from "../assets/news6.png";
import news7 from "../assets/news7.png";
import news8 from "../assets/news8.png";
import news9 from "../assets/news9.png";
const newsData = [
  {
    id: 1,
    title: "Dollar Gains as Traders Await Fed Policy Decision",
    desc: "The US Dollar strengthened ahead of the Federal Reserve meeting. Investors expect signals of prolonged higher interest rates.",
    img: news1,
    date: "Sep 08, 2025",
    tag: "Forex"
  },
  {
    id: 2,
    title: "Euro Falls on Weak German Data",
    desc: "Poor German industrial output weighed on the Euro, sparking concerns about EU economic stability.",
    img: news2,
    date: "Sep 07, 2025",
    tag: "Forex"
  },
  {
    id: 3,
    title: "Yen Weakens Despite BoJ Intervention Rumors",
    desc: "The Japanese Yen slipped lower, despite speculation of potential Bank of Japan action.",
    img: news5,
    date: "Sep 05, 2025",
    tag: "Forex"
  },
  {
    id: 4,
    title: "Pound Slips as UK Inflation Cools",
    desc: "The British Pound lost ground after fresh data showed UK inflation easing faster than expected.",
    img: news7,
    date: "Sep 04, 2025",
    tag: "Forex"
  },
  {
    id: 5,
    title: "Swiss Franc Firms on Safe-Haven Demand",
    desc: "Risk-off sentiment in markets boosted demand for the Swiss Franc, lifting it against major peers.",
    img: news6,
    date: "Sep 03, 2025",
    tag: "Forex"
  },
  {
    id: 6,
    title: "Canadian Dollar Softens on Weak Oil Prices",
    desc: "The Canadian Dollar edged lower as declining oil prices weighed on the commodity-linked currency.",
    img: news8,
    date: "Sep 02, 2025",
    tag: "Forex"
  },
  {
    id: 7,
    title: "Australian Dollar Steadies After RBA Minutes",
    desc: "The Aussie held firm as traders digested the Reserve Bank of Australia's latest policy meeting notes.",
    img: news9,
    date: "Sep 01, 2025",
    tag: "Forex"
  },
  {
    id: 5,
    title: "Swiss Franc Firms on Safe-Haven Demand",
    desc: "Risk-off sentiment in markets boosted demand for the Swiss Franc, lifting it against major peers.",
    img: news6,
    date: "Sep 03, 2025",
    tag: "Forex"
  },
  {
    id: 6,
    title: "Canadian Dollar Softens on Weak Oil Prices",
    desc: "The Canadian Dollar edged lower as declining oil prices weighed on the commodity-linked currency.",
    img: news8,
    date: "Sep 02, 2025",
    tag: "Forex"
  },
  {
    id: 7,
    title: "Australian Dollar Steadies After RBA Minutes",
    desc: "The Aussie held firm as traders digested the Reserve Bank of Australia's latest policy meeting notes.",
    img: news9,
    date: "Sep 01, 2025",
    tag: "Forex"
  }
];


const News = () => {
  return (
    <div className={styles.newsWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Latest Forex News</h1>
        <p className={styles.subtitle}>
          Market insights, updates and reports to help you stay ahead in trading.
        </p>
      </header>

      {/* Featured News */}
      <div className={styles.featured}>
        <img src={newsData[0].img} alt={newsData[0].title} />
        <div className={styles.featuredContent}>
          <span className={styles.tag}>{newsData[0].tag}</span>
          <h2>{newsData[0].title}</h2>
          <p>{newsData[0].desc}</p>
          <span className={styles.date}>{newsData[0].date}</span>
        </div>
      </div>

      {/* 2 Grid News */}
      <div className={styles.grid}>
        {newsData.slice(1, 3).map((news) => (
          <article key={news.id} className={styles.card}>
            <img src={news.img} alt={news.title} />
            <div className={styles.cardContent}>
              <span className={styles.tag}>{news.tag}</span>
              <h3>{news.title}</h3>
              <p>{news.desc}</p>
              <span className={styles.date}>{news.date}</span>
            </div>
          </article>
        ))}
      </div>

      {/* List Style News */}
      <div className={styles.list}>
        {newsData.slice(3).map((news) => (
          <article key={news.id} className={styles.listItem}>
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
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
