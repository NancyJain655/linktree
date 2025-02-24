import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 
import userAvatar from "../assets/ImageBoy.png"; 
import iconAnalytics from "../assets/IconAnalytics.png";
import iconAppearance from "../assets/IconAppearance.png";
import iconSettings from "../assets/IconSettings.png";
import iconLinks from "../assets/IconLinks.png";
import iconSignOut from "../assets/logout.png"; // Add the sign-out icon

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="Logo" />

      <NavLink to="/links" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
        <img src={iconLinks} alt="Links" />
        <label>Links</label>
      </NavLink>

      <NavLink to="/appearance" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
        <img src={iconAppearance} alt="Appearance" />
        <label>Appearance</label>
      </NavLink>

      <NavLink to="/analytics" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
        <img src={iconAnalytics} alt="Analytics" />
        <label>Analytics</label>
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
        <img src={iconSettings} alt="Settings" />
        <label>Settings</label>
      </NavLink>

      {/* User Profile Section */}
      <div className={styles.userProfile} onClick={() => setShowModal(!showModal)}>
        <img src={userAvatar} alt="User" />
        <h4 className={styles.italicText}>Jenny Wilson</h4>
      </div>

      {/* Sign-Out Modal */}
      {showModal && (
        <div className={styles.modal}>
          <button className={styles.signOutButton}>
            <img src={iconSignOut} alt="Sign Out" className={styles.signOutIcon} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
