import React from 'react';
import styles from './Settings.module.css';
import logo from '../assets/logo.png';
import iconLinks from '../assets/IconLinks.png';
import iconAppearance from '../assets/IconAppearance.png';
import iconAnalytics from '../assets/IconAnalytics.png';
import iconSettings from '../assets/IconSettings.png';
import userAvatar from '../assets/ImageBoy.png';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const Settings = () => {
  return (
    <div className={styles.container}>
      
      <Sidebar/>

      {/* Main Content */}
      <div className={styles.content}>
        <Main/>

        {/* Profile Form */}
        <div className={styles.formContainer}>
          <div className={styles.sectionTitle}>
            <span>Edit Profile</span>
            <div className={styles.blackLine}></div> {/* Black Line */}
  <div className={styles.greenBorder}></div> {/* Green Border Overlapping */}
          </div>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>First name</label>
              <input type="text" defaultValue="Jenny" />
            </div>

            <div className={styles.inputGroup}>
              <label>Last name</label>
              <input type="text" defaultValue="Wilson" />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" defaultValue="JennyWilson08@gmail.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" defaultValue="**********" />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input type="password" defaultValue="**********" />
            </div>

            <div className={styles.saveButtonContainer}>
              <button type="submit" className={styles.saveButton}>Save</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Settings;
