import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconShoppingCart,
  IconBuildingStore,
  IconLibrary,
  IconBriefcase,
} from "@tabler/icons-react";
import useAuth from "../redux/useAuth";

export default function Navbar() {
  const { auth } = useAuth();

  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className='h-4 w-4 text-gray-600' />,
    },
    {
      name: "Products",
      link: "/#products",
      icon: (
        <IconShoppingCart className='h-4 w-4 text-gray-600' />
      ),
    },
    {
      name: "Portfolio",
      link: "/portfolio",
      icon: (
        <IconBriefcase className='h-4 w-4 text-gray-600' />
      ),
    },
    {
      name: "WholeSale",
      link: "#wholeSale",
      icon: (
        <IconBuildingStore className='h-4 w-4 text-gray-600' />
      ),
    },
    {
      name: "Blogs",
      link: "#blogs",
      icon: (
        <IconLibrary className='h-4 w-4 text-gray-600' />
      ),
    },
    {
      name: "Reviews",
      link: "#reviews",
      icon: (
        <IconMessage className='h-4 w-4 text-gray-600' />
      ),
    },
    {
      name: "Panel",
      link: "/admin",
      icon: <IconUser className='h-4 w-4 text-gray-600' />,
    },
  ];

  if (auth.isAuthenticated) {
    navItems.splice(5, 0, {
      name: "Profile",
      link: "/profile",
      icon: <IconUser className='h-4 w-4 text-gray-600' />,
    });
  }

  return (
    <div className='relative w-full'>
      <FloatingNav navItems={navItems} />
    </div>
  );
}
