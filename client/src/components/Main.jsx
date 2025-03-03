import React, { useState, useEffect } from "react";
import styles from "../styles/Main.module.css";
import shareIcon from "../assets/IconShare.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [userFirstName, setUserFirstName] = useState("User");
  const [userLastName, setUserLastName] = useState("");
   const showToast = (message, type = "success") => {
        toast(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: type === "success" ? "green" : "red",  // 🔥 Custom background
            color: "white",  // ✅ Text color white
            fontWeight: "bold", // Optional: Makes text bold
            fontSize: "16px", // Optional: Adjust font size
          },
          type: type,
        });
      };
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://linktree-tan-one.vercel.app/login");
     showToast("link copied successfully","success");
    } catch (err) {
      showToast(" Failed to copy link","error");
    }
  };

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
      <ToastContainer/>
      <div className={styles.headerSection}>
        <h1 className={styles.greeting}>
          Hi, <span>{userFirstName} {userLastName}!</span>
        </h1>
        <button className={styles.shareBtn} onClick={handleShare}>
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
