import React from "react";
import Products from "../components/Products";
import { Reviews } from "../components/Reviews";
import Blogs from "../components/Blogs";
import logo from "../assets/logoSVG.png";
import Navbar from "../components/Navbar";
import WholeSale from "../components/WholeSale";

export default function Home() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative' style={{ backgroundColor: "black" }}>
      <Navbar />
      <section id='home' className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img
            src={logo}
            alt='Meliora Logo'
            className='w-60 md:w-72'
          />
          <div className='text-3xl md:text-7xl font-bold text-white text-center'>
            Meliora Products
            <div className='font-extralight text-base md:text-4xl text-neutral-200 py-4'>
              Elevating Cleanliness, Empowering Excellence
            </div>
          </div>
          <button 
            onClick={scrollToProducts}
            className='bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-neutral-200 transition-colors'
          >
            Shop now
          </button>
        </div>
      </section>

      <section id='products' className="py-20">
        <Products />
      </section>
      <section id='wholeSale' className="py-20">
        <WholeSale />
      </section>
      <section id='blogs' className="py-20">
        <Blogs />
      </section>
      <section id='reviews' className="py-20">
        <Reviews />
      </section>
    </div>
  );
}
