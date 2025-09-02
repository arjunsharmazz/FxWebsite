import React from "react";
import styles from "./css/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About <span>PaykuberFx</span></h1>
          <p>
            At PaykuberFx, we believe trading should be simple, transparent,
            and accessible for everyone. We’re here to empower traders with
            the tools, insights, and support they need to succeed.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to revolutionize the way people trade by offering
            a platform that combines cutting-edge technology, real-time market
            data, and a community of traders worldwide.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className={styles.vision}>
        <div className={styles.container}>
          <h2>Our Vision</h2>
          <p>
            We envision a future where anyone, anywhere, can access global
            financial markets with ease, learn from the best, and grow their
            wealth without barriers.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2>Our Core Values</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Transparency</h3>
              <p>We keep our platform fair, clear, and trustworthy.</p>
            </div>
            <div className={styles.card}>
              <h3>Innovation</h3>
              <p>We constantly evolve with the latest trading technology.</p>
            </div>
            <div className={styles.card}>
              <h3>Community</h3>
              <p>We empower traders to learn, share, and grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.container}>
          <h2>Meet Our Team</h2>
          <p>
            Our team is made up of traders, developers, and financial experts
            passionate about making trading accessible to everyone.
          </p>
          <div className={styles.grid}>
            <div className={styles.teamCard}>
              <div className={styles.avatar}></div>
              <h3>Arjun Sharma</h3>
              <p>Founder & CEO</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}></div>
              <h3>Neha Verma</h3>
              <p>Head of Trading</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}></div>
              <h3>Rohit Mehta</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
