import { aboutUs, teamMembers } from "@utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionsRef = useRef([]);
  const carouselRef = useRef();

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, teamMembers.length - visibleCount);

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

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
  }, [currentIndex, teamMembers.length, visibleCount]);

  useEffect(() => {
    sectionsRef.current.forEach((section, idx) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          delay: idx * 0.3,
          ease: "power3.out",
        }
      );
    });
  }, []);

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

  return (
    <>
      <div
        className="sided-about-us flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto bg-emerald-300 rounded-xl shadow-lg mt-10"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="about-us text-part flex-1 flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl font-bold text-emerald-900">
            Biz Haqimizda
          </h1>
          {aboutUs.find((item) => item.id === 1)?.text && (
            <p className="text-lg leading-relaxed text-emerald-900">
              {aboutUs.find((item) => item.id === 1)?.text}
            </p>
          )}
        </div>

        <div className="img-part flex-1 rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 cursor-pointer transition-transform duration-300 shadow-lg w-full h-64 md:h-auto">
          {aboutUs.find((item) => item.id === 2)?.img && (
            <img
              src={aboutUs.find((item) => item.id === 2)?.img}
              alt="who we are"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div
        className="sided-our-mission flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto bg-emerald-300 rounded-xl shadow-lg mt-10"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="img-part flex-1 rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 cursor-pointer transition-transform duration-300 shadow-lg w-full h-64 md:h-auto">
          {aboutUs.find((item) => item.id === 3)?.img && (
            <img
              src={aboutUs.find((item) => item.id === 3)?.img}
              alt="what is our mission"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="about-us text-part flex-1 flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl font-bold text-emerald-900">
            Bizning vazifamiz
          </h1>
          {aboutUs.find((item) => item.id === 4)?.text && (
            <p className="text-lg leading-relaxed text-emerald-900">
              {aboutUs.find((item) => item.id === 4)?.text}
            </p>
          )}
        </div>
      </div>

      <div
        className="our-team-section bg-emerald-300 py-16 mt-10 rounded-xl shadow-lg"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center text-emerald-900 mb-12">
            Bizning Jamoamiz
          </h2>

          <div className="relative">
            <div
              className="overflow-hidden touch-pan-x"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex" ref={carouselRef}>
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-full flex-shrink-0 px-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-3 transition-all duration-300 flex flex-col h-full">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-72 object-cover"
                      />
                      <div className="p-6 bg-emerald-50 flex flex-col flex-grow">
                        <h3 className="text-2xl font-semibold text-emerald-900 text-center">
                          {member.name}
                        </h3>
                        <p className="text-emerald-700 text-center mt-3">
                          {member.role}
                        </p>

                        <div className="flex justify-center gap-6 mt-6">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-700 hover:text-emerald-900 transition-colors"
                              aria-label={`${member.name} LinkedIn`}
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
                              className="text-emerald-700 hover:text-emerald-900 transition-colors"
                              aria-label={`${member.name} Instagram`}
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-white w-12 h-12 rounded-full shadow-2xl hover:bg-emerald-800 flex items-center justify-center text-2xl z-10"
              >
                ‹
              </button>
            )}

            {currentIndex < maxIndex && (
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-white w-12 h-12 rounded-full shadow-2xl hover:bg-emerald-800 flex items-center justify-center text-2xl z-10"
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
