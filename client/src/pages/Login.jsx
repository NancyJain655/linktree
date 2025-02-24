import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import loginImage from "../assets/login-image.png";
import disappear from "../assets/disappear.png";
import showpass from "../assets/showpass.png";
import { loginUser } from "../utils/apis/auth"; // Import API function

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      const data = await loginUser(email, password);
      
      // Store token in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to links page
      navigate("/links");
    } catch (err) {
      setError(err); // Show error message
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Spark Logo" className={styles.logo} />
        <h2 className={styles.title}>Sign in to your Spark</h2>

        {error && <p className={styles.errorText}>{error}</p>} {/* Error message */}

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Spark/ Username"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? (
              <img src={disappear} alt="Hide Password" />
            ) : (
              <img src={showpass} alt="Show Password" className={styles.show} />
            )}
          </span>
        </div>

        <button className={styles.loginBtn} onClick={handleLogin}>
          Log in
        </button>

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className={styles.signupLink}>
            Sign up
          </span>
        </p>
        <p className={styles.termsText}>
          This site is protected by reCAPTCHA and the 
          <a href="#" className={styles.link}> Google Privacy Policy</a> 
          &nbsp;and&nbsp;
          <a href="#" className={styles.link}> Terms of Service</a> apply.
        </p>
      </div>

      <div className={styles.rightSection}>
        <img src={loginImage} alt="Artistic Image" className={styles.image} />
      </div>
    </div>
  );
};

export default Login;
