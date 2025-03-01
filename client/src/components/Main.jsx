import React, { useState, useEffect } from "react";
import styles from "../styles/Main.module.css";
import shareIcon from "../assets/IconShare.png";

const Main = () => {
  const [userFirstName, setUserFirstName] = useState("User");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    const updateUserData = () => {
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUserFirstName(userData.firstName || "User");
      setUserLastName(userData.lastName || "");
    };

    updateUserData(); 

    window.addEventListener("storage", updateUserData);

    return () => {
      window.removeEventListener("storage", updateUserData);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.greeting}>
          Hi, <span>{userFirstName} {userLastName}!</span>
        </h1>
        <button className={styles.shareBtn}>
          <span>Share</span>
          <img src={shareIcon} alt="Share" />
        </button>
      </div>
      <p className={styles.subText}>
        Congratulations. You got a great response today.
      </p>
    </div>
  );
};

export default Main;
