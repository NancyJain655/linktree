import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/Header.module.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to Signup page
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
       
        <img src={logo} alt="Spark Logo" className={styles.logo} />
        <span className={styles.marketplace}> | Marketplace</span>
      </div>
      <button className={styles.signUpBtn} onClick={handleSignUp}>
        Sign up free
      </button>
    </header>
  );
};

export default Header;
