import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

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
   <section className="heroBanner bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
  <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center gap-8">
    <div className="md:w-1/2">
      <h1
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wide text-left"
      >
        Ma'lumotlarga asoslangan tushunchalar qulfini oching
      </h1>
      <p
        ref={textRef}
        className="text-lg sm:text-xl md:text-2xl mb-6 text-left"
      >
        Biznes qarorlaringizni amaliy tahlil va aqlli yechimlar bilan
        o‘zgartiring.
      </p>
      <button
        ref={buttonRef}
        className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Boshlash
      </button>
    </div>


  </div>
</section>

  );
};

export default Home;
