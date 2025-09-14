import React from "react";
import styles from "./css/Cards.module.css";

const videos = [
  {
    id: "1",
    url: "https://www.youtube.com/watch?v=Jm71EoALK8g",
    thumb: "https://img.youtube.com/vi/Jm71EoALK8g/hqdefault.jpg",
    caption: "Forex Trading For Beginners – Full Step by Step 2025"
  },
  {
    id: "2",
    url: "https://www.youtube.com/watch?v=GWelSpdKwCw",
    thumb: "https://img.youtube.com/vi/GWelSpdKwCw/hqdefault.jpg",
    caption: "Start Forex Trading From Scratch 2025"
  },
  {
    id: "3",
    url: "https://www.youtube.com/watch?v=1F7rFzRSsqY",
    thumb: "https://img.youtube.com/vi/1F7rFzRSsqY/hqdefault.jpg",
    caption: "Beginners Guide To Day Trading 2025"
  },
  {
    id: "4",
    url: "https://www.youtube.com/watch?v=nk6r9whUJfA",
    thumb: "https://img.youtube.com/vi/nk6r9whUJfA/hqdefault.jpg",
    caption: "How To Start Forex From Scratch – Part 1"
  },
  {
    id: "5",
    url: "https://www.youtube.com/watch?v=zmNRkvR5BW0",
    thumb: "https://img.youtube.com/vi/zmNRkvR5BW0/hqdefault.jpg",
    caption: "Forex Basics Free Course 2025"
  },
  {
    id: "6",
    url: "https://www.youtube.com/watch?v=2MVNe67zCyY",
    thumb: "https://img.youtube.com/vi/2MVNe67zCyY/hqdefault.jpg",
    caption: "Forex Trading From Scratch Tutorial"
  },
  {
    id: "7",
    url: "https://www.youtube.com/watch?v=9tCR16dsb6M",
    thumb: "https://img.youtube.com/vi/9tCR16dsb6M/hqdefault.jpg",
    caption: "Learn Forex in 28 Minutes (2025)"
  },
  {
    id: "8",
    url: "https://www.youtube.com/watch?v=xHU5MHuUSKI",
    thumb: "https://img.youtube.com/vi/xHU5MHuUSKI/hqdefault.jpg",
    caption: "How To Start Day Trading 2025 Full Tutorial"
  },
  {
    id: "9",
    url: "https://www.youtube.com/watch?v=B-AH9HS9Oco",
    thumb: "https://img.youtube.com/vi/B-AH9HS9Oco/hqdefault.jpg",
    caption: "How To Trade Forex for Beginners 2025"
  },
  {
    id: "10",
    url: "https://www.youtube.com/watch?v=lAEOsQ-oslI",
    thumb: "https://img.youtube.com/vi/lAEOsQ-oslI/hqdefault.jpg",
    caption: "Forex Trading Full Course 2025"
  },
  {
    id: "11",
    url: "https://www.youtube.com/watch?v=9jJM_OcnIug",
    thumb: "https://img.youtube.com/vi/9jJM_OcnIug/hqdefault.jpg",
    caption: "Supply & Demand Trading Course 2025"
  },
  {
    id: "12",
    url: "https://www.youtube.com/watch?v=r2UlvqXJrQQ",
    thumb: "https://img.youtube.com/vi/r2UlvqXJrQQ/hqdefault.jpg",
    caption: "Start Trading Forex From Scratch 2025"
  }
];



const Cards = () => {
  return (
    <>
      <div className={styles.wrap}>
        {videos.map((video) => (
          <figure key={video.id}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img src={video.thumb} alt={video.caption} />
            </a>
            <figcaption>{video.caption}</figcaption>
          </figure>
        ))}
      </div>

    </>
  );
};

export default Cards;
