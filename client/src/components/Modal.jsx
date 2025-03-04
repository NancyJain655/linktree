import React, { useState } from "react";
import styles from "../styles/Modal.module.css";
import { createLink } from "../utils/apis/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import instagramIcon from "../assets/icons/instagram.png";
import facebookIcon from "../assets/icons/facebook.png";
import youtubeIcon from "../assets/icons/youtube.png";
import xIcon from "../assets/icons/x.png";
import deleteIcon from "../assets/icons/deleteIcon.png";
import copy from "../assets/icons/copy.png";
import flipkartIcon from "../assets/icons/flipkart.png";
import amazonIcon from "../assets/icons/amazon.png";
import meeshoIcon from "../assets/icons/meesho.png";
import myntraIcon from "../assets/icons/myntra.png";

const Modal = ({ onClose, selectedTab: initialTab }) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const linkApps = [
    { name: "Instagram", icon: instagramIcon, url: "https://www.instagram.com/" },
    { name: "Facebook", icon: facebookIcon, url: "https://www.facebook.com/" },
    { name: "YouTube", icon: youtubeIcon, url: "https://www.youtube.com/" },
    { name: "X", icon: xIcon, url: "https://www.x.com/" },
  ];

  const shopApps = [
    { name: "Flipkart", icon: flipkartIcon, url: "https://www.flipkart.com/" },
    { name: "Amazon", icon: amazonIcon, url: "https://www.amazon.com/" },
    { name: "Meesho", icon: meeshoIcon, url: "https://www.meesho.com/" },
    { name: "Myntra", icon: myntraIcon, url: "https://www.myntra.com/" },
  ];

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

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
        background: type === "success" ? "green" : "red",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
      },
      type: type,
    });
  };

  const handleToggle = async (event) => {
    const isActive = event.target.checked;
    console.log("Checkbox toggled:", isActive); // Debugging line

    if (!isActive) return; // Do nothing if the toggle is off

    // Check if both title and URL are filled out
    if (!title || !url) {
      showToast("Title and URL are required", "error");
      console.log("Title or URL missing, cannot create link."); // Debugging line
      return;
    }

    const type = selectedTab === "Link" ? "link" : "shop";
    console.log("Creating link of type:", type); // Debugging line

    setIsLoading(true); // Set loading state to true

    try {
      console.log("Calling createLink API with title:", title, "and url:", url); // Debugging line
      await createLink(type, title, url); // Call API to create the link
      showToast("Link created successfully!", "success");
      onClose();
    } catch (error) {
      console.error("Error creating link:", error); // Debugging line
      showToast(error.response?.data?.message || "Failed to create link", "error");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const handleCopyUrl = () => {
    if (!url) {
      showToast("No URL to copy", "error");
      return;
    }
    navigator.clipboard.writeText(url);
    showToast("URL copied to clipboard!", "success");
  };

  const handleDeleteUrl = () => {
    setUrl("");
    showToast("URL cleared!", "success");
  };

  const handleAppClick = (appUrl) => {
    console.log("App clicked, setting URL to:", appUrl); // Debugging line
    setUrl(appUrl);  // Set the URL when an app is clicked
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackgroundClick}>
      <ToastContainer />
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.frameButtons}>
            <button
              className={`${styles.tabBtn} ${selectedTab === "Link" ? styles.active : ""}`}
              onClick={() => setSelectedTab("Link")}
            >
              Link
            </button>
            <button
              className={`${styles.tabBtn} ${selectedTab === "Shop" ? styles.active : ""}`}
              onClick={() => setSelectedTab("Shop")}
            >
              Shop
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <label className={styles.title}>Enter URL</label>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Link title"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.toggleSwitch}>
              <input
                type="checkbox"
                id="toggle"
                onChange={handleToggle}
                disabled={isLoading}
              />
              <label htmlFor="toggle"></label>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Link URL"
                className={styles.input}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className={styles.iconButtons}>
              <img src={copy} alt="Copy" className={styles.iconImage} onClick={handleCopyUrl} />
              <img src={deleteIcon} alt="Delete" className={styles.iconImage} onClick={handleDeleteUrl} />
            </div>
          </div>

          <hr className={styles.separator} />

          <label className={styles.title}>Applications</label>
          <div className={styles.applications}>
            {(selectedTab === "Link" ? linkApps : shopApps).map((app, index) => (
              <div className={styles.app} key={index} onClick={() => handleAppClick(app.url)}>
                <div className={styles.image}>
                  <img
                    src={app.icon}
                    alt={app.name}
                    className={app.name === "Instagram" ? styles.instagramIconBg : ""}
                  />
                </div>
                <span>{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
