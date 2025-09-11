import React from "react";
import styles from "./css/Paymentslogo.module.css";
import img from "../assets/arjun.jpg"; // default image

const skills = [
  {
    title: "HTML",
    description:
      "Strong foundation in semantic HTML for accessible and SEO-friendly web pages.",
    image: img,
  },
  {
    title: "CSS",
    description: "Expertise in Flexbox, Grid, animations, and responsive design.",
    image: img,
  },
  {
    title: "Javascript",
    description: "Dynamic scripting for interactive web experiences.",
    image: img,
  },
  {
    title: "React.js",
    description:
      "Building interactive UI with hooks, components, and state management.",
    image: img,
  },
  {
    title: "Node.js",
    description:
      "Backend development with Express.js, REST APIs, and server-side logic.",
    image: img,
  },
  {
    title: "Express.js",
    description: "Creating robust APIs and middleware for scalable web apps.",
    image: img,
  },
  {
    title: "MongoDB",
    description: "NoSQL database expertise with schema design and queries.",
    image: img,
  },
  {
    title: "Mongoose",
    description: "ODM for MongoDB, schema validation, and database relationships.",
    image: img,
  },
  {
    title: "Figma",
    description: "UI/UX design, prototyping, and collaborative design workflows.",
    image: img,
  },
  {
    title: "CorelDraw",
    description:
      "Graphic design and vector illustration for branding & creatives.",
    image: img,
  },
  {
    title: "Framer",
    description:
      "Prototyping and interactive design for modern web/mobile apps.",
    image: img,
  },
  {
    title: "Digital Marketing",
    description: "SEO, SEM, content, and campaign strategy.",
    image: img,
  },
  {
    title: "Instagram Promotion",
    description: "Social media growth strategies and branding campaigns.",
    image: img,
  },
  {
    title: "Online Mern Stack Course",
    description: "End-to-end MERN development training.",
    image: img,
  },
  {
    title: "C/C++/Python/JS Course",
    description: "Programming language fundamentals and practice.",
    image: img,
  },
  {
    title: "Data Entry",
    description: "Efficient and accurate data entry skills.",
    image: img,
  },
];

const Paymentslogo = () => {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.postSliders}>
        <h2 className={styles.sectionHeading}>withdrawal</h2>
        <div className={styles.postSlider}>
          {/* Header card */}
          {/* Mini Card Grid (Generated with map) */}
          <div className={styles.miniCardGrid}>
            {skills.map((skill, index) => (
              <article key={index} className={styles.miniCard}>
                <h3 className={styles.miniCardTitle}>{skill.title}</h3>
                <div className={styles.miniCardDescription}>
                  {skill.description}
                </div>
                <img
                  src={skill.image}
                  alt={skill.title}
                  className={styles.miniCardImg}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Paymentslogo;
