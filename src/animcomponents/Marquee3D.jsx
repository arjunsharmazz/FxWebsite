import React from "react";
import styles from "./css/Marquee3D.module.css";
import Education2 from "./Education2";

const reviews = [
  {
    name: "Alice",
    username: "@alice",
    body: "Great forex signals, I improved my trading consistency.",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "The strategies shared here are really helpful for beginners.",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "I like the transparency, very reliable source of forex info.",
    img: "https://avatar.vercel.sh/charlie",
  },
];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <>
    <div>
    <figure className={styles.card}>
      <div className={styles.user}>
        <img src={img} alt={name} />
        <div>
          <figcaption>{name}</figcaption>
          <p>{username}</p>
        </div>
      </div>
      <blockquote>{body}</blockquote>
    </figure>
    </div>
    </>
  );
};

const MarqueeColumn = ({ data, reverse }) => {
  return (
    <div className={`${styles.column} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.marqueeInner}>
        {data.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
        {data.map((review, i) => (
          <ReviewCard key={i + "-copy"} {...review} />
        ))}
      </div>
    </div>
  );
};

const Marquee3D = () => {
  const firstRow = reviews.slice(0, 2);
  const secondRow = reviews.slice(1);

  return (
    <>
    <Education2 name="Client Stories" />
    <div className={styles.wrapper}>
      <div className={styles.inner3d}>
        <MarqueeColumn data={firstRow} />
        <MarqueeColumn data={secondRow} reverse />      
        <MarqueeColumn data={firstRow} reverse />
        <MarqueeColumn data={secondRow} />
      </div>

      {/* Fade overlay for 3D look */}
      <div className={`${styles.overlay} ${styles.top}`}></div>
      <div className={`${styles.overlay} ${styles.bottom}`}></div>
      <div className={`${styles.overlay} ${styles.left}`}></div>
      <div className={`${styles.overlay} ${styles.right}`}></div>
    </div>
    </>
  );
};

export default Marquee3D;
