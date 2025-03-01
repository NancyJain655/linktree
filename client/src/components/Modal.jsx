import React, { useState } from "react";
import styles from "../styles/Modal.module.css";
import { createLink } from "../utils/apis/link"; // Import the API function

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
  const [selectedTab, setSelectedTab] = useState(initialTab); // Internal state for tab switching
  const [title, setTitle] = useState(""); // Link title state
  const [url, setUrl] = useState(""); // Link URL state
  const [isLoading, setIsLoading] = useState(false);

  // Define application lists for both tabs
  const linkApps = [
    { name: "Instagram", icon: instagramIcon },
    { name: "Facebook", icon: facebookIcon },
    { name: "YouTube", icon: youtubeIcon },
    { name: "X", icon: xIcon },
  ];

  const shopApps = [
    { name: "Flipkart", icon: flipkartIcon },
    { name: "Amazon", icon: amazonIcon },
    { name: "Meesho", icon: meeshoIcon },
    { name: "Myntra", icon: myntraIcon },
  ];

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  // Handle toggle switch click -> Save link

  const handleToggle = async (event) => {
    const isActive = event.target.checked; // Get the toggle switch state
    
    if (!isActive) {
      return; // Do nothing if the toggle is turned off
    }
  
    const type = selectedTab === "Link" ? "link" : "shop";
  
    if (!title || !url) {
      alert("Title and URL are required");
      return;
    }
  
    console.log("Submitting:", { type, title, url }); // Debugging
  
    try {
      await createLink(type, title, url);
      alert("Link created successfully!");
      onClose(); // Close modal on success
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create link");
    }
  };
  
  
 

  return (
    <div className={styles.modalOverlay} onClick={handleBackgroundClick}>
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

          {/* Link Title & Toggle Switch */}
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
                onChange={handleToggle} // API call when toggled
                disabled={isLoading}
              />
              <label htmlFor="toggle"></label>
            </div>
          </div>

          {/* Link URL & Icons */}
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
              <img src={copy} alt="Copy" className={styles.iconImage} />
              <img src={deleteIcon} alt="Delete" className={styles.iconImage} />
            </div>
          </div>

          <hr className={styles.separator} /> {/* Grey horizontal line */}

          {/* Applications Section */}
          <label className={styles.title}>Applications</label>
          <div className={styles.applications}>
            {(selectedTab === "Link" ? linkApps : shopApps).map((app, index) => (
              <div className={styles.app} key={index}>
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
