import React from "react";
import styles from "./style.module.css";

const WhatsAppLink = ({ product }) => {
  const phoneNumber = "+92 301 4666999";
  const message = `Hello, I have a question about ${product}!`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    // if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
    }
  };

  return (
    <span className={styles.whatsapplogo} onClick={handleClick}>
      <img src='/images/WhatsApp.png' alt='Contact WhatsApp' />
    </span>
  );
};

export default WhatsAppLink;
