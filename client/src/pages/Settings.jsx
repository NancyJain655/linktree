import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { updateUser } from "../utils/apis/auth";

const Settings = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser((prev) => ({
        ...prev,
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
        password: "",
        confirmPassword: "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updatedData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password ? user.password : undefined,
      };

      const response = await updateUser(updatedData, token);

      setSuccess(response.message);
      localStorage.setItem("user", JSON.stringify(updatedData));

      // Trigger storage event manually to update Sidebar & Main
      window.dispatchEvent(new Event("storage"));

      setUser((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Main />
        <div className={styles.formContainer}>
          <div className={styles.sectionTitle}>
            <span>Edit Profile</span>
            <div className={styles.blackLine}></div>
            <div className={styles.greenBorder}></div>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>{success}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className={styles.saveButtonContainer}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
