import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact } from "@utils/constants";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionsRef = useRef([]);
  const infoCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, idx) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        sectionsRef.current[1]?.querySelector("h2"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionsRef.current[1],
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      infoCardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const formTitle = sectionsRef.current[1]?.querySelectorAll(".bg-emerald-300 > h2")[1];
      if (formTitle) {
        gsap.fromTo(
          formTitle,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formTitle,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const formInputs = sectionsRef.current[1]?.querySelectorAll("input, textarea, button");
      gsap.fromTo(
        formInputs,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionsRef.current[1]?.querySelector(".bg-emerald-300"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        sectionsRef.current[2],
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionsRef.current[2],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="relative bg-cover bg-center py-24 mt-10 rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(${contact.hero.bgImage})` }}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-emerald-900 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center ">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
            {contact.hero.title}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white">
            {contact.hero.subtitle}
          </p>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-12"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="space-y-8">
          <h2 className="font-serif text-4xl font-bold  dark:">
            Biz bilan bog'laning
          </h2>

          <div
            className=" rounded-xl shadow-lg p-8 flex items-start gap-6"
            ref={(el) => (infoCardsRef.current[0] = el)}
          >
            <div className=" dark:">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold  dark:">Telefon</h3>
              <p className="text-lg  dark: mt-2">{contact.info.phone}</p>
            </div>
          </div>

          <div
            className=" rounded-xl shadow-lg p-8 flex items-start gap-6"
            ref={(el) => (infoCardsRef.current[1] = el)}
          >
            <div className=" dark:">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold  dark:">Email</h3>
              <p className="text-lg  dark: mt-2">{contact.info.email}</p>
            </div>
          </div>

          <div
            className="rounded-xl shadow-lg p-8 flex items-start gap-6"
            ref={(el) => (infoCardsRef.current[2] = el)}
          >
            <div className=" dark:">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold  dark:">Manzil</h3>
              <p className="text-lg  dark: mt-2">{contact.info.address}</p>
            </div>
          </div>
        </div>

        <div className=" rounded-xl shadow-lg p-8">
          <h2 className="font-serif text-4xl font-bold  dark: mb-8">
            Xabar yuborish
          </h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder={contact.form.namePlaceholder}
              className="w-full px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              required
            />
            <input
              type="email"
              placeholder={contact.form.emailPlaceholder}
              className="w-full px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              required
            />
            <input
              type="tel"
              placeholder={contact.form.phonePlaceholder}
              className="w-full px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
            <textarea
              rows="6"
              placeholder={contact.form.messagePlaceholder}
              className="w-full px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-white text-indigo-700 cursor-pointer font-bold py-4 rounded-lg hover:scale-105 transition duration-300 shadow-lg"
            >
              {contact.form.submitButton}
            </button>
          </form>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 mt-16 mb-10 rounded-xl shadow-lg overflow-hidden"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <iframe
          src={contact.mapEmbed}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bizning joylashuvimiz"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;