import React from "react";
import styles from "./css/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;
