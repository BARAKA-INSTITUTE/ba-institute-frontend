import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

const Home = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0 })
      .fromTo(
        textRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0 },
        "-=0.7"
      );
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden bg-emerald-100 text-white rounded-2xl mt-8"
        id="home"
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Ma'lumotlarga asoslangan tushunchalar qulfini oching
            </h1>
            <p ref={textRef} className="text-lg sm:text-xl mb-8 opacity-90">
              Biznes qarorlaringizni amaliy tahlil va aqlli yechimlar bilan
              o‘zgartiring.
            </p>
            <button
              ref={buttonRef}
              className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-105"
            >
              Boshlash
            </button>
          </div>

          <div ref={imageRef} className="md:w-1/2 flex justify-center">
            <img
              src="hero-banner-main.jpg"
              alt="Analytics dashboard"
              className="w-full max-w-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;
