import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconShoppingCart,
  IconBuildingStore,
  IconLibrary,
} from "@tabler/icons-react";
import useAuth from "../redux/useAuth";

export default function Navbar() {
  const { auth } = useAuth();

  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: "Products",
      link: "/#products",
      icon: (
        <IconShoppingCart className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "WholeSale",
      link: "#wholeSale",
      icon: (
        <IconBuildingStore className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Blogs",
      link: "#blogs",
      icon: (
        <IconLibrary className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Reviews",
      link: "#reviews",
      icon: (
        <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Panel",
      link: "/admin",
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
  ];

  if (auth.isAuthenticated) {
    navItems.splice(5, 0, {
      name: "Profile",
      link: "/profile",
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    });
  }

  return (
    <div className='relative w-full'>
      <FloatingNav navItems={navItems} />
    </div>
  );
}
