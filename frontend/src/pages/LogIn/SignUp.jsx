import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import useAuth from "../../redux/useAuth";
import CustomAlert from "../../components/CustomAlert";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../utils/validation";

export default function SignUp() {
  const navigate = useNavigate();
  const { auth, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", text: "", open: false });

  const handleCloseAlert = () => setAlert((prev) => ({ ...prev, open: false }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ name: nameError, email: emailError, password: passwordError });
    if (nameError || emailError || passwordError) {
      return;
    }

    if (
      formData.name === auth.user?.name &&
      formData.email === auth.user?.email
    ) {
      setAlert({
        type: "error",
        text: "User session already exists with this email. Use a different email to create a new account.",
        open: true,
      });
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setAlert({
        type: "success",
        text: "Account created! Please sign in.",
        open: true,
      });
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      setAlert({
        type: "error",
        text: error || "Invalid credentials",
        open: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {alert.open && (
        <CustomAlert
          type={alert.type}
          text={alert.text}
          show={alert.open}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='name' className={styles.label}>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Enter your name'
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`${styles.input} ${
                errors.email ? styles.invalid : ""
              }`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='password' className={styles.label}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className={`${styles.input} ${
                errors.password ? styles.invalid : ""
              }`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <button type='submit' className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.redirectText}>
          Already Registered?{" "}
          <span className={styles.link} onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>

        <div className={styles.socialContainer}>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.google}`}>
            Sign up with Google
          </button>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.facebook}`}>
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
