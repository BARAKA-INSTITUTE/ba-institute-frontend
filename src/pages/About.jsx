import { testimonials } from "@utils/constants";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // About section animation
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mission section animation
      gsap.fromTo(
        missionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Values section animation
      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-card") || [],
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Testimonials animation
      gsap.fromTo(
        testimonialsRef.current?.querySelectorAll(".testimonial-card") || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const cardBg = isDarkMode
    ? "bg-slate-800/50 border-slate-700"
    : "bg-white/80 border-gray-200";

  const accentColor = isDarkMode ? "text-emerald-400" : "text-emerald-600";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";

  return (
    <div className="min-h-screen py-20" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("aboutUs.title")}
          </h1>
          <p className={`text-xl md:text-2xl ${accentColor} font-semibold mb-6`}>
            {t("aboutUs.subtitle")}
          </p>
          <p className={`text-lg ${textColor} max-w-4xl mx-auto leading-relaxed`}>
            {t("aboutUs.description")}
          </p>
        </div>

        {/* About Content Section */}
        <div
          ref={aboutRef}
          className={`${cardBg} backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl border mb-16`}
        >
          <div className="space-y-6">
            <p className={`text-lg ${textColor} leading-relaxed`}>
              {t("aboutUs.aboutContent.paragraph1")}
            </p>
            <p className={`text-lg ${textColor} leading-relaxed`}>
              {t("aboutUs.aboutContent.paragraph2")}
            </p>
            <p className={`text-lg ${textColor} leading-relaxed`}>
              {t("aboutUs.aboutContent.paragraph3")}
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div
          ref={missionRef}
          className={`${cardBg} backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl border mb-16`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${accentColor}`}>
            {t("aboutUs.missionTitle")}
          </h2>
          <p className={`text-lg ${textColor} mb-8 leading-relaxed font-semibold`}>
            {t("aboutUs.missionDescription")}
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Our Commitment:</h3>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-start space-x-4">
                <div className={`${accentColor} mt-1 flex-shrink-0`}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className={`text-lg ${textColor} leading-relaxed`}>
                  {t(`aboutUs.missionPoints.point${num}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div ref={valuesRef} className="mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${accentColor}`}>
            {t("aboutUs.valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["practical", "career", "mentorship", "remote"].map((value) => (
              <div
                key={value}
                className={`value-card ${cardBg} backdrop-blur-xl rounded-xl p-8 shadow-lg border hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <h3 className={`text-2xl font-bold mb-4 ${accentColor}`}>
                  {t(`aboutUs.valuesContent.${value}.title`)}
                </h3>
                <p className={`text-lg ${textColor} leading-relaxed`}>
                  {t(`aboutUs.valuesContent.${value}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsRef} className="mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${accentColor}`}>
            {t("aboutUs.testimonialsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${cardBg} backdrop-blur-xl rounded-xl p-8 shadow-lg border hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-emerald-500"
                  />
                  <div>
                    <h3 className={`text-xl font-bold ${accentColor}`}>
                      {t(`testimonialsContent.${testimonial.id}.name`)}
                    </h3>
                    <p className={`text-sm ${textColor}`}>
                      {t(`testimonialsContent.${testimonial.id}.role`)}
                    </p>
                  </div>
                </div>
                <div className={`relative ${textColor}`}>
                  <svg
                    className={`w-8 h-8 ${accentColor} opacity-50 mb-2`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg leading-relaxed italic">
                    "{t(`testimonialsContent.${testimonial.id}.quote`)}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${cardBg} backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl border text-center`}>
          <h2 className={`text-3xl font-bold mb-4 ${accentColor}`}>
            Ready to Start Your BA Journey?
          </h2>
          <p className={`text-lg ${textColor} mb-6`}>
            Join Barakah IT Institute and transform your career with practical, industry-aligned Business Analysis training.
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
