"use client";
import { cn } from "../lib/utils";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAuth from "../redux/useAuth";
import { useNavigate } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      lastScrollY = currentScrollY;
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const handleLogin = async () => {
    navigate("/signin");
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-5 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className='block sm:hidden'>{navItem.icon}</span>
          <span className='hidden sm:block text-sm'>{navItem.name}</span>
        </a>
      ))}
      <button className='border text-xs sm:text-sm capitalize font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full'>
        {auth.isAuthenticated ? (
          <span onClick={logout}>Log Out</span>
        ) : (
          <span onClick={handleLogin}>Log In</span>
        )}
        <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px' />
      </button>
    </motion.div>
  );
};

/* Dynamic and auth by Wali Muhammad Github: WaliMuhammadAhmad */
