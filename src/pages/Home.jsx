import React, { useRef, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = React.lazy(() => import("./About"));
const Services = React.lazy(() => import("./Services"));
const FAQ = React.lazy(() => import("./FAQ"));
// const Testimonials = React.lazy(() => import("./Testimonials"));
const Contact = React.lazy(() => import("./Contact"));

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(textRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
        .fromTo(imageRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1.2 }, "-=0.8");

      gsap.to(imageRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroSectionRef}
        className="relative overflow-hidden rounded-2xl mt-8 heroBanner"
        id="home"
      >
        <div className=" absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p ref={textRef} className="text-lg sm:text-xl mb-8 opacity-90">
              {t('hero.subtitle')}
            </p>
            <button
              ref={buttonRef}
              className="font-bold px-8 py-4 rounded-xl shadow-2xl transition transform hover:scale-105 bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-400"
            >
              {t('hero.button')}
            </button>
          </div>

      
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center">{t('loading')}</div>}>
        <section id="about">
          <About isDarkMode={isDarkMode} />
        </section>

        <section id="services">
          <Services isDarkMode={isDarkMode} />
        </section>

        <section id="faq">
          <FAQ isDarkMode={isDarkMode} />
        </section>

        {/* <section id="testimonials">
          <Testimonials />
        </section> */}

        <section id="contact">
          <Contact />
        </section>
      </Suspense>
    </>
  );
};

export default Home;