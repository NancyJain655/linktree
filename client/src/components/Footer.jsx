import React from "react";
import styles from "../styles/Footer.module.css";
import twitterIcon from "../assets/twitter.png"; 
import instaIcon from "../assets/insta.png";
import fireIcon from "../assets/fire.png";
import musicIcon from "../assets/music.png";
import youtubeIcon from "../assets/youtube.png";
import { useNavigate } from "react-router-dom"; 


const Footer = () => {
   const navigate = useNavigate(); // Hook for navigation
  
    const handleSignUp = () => {
      navigate("/signup"); // Redirect to Signup page
    };
    const handleLogin = () => {
      navigate("/login"); // Redirect to Signup page
    };
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Top section: Buttons on left, Links on right */}
        <div className={styles.footerTop}>
          <div className={styles.authButtons}>
            <button className={styles.loginBtn} onClick={handleLogin}>Log in</button>
            <button className={styles.signUpBtn}onClick={handleSignUp}>Sign up free</button>
          </div>

          <div className={styles.links}>
            <div>
              <p>About Spark</p>
              <p>Blog</p>
              <p>Press</p>
              <p>Social Good</p>
              <p>Contact</p>
            </div>
            <div>
              <p>Careers</p>
              <p>Getting Started</p>
              <p>Features and How-Tos</p>
              <p>FAQs</p>
              <p>Report a Violation</p>
            </div>
            <div>
              <p>Terms and Conditions</p>
              <p>Privacy Policy</p>
              <p>Cookie Notice</p>
              <p>Trust Center</p>
            </div>
          </div>
        </div>

        {/* Bottom section: Acknowledgment on left, Social icons on right */}
        <div className={styles.footerBottom}>
          <p className={styles.acknowledgment}>
            We acknowledge the Traditional Custodians of the land on which our office stands, 
            The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
          </p>

          <div className={styles.socialIcons}>
            <span><img src={twitterIcon} alt="twitter" className={styles.twitterImage} /></span> 
            <span><img src={instaIcon} alt="twitter" className={styles.instaImage} /></span>
             <span><img src={fireIcon} alt="twitter" className={styles.fireImage} /></span>
              <span><img src={musicIcon} alt="twitter" className={styles.musicImage} /></span> 
              <span><img src={youtubeIcon} alt="twitter" className={styles.youtubeImage} /></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
