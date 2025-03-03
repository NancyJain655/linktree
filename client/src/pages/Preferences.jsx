import React, { useState, useEffect } from "react";
import styles from "./Preferences.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { updateUserAgain } from "../utils/apis/auth"; // Import API function
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Preferences = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username, setUsername] = useState(""); // Store username input
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const categories = [
    { id: "Business", name: "Business", icon: "🏢" },
    { id: "Creative", name: "Creative", icon: "🎨" },
    { id: "Education", name: "Education", icon: "📚" },
    { id: "Entertainment", name: "Entertainment", icon: "🎵" },
    { id: "Fashion & Beauty", name: "Fashion & Beauty", icon: "💅" },
    { id: "Food & Beverage", name: "Food & Beverage", icon: "🍕" },
    { id: "Government & Politics", name: "Government & Politics", icon: "⚖️" },
    { id: "Health & Wellness", name: "Health & Wellness", icon: "🍎" },
    { id: "Non-Profit", name: "Non-Profit", icon: "💖" },
    { id: "Other", name: "Other", icon: "💡" },
    { id: "Tech", name: "Tech", icon: "💻" },
    { id: "Travel & Tourism", name: "Travel & Tourism", icon: "✈️" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);

    }
  }, [navigate]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("No token,Log in again","error")
      navigate("/login");
      return;
    }

    if (!selectedCategory || !username.trim()) {
      showToast("Please enter a username and select a category.","error");
      return;
    }

    try {
      await updateUserAgain(token, username, selectedCategory);
      showToast("username and preference set successfully","success");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after toast is displayed
      }, 2000);
    } catch (error) {
      showToast("Failed to update user. Please try again.","error");
    }
  };

  if (isAuthenticated === null) {
    return null; // Prevent rendering until authentication check completes
  }

  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.leftSection}>
        <img src={logo} alt="Spark Logo" className={styles.logo} />
        <div className={styles.contentWrapper}>
          <h1>Tell us about yourself</h1>
          <p>For a personalized Spark experience</p>

          <input
            type="text"
            placeholder="Tell us your username"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <button className={styles.continueButton} onClick={handleUpdate}>
            Continue
          </button>
        </div>
      </div>

      <div className={styles.rightSection}></div>
    </div>
  );
};

export default Preferences;
