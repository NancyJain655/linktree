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

    if (!isActive) return;

    const type = selectedTab === "Link" ? "link" : "shop";

    if (!title || !url) {
      showToast("Title and URL are required", "error");
      return;
    }

    try {
      await createLink(type, title, url);
      showToast("Link created successfully!", "success");
      onClose();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to create link", "error");
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
