import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./style.module.css";
import axios from "axios";

export default function Account() {
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [admin, setAdmin] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    image: uploadedUrl,
    isActive: true,
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.post(
          "/auth/admin/verify",
          { token: Cookies.get("accessToken") },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
              "token-type": "access",
              "Content-Type": "application/json",
            },
          }
        );
        const { _id, name, email, image } = response.data;
        setAdmin({ _id, name, email, image });
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await axios.post("/admins/upload", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'json',
        });

      setUploadedUrl(response.data.url);
      setAdmin((prev) => ({
        ...prev,
        image: response.data.url,
      })) // Store the uploaded file's URL
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the image.");
    }
  };

  const handleSubmit = async (e) => {
    if (uploadedUrl) {
      e.preventDefault();

      // Validate fields
      for (const key in admin) {
        if (admin[key] === "" && key !== "image") {
          alert(`${key} cannot be empty`);
          return;
        }
      }

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.put(`/admins/${admin._id}`, {
          name: admin.name,
          email: admin.email,
          password: admin.password,
          role: admin.role,
          isActive: admin.isActive,
          image: uploadedUrl
        });

        alert("Admin updated successfully");
      } catch (error) {
        console.error("Error updating Admin:", error);
        alert("Failed to update admin");
      }
    }
  };

  return (
    <>
      <div className={styles.account}>
        <h1>Account Information</h1>
        <div className={styles.accountinfo}>
          <div className={styles.inputs}>
            <form onSubmit={handleSubmit}>
              <div className={styles.name}>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  value={admin.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.email}>
                <label>Email Address</label>
                <input
                  type='email'
                  name='email'
                  value={admin.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.password}>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  value={admin.password || ""}
                  placeholder='Enter new password'
                  onChange={handleChange}
                />
              </div>
              <button type='submit'>Save</button>
            </form>
          </div>
          <div className={styles.image}>
            <div className={styles.icon}>
              {admin.image ? (
                <img
                  src={admin.image}
                  alt={admin.name}
                  crossOrigin='anonymous'
                />
              ) : (
                <i className='fa fa-user-circle'></i>
              )}
            </div>
            <label htmlFor='admin-image'>Upload Image</label>
            <input
              style={{ display: "none" }}
              type='file'
              name='admin-image'
              id='admin-image'
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
