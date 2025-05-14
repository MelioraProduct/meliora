import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.css";

const WhatsAppLink = ({ product }) => {
  const phoneNumber = "+923204023398";
  const message = product ? `Hello, I have a question about ${product}!` : "Hello, I have a question!";

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
      <FaWhatsapp className="text-4xl text-green-500" />
    </span>
  );
};

export default WhatsAppLink;
