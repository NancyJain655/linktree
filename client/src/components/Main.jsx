import React, { useState, useEffect } from "react";
import styles from "../styles/Main.module.css";
import shareIcon from "../assets/IconShare.png"; 

const Main = () => {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setUserName(userData.name || "User"); // Fallback to "User" if no name found
  }, []);

  const handleShare = () => {
    console.log("Share button clicked!");
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header section with Greeting and Share button */}
      <div className={styles.headerSection}>
        <h1 className={styles.greeting}>
          Hi, <span>{userName}!</span> {/* Dynamic Name */}
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
