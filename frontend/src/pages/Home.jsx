import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";
import Products from "../components/Products";
import { Reviews } from "../components/Reviews";
import { WaveAd } from "../components/WaveAd";
import Blogs from "../components/Blogs";
import logo from "../assets/logoSVG.png";
import Navbar from "../components/Navbar";
import WholeSale from "../components/WholeSale";

const words = [
  "Eco-Friendly Solutions",
  "Advanced Cleaning Tech",
  "High-Efficiency",
  "Industrial Strength",
  "Safe for Home Use",
  "Surface Protection",
  "Fast-Acting Formulas",
  "Non-Toxic Ingredients",
  "Odor Neutralization",
  "Multi-Purpose Use",
  "Long-Lasting",
  "Cost-Effective Solutions",
  "Heavy-Duty Cleaning",
  "Stain Removal",
];

export default function Home() {
  return (
    <div className='relative' style={{ backgroundColor: "black" }}>
      <Navbar />
      <section id='home'>
        <AuroraBackground>
          <div className='relative flex flex-col gap-4 items-center justify-center px-4'>
            <img
              src={logo}
              alt='Meliora Logo'
              className='w-60 md:w-72'
              style={{ marginTop: "-6%" }}
            />
            <div
              className='text-3xl md:text-7xl font-bold dark:text-white text-center'
              style={{ marginTop: "-12%" }}>
              Meliora Products <br />
              <span className='font-extralight text-base md:text-4xl dark:text-neutral-200 py-4'>
                <FlipWords words={words} duration={3000} />
              </span>
            </div>
            <div className='font-extralight text-base md:text-2xl dark:text-neutral-200 py-4'>
              Elevating Cleanliness, Empowering Excellence.
            </div>
            <button className='bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2'>
              Shop now
            </button>
          </div>
        </AuroraBackground>
      </section>
      <section id='products'>
        <Products />
      </section>
      <section id='wholeSale'>
        <WholeSale />
      </section>
      <section id='blogs'>
        <Blogs />
      </section>
      <section id='reviews'>
        <Reviews />
      </section>
      <WaveAd />
    </div>
  );
}
