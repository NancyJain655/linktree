import React from "react";
import styles from "../styles/Main.module.css";
import shareIcon from "../assets/IconShare.png"; // Import the share icon

const Main = () => {
  const handleShare = () => {
    console.log("Share button clicked!");
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header section with Greeting and Share button */}
      <div className={styles.headerSection}>
        <h1 className={styles.greeting}>
          Hi, <span>Jenny Wilson!</span>
        </h1>
        <button className={styles.shareBtn} onClick={handleShare}>
          <span>Share</span>
          <img src={shareIcon} alt="Share" className={styles.shareIcon} />
        </button>
      </div>

      <p className={styles.subText}>
        Congratulations. You got a great response today.
      </p>
    </div>
  );
};

export default Main;
