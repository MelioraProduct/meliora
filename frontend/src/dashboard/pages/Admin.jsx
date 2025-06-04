import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/joy/Button";
import styles from "./style.module.css";
// import useAdminAuth from "../../hooks/useAdminAuth";

export default function Admin() {
  const [nav, setNav] = useState(false);
  // const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.adminHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src='/images/assets/logo.png'
            alt='Meliora Logo'
          />
        </div>
        
        <nav className={`${styles.nav} ${nav ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to='/admin/dashboard' className={styles.navLink}>
                Dashboard
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/admin/orders' className={styles.navLink}>
                Orders
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/admin/products' className={styles.navLink}>
                Products
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/admin/packages' className={styles.navLink}>
                Packages
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/admin/blogs' className={styles.navLink}>
                Blogs
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/admin/account' className={styles.navLink}>
                Account
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <Button 
            onClick={() => navigate("/")} 
            variant="solid"
            color="primary"
            className={styles.logoutButton}
          >
            Logout
          </Button>
          <button 
            className={styles.menuButton}
            onClick={() => setNav(!nav)}
          >
            {nav ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
