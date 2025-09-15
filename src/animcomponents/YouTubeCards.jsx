import React from "react";
import styles from "./css/YouTubeCards.module.css";
import Education2 from "./Education2";

const videos = [
  {
    id: 1,
    title: "Forex Trading For Beginners In 2025",
    desc: "The Complete Step by Step Beginner's Guide",
    thumbnail: "https://img.youtube.com/vi/Jm71EoALK8g/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Jm71EoALK8g"
  },
  {
    id: 2,
    title: "The Best Forex Trading Timeframes to Trade In …",
    desc: "Which timeframes are most reliable in Forex",
    thumbnail: "https://img.youtube.com/vi/sBEjZNbF_C8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=sBEjZNbF_C8"
  },
  {
    id: 3,
    title: "Beginners Guide To Start Day Trading In 2025 (10 hours)",
    desc: "Deep Dive into Day Trading strategies for forex",
    thumbnail: "https://img.youtube.com/vi/1F7rFzRSsqY/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=1F7rFzRSsqY"
  },
  {
    id: 4,
    title: "How To Start Forex Trading For Beginners' 2025 (Full Course)",
    desc: "Full Course: Learn Forex Trading from Scratch",
    thumbnail: "https://img.youtube.com/vi/GWelSpdKwCw/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=GWelSpdKwCw"
  },
  {
    id: 1,
    title: "Forex Trading For Beginners In 2025",
    desc: "The Complete Step by Step Beginner's Guide",
    thumbnail: "https://img.youtube.com/vi/Jm71EoALK8g/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Jm71EoALK8g"
  },
  {
    id: 2,
    title: "The Best Forex Trading Timeframes to Trade In …",
    desc: "Which timeframes are most reliable in Forex",
    thumbnail: "https://img.youtube.com/vi/sBEjZNbF_C8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=sBEjZNbF_C8"
  },
  {
    id: 3,
    title: "Beginners Guide To Start Day Trading In 2025 (10 hours)",
    desc: "Deep Dive into Day Trading strategies for forex",
    thumbnail: "https://img.youtube.com/vi/1F7rFzRSsqY/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=1F7rFzRSsqY"
  },
  {
    id: 4,
    title: "How To Start Forex Trading For Beginners' 2025 (Full Course)",
    desc: "Full Course: Learn Forex Trading from Scratch",
    thumbnail: "https://img.youtube.com/vi/GWelSpdKwCw/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=GWelSpdKwCw"
  }
];

const YouTubeCards = () => {
  return (
    <>
      <Education2 name="  Tutorials"/>
    <div className={styles.grid}>
      {videos.map((video) => (
        <a
          key={video.id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
          <div className={styles.firstContent}>
            <h3>{video.title}</h3>
            <p>{video.desc}</p>
          </div>
          <div
            className={styles.secondContent}
            style={{ backgroundImage: `url(${video.thumbnail})` }}
          ></div>
        </a>
      ))}
    </div>
    </>
  );
};

export default YouTubeCards;
