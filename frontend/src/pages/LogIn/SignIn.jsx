import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../redux/useAuth";
import CustomAlert from "../../components/CustomAlert";
import { validateEmail, validatePassword } from "../../utils/validation";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", text: "", open: false });

  const handleCloseAlert = () => setAlert((prev) => ({ ...prev, open: false }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({ email: emailError, password: passwordError });

    // Stop submission if there are errors
    if (emailError || passwordError) return;

    try {
      await login(formData.email, formData.password);
      setAlert({ type: "success", text: "Sign in successful!", open: true });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setAlert({
        type: "error",
        text: error || "Invalid credentials",
        open: true,
      });
    }
  };

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      {alert.open && (
        <CustomAlert
          type={alert.type}
          text={alert.text}
          show={alert.open}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign In</h1>
        <form method='POST' className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`${styles.input} ${
                errors.email ? styles.invalid : styles.valid
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
                errors.password ? styles.invalid : styles.valid
              }`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input type='submit' className={styles.button} value='Sign In' />
          </div>
        </form>

        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <span
            className={styles.link}
            onClick={() => {
              navigate("/signup");
            }}>
            Sign Up
          </span>
        </p>

        <div className={styles.socialContainer}>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.google}`}>
            Sign in with Google
          </button>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.facebook}`}>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
