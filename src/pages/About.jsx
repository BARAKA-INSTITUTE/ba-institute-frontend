import { aboutUs, teamMembers } from "@utils/constants";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const aboutSectionRef = useRef(null);
  const missionSectionRef = useRef(null);
  const teamSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const teamCardsRef = useRef([]);
  const [flippedIndices, setFlippedIndices] = useState({});

  const setFlip = (index, isFlipped) => {
    setFlippedIndices((prev) => ({
      ...prev,
      [index]: isFlipped,
    }));
  };

  const handleMouseEnter = (index) => setFlip(index, true);
  const handleMouseLeave = (index) => setFlip(index, false);
  const handleTouchStartCard = (index) => setFlip(index, true);
  const handleTouchEndCard = (index) => {
    setTimeout(() => setFlip(index, false), 600);
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, teamMembers.length - visibleCount);

  const next = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, maxIndex]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (teamMembers.length > visibleCount) {
      const interval = setInterval(next, 5000);
      return () => clearInterval(interval);
    }
  }, [visibleCount, next]);

  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${(currentIndex * 100) / visibleCount}%`,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
  }, [currentIndex, visibleCount]);

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        aboutSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        missionSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        teamSectionRef.current.querySelector("h2"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      teamCardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* about us  */}
      <div
        ref={aboutSectionRef}
        className="sided-about-us flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto   mt-10"
      >
        <div className="about-us text-part flex-1 flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl font-bold ">{t('aboutUs.title')}</h1>
          <p className="text-lg leading-relaxed ">
            {t('aboutUs.description')}
          </p>
        </div>

        <div className={`img-part flex-1 rounded-xl overflow-hidden border-2 hover:scale-105 cursor-pointer transition-transform duration-300 shadow-lg w-full h-64 md:h-auto ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}>
          {aboutUs.find((item) => item.id === 2)?.img && (
            <img
              src={aboutUs.find((item) => item.id === 2)?.img}
              alt="who we are"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      {/* our mission */}
      <div
        ref={missionSectionRef}
        className="sided-our-mission flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto  mt-10"
      >
        <div className={`img-part rounded-xl flex-1 overflow-hidden border-2 hover:scale-105 cursor-pointer transition-transform duration-300 shadow-lg w-full h-64 md:h-auto ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}>
          {aboutUs.find((item) => item.id === 3)?.img && (
            <img
              src={aboutUs.find((item) => item.id === 3)?.img}
              alt="what is our mission"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="about-us text-part flex-1 flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl font-bold ">{t('aboutUs.missionTitle')}</h1>
          <p className="text-lg leading-relaxed ">
            {t('aboutUs.missionDescription')}
          </p>
        </div>
      </div>
      {/* our team members  */}
      <div ref={teamSectionRef} className="our-team-section py-16 mt-10 mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center  mb-12">
            {t('aboutUs.teamTitle')}
          </h2>

          <div className="relative">
            <div
              className="overflow-hidden touch-pan-x"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex" ref={carouselRef}>
                {teamMembers.map((member, idx) => (
                  <div
                    key={member.id}
                    ref={(el) => (teamCardsRef.current[idx] = el)}
                    className="cursor-pointer w-full flex-shrink-0 px-4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-[420px] sm:h-[420px]"
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onTouchStart={() => handleTouchStartCard(idx)}
                    onTouchEnd={() => handleTouchEndCard(idx)}
                    style={{ perspective: "1200px" }}
                  >
                    <div
                      className="relative w-full h-full preserve-3d transition-transform duration-700"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: flippedIndices[idx]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      {/* Front of the card */}
                      <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden flex flex-col h-full shadow-2xl bg-white/20 backdrop-blur-xl border border-white/40">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-72 object-cover"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-2xl font-semibold text-emerald-600 text-center">
                            {t(`teamMembers.${member.id}.name`)}
                          </h3>
                          <p className=" text-center mt-2">
                            {t(`teamMembers.${member.id}.role`)}
                          </p>


                        </div>
                      </div>

                      {/* Back of the card */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-xl overflow-hidden flex flex-col p-8 rotate-y-180 bg-emerald-900/80 backdrop-blur-xl border border-emerald-300/30 text-white shadow-2xl"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <h3 className="text-2xl font-bold text-center mb-4">
                          {t(`teamMembers.${member.id}.name`)}
                        </h3>
                        <p className="text-lg text-center italic mb-6">
                          {t(`teamMembers.${member.id}.role`)}
                        </p>
                        <p className="text-base leading-relaxed flex-grow">
                          {t(`teamMembers.${member.id}.bio`)}
                        </p>

                          <div className="flex justify-center gap-6 mt-6">
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} 
                                className=" transition-colors"
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                              </a>
                            )}

                            {member.instagram && (
                              <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className=" transition-colors"
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </a>
                            )}
                          </div>
                   
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentIndex > 0 && (
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2   w-12 h-12 rounded-full shadow-2xl hover:bg-emerald-800 flex items-center justify-center text-2xl z-10"
              >
                ‹
              </button>
            )}

            {currentIndex < maxIndex && (
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2   w-12 h-12 rounded-full shadow-2xl hover:bg-emerald-800 flex items-center justify-center text-2xl z-10"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
