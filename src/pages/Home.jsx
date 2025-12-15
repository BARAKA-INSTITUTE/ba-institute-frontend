import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import { testimonials } from "@utils/constants";

const Home = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    return 1; 
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, testimonials.length - 1);

  const next = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [currentIndex]);

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0 })
      .fromTo(textRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0 }, "-=0.5")
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, "-=0.5")
      .fromTo(imageRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, "-=0.7");
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-100 text-white rounded-2xl mt-8" id="home">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ma'lumotlarga asoslangan tushunchalar qulfini oching
            </h1>
            <p ref={textRef} className="text-lg sm:text-xl mb-8 opacity-90">
              Biznes qarorlaringizni amaliy tahlil va aqlli yechimlar bilan o‘zgartiring.
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

      <section className="py-20 mt-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Mijozlarimiz Fikri
          </h2>

          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex" ref={carouselRef}>
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                      <div className="flex justify-center md:justify-end">
                        <div className="relative">
                          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-emerald-400 shadow-2xl">
                            <img
                              src={testimonial.img}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -inset-4 rounded-full border-4 border-white/20"></div>
                        </div>
                      </div>

                      <div className="text-white flex flex-col justify-center">
                        <div className="text-7xl md:text-9xl font-serif text-emerald-300 mb-6">“</div>
                        <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-10">
                          {testimonial.quote}
                        </p>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-lg text-emerald-300 mt-2">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white w-14 h-14 rounded-full hover:bg-white/30 flex items-center justify-center text-3xl z-10 transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white w-14 h-14 rounded-full hover:bg-white/30 flex items-center justify-center text-3xl z-10 transition"
            >
              ›
            </button>

            <div className="flex justify-center mt-12 gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-emerald-300 w-12" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
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