import React, { useState,useEffect} from "react";
import styles from "./Preferences.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Preferences = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null
  const categories = [
    { id: 1, name: "Business", icon: "🏢" },
    { id: 2, name: "Creative", icon: "🎨" },
    { id: 3, name: "Education", icon: "📚" },
    { id: 4, name: "Entertainment", icon: "🎵" },
    { id: 5, name: "Fashion & Beauty", icon: "💅" },
    { id: 6, name: "Food & Beverage", icon: "🍕" },
    { id: 7, name: "Government & Politics", icon: "⚖️" },
    { id: 8, name: "Health & Wellness", icon: "🍎" },
    { id: 9, name: "Non-Profit", icon: "💖" },
    { id: 10, name: "Other", icon: "💡" },
    { id: 11, name: "Tech", icon: "💻" },
    { id: 12, name: "Travel & Tourism", icon: "✈️" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if token is missing
    } else {
      setIsAuthenticated(true); // Set authentication state
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return null; // Show nothing until the check completes
  } 

  return (
    <div className={styles.container}>
    <div className={styles.leftSection}>
  <img src={logo} alt="Spark Logo" className={styles.logo} />
  
  <div className={styles.contentWrapper}>
    <h1>Tell us about yourself</h1>
    <p>For a personalized Spark experience</p>

    <input
      type="text"
      placeholder="Tell us your username"
      className={styles.inputField}
    />

    <h3>Select one category that best describes your Linktree:</h3>
    <div className={styles.categories}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${styles.categoryButton} ${
            selectedCategory === category.id ? styles.selected : ""
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>

    <button className={styles.continueButton} onClick={() => navigate("/links")}>
      Continue
    </button>
  </div>
</div>

      <div className={styles.rightSection}></div>
    </div>
  );
};

export default Preferences;
