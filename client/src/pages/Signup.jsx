import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import logo from "../assets/logo.png";
import signupImage from "../assets/login-image.png";
import { registerUser } from "../utils/apis/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsChecked: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password validation regex
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[@$!%*?&]/;

  // Handle input change
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    setFormErrors({ ...formErrors, [id]: [] }); // Reset error on typing
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    //if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";

    // Password validation
    let passwordErrors = [];
    if (!formData.password.trim()) {
      passwordErrors.push("Please enter a password");
    } else {
      if (formData.password.length < 8) {
        passwordErrors.push("The password must be 8 characters long.");
      }
      if (
        !uppercaseRegex.test(formData.password) ||
        !lowercaseRegex.test(formData.password) ||
        !numberRegex.test(formData.password) ||
        !specialCharRegex.test(formData.password)
      ) {
        passwordErrors.push(
          "Please choose a strong password that includes 1 uppercase and lowercase letter, a number, as well as a special character."
        );
      }
    }
    if (passwordErrors.length > 0) errors.password = passwordErrors;

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please enter confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "The password you entered does not match.";
    }

    if (!formData.termsChecked) errors.termsChecked = "You must accept the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      const response = await registerUser(formData);
  
      if (response.token) {
        localStorage.setItem("token", response.token); // Store token in localStorage
  
        if (localStorage.getItem("token")) { // Check if token is actually stored
          navigate("/preferences"); // Redirect only if token is present
        }
      } else {
        alert(response.msg); // Show error message if no token is returned
      }
    } catch (err) {
      setFormErrors({ ...formErrors, general: err.msg || "The password is incorrect." });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Spark Logo" className={styles.logo} />
        <h2 className={styles.title}>Sign up to your Spark</h2>
        <p className={styles.subtitle}>
          Create an account
          <span className={styles.signin} onClick={() => navigate("/login")}> Sign in instead</span>
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.label}>First name</label>
            <input type="text" id="firstName" className={styles.input} value={formData.firstName} onChange={handleChange} />
            {formErrors.firstName && <p className={styles.error}>{formErrors.firstName}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.label}>Last name</label>
            <input type="text" id="lastName" className={styles.input} value={formData.lastName} onChange={handleChange} />
            {formErrors.lastName && <p className={styles.error}>{formErrors.lastName}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" id="email" className={styles.input} value={formData.email} onChange={handleChange} />
            {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" id="password" className={styles.input} value={formData.password} onChange={handleChange} />
            {formErrors.password && (
              <div className={styles.error}>
                {formErrors.password.map((msg, index) => (
                  <p key={index} className={styles.error}>{msg}</p>
                ))}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input type="password" id="confirmPassword" className={styles.input} value={formData.confirmPassword} onChange={handleChange} />
            {formErrors.confirmPassword && <p className={styles.error}>{formErrors.confirmPassword}</p>}
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="termsChecked" className={styles.checkbox} checked={formData.termsChecked} onChange={handleChange} />
            <label htmlFor="termsChecked">
              By creating an account, I agree to the
              <a href="#" className={styles.link}> Terms of use </a>
              &nbsp;and&nbsp;
              <a href="#" className={styles.link}> Privacy Policy</a>
            </label>
          </div>
          {formErrors.termsChecked && <p className={styles.error}>{formErrors.termsChecked}</p>}

          {formErrors.general && <p className={styles.error}>{formErrors.general}</p>}

          <button className={styles.signupBtn} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create an account"}
          </button>
        </form>
        <p className={styles.termsText}>
                  This site is protected by reCAPTCHA and the 
                  <a href="#" className={styles.link}> Google Privacy Policy</a> 
                  &nbsp;and&nbsp;
                  <a href="#" className={styles.link}> Terms of Service</a> apply.
                </p>
      </div>

      <div className={styles.rightSection}>
        <img src={signupImage} alt="Signup Image" className={styles.image} />
      </div>
    </div>
  );
};

export default Signup;
