import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      faqRefs.current.forEach((faq, index) => {
        if (!faq) return;
        gsap.fromTo(
          faq,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faq,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const faqItems = [
    { key: "q1", question: t("faqPage.q1.question"), answer: t("faqPage.q1.answer") },
    { key: "q2", question: t("faqPage.q2.question"), answer: t("faqPage.q2.answer") },
    { key: "q3", question: t("faqPage.q3.question"), answer: t("faqPage.q3.answer") },
    { key: "q4", question: t("faqPage.q4.question"), answer: t("faqPage.q4.answer") },
    { key: "q5", question: t("faqPage.q5.question"), answer: t("faqPage.q5.answer") },
    { key: "q6", question: t("faqPage.q6.question"), answer: t("faqPage.q6.answer") },
    { key: "q7", question: t("faqPage.q7.question"), answer: t("faqPage.q7.answer") },
    { key: "q8", question: t("faqPage.q8.question"), answer: t("faqPage.q8.answer") },
    { key: "q9", question: t("faqPage.q9.question"), answer: t("faqPage.q9.answer") },
    { key: "q10", question: t("faqPage.q10.question"), answer: t("faqPage.q10.answer") },
  ];

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-6 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
          >
            {t("faqPage.title")}
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("faqPage.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.key}
              ref={(el) => (faqRefs.current[index] = el)}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 hover:border-emerald-500"
                  : "bg-white border-gray-200 hover:border-emerald-400 shadow-sm hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200"
              >
                <span className="text-lg font-semibold pr-4">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? "bg-emerald-500 text-white rotate-180"
                      : isDarkMode
                      ? "bg-slate-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`px-6 pb-5 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <p className="leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 p-8 rounded-2xl text-center ${
            isDarkMode
              ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-700"
              : "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
          }`}
        >
          <h3 className="text-2xl font-bold mb-4">
            {t("faqPage.cta.title")}
          </h3>
          <p
            className={`mb-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("faqPage.cta.description")}
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t("faqPage.cta.button")}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
