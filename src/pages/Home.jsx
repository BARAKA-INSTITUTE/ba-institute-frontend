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
  const ctaButtonsRef = useRef(null);
  const heroSectionRef = useRef(null);
  const introRef = useRef(null);
  const programsRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline();
      tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(textRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .fromTo(ctaButtonsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");

      // Intro section animation
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Programs section animation
      if (programsRef.current) {
        const programCards = programsRef.current.querySelectorAll(".program-card");
        gsap.fromTo(
          programCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: programsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Value proposition animation
      if (valueRef.current) {
        const benefitCards = valueRef.current.querySelectorAll(".benefit-card");
        gsap.fromTo(
          benefitCards,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: valueRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section with CTA Buttons - AC-3.1, AC-3.2, AC-3.3 */}
      <section
        ref={heroSectionRef}
        className="relative overflow-hidden rounded-2xl mt-8 heroBanner"
        id="home"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white max-w-4xl">
            {t('hero.title')}
          </h1>
          <p ref={textRef} className="text-base sm:text-lg md:text-xl mb-8 opacity-90 text-white max-w-3xl">
            {t('hero.subtitle')}
          </p>
          
          {/* Prominent CTA Buttons - Visible without scrolling */}
          <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={scrollToServices}
              className="font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl transition transform hover:scale-105 bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-400 text-base sm:text-lg"
            >
              {t('hero.ctaExplore')}
            </button>
            <button
              onClick={scrollToContact}
              className="font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl transition transform hover:scale-105 bg-white text-emerald-600 hover:bg-gray-100 border-2 border-white text-base sm:text-lg"
            >
              {t('hero.ctaContact')}
            </button>
          </div>
        </div>
      </section>

      {/* Institute Introduction Section - AC-2.1 */}
      <section 
        ref={introRef}
        className={`max-w-7xl mx-auto px-6 py-16 md:py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'} rounded-2xl mt-12`}
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('homeIntro.title')}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('homeIntro.description')}
          </p>
        </div>
      </section>

      {/* Programs Overview Section - AC-2.2 */}
      <section 
        ref={programsRef}
        className="max-w-7xl mx-auto px-6 py-16 md:py-20"
      >
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('programsOverview.title')}
          </h2>
          <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('programsOverview.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t('programsOverview.programs', { returnObjects: true }).map((program, index) => (
            <div
              key={index}
              className={`program-card p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {program.title}
              </h3>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition Section - AC-2.3 */}
      <section 
        ref={valueRef}
        className={`max-w-7xl mx-auto px-6 py-16 md:py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-gradient-to-br from-emerald-50 to-blue-50'} rounded-2xl`}
      >
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('valueProposition.title')}
          </h2>
          <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('valueProposition.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t('valueProposition.benefits', { returnObjects: true }).map((benefit, index) => (
            <div
              key={index}
              className={`benefit-card p-6 rounded-xl shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {benefit.title}
              </h3>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {benefit.description}
              </p>
            </div>
          ))}
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