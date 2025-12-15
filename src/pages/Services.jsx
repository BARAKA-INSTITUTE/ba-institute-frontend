import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@utils/constants";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionsRef = useRef([]);

  // TODO: Animate sections on mount

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

        const textPart = section.querySelector(".text-part");
        const imgPart = section.querySelector(".img-part");

        if (textPart && imgPart) {
          gsap.fromTo(
            textPart.children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textPart,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            imgPart,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imgPart,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const serviceList = [
    services.hiring,
    services.consulting,
    services.education,
    services.modeling,
    services.workshops,
  ];

  return (
    <>
      {/*  OUR SERVICES SECTION */}
      <div
        className="flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto mt-10"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="text-part flex-1 flex flex-col justify-center space-y-6">
          <h1 className="font-serif text-4xl font-bold  dark:">
            {services.intro.title}
          </h1>
          <p className="text-lg leading-relaxed  dark:">
            {services.intro.text1}
          </p>
          <p className="text-lg leading-relaxed  dark:">
            {services.intro.text2}
          </p>
        </div>

        <div className="img-part flex-1 rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 transition-transform duration-300 shadow-lg w-full h-64 md:h-auto">
          <img
            src={services.intro.img}
            alt="Professional business team"
            className="cursor-pointer w-full h-full object-cover"
          />
        </div>
      </div>

      {/* THIS MAPS FROM CONSTANT FILE */}
      {serviceList.map((service, idx) => (
        <div
          key={idx}
          className={`flex flex-col ${
            idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto  mt-10`}
          ref={(el) => (sectionsRef.current[idx + 1] = el)}
        >
          <div className="text-part flex-1 flex flex-col justify-center space-y-6">
            <h2 className="font-serif text-3xl font-bold  dark:">
              {service.title}
            </h2>
            <p className="text-lg leading-relaxed  dark:">
              {service.description}
            </p>
            {service.features && (
              <ul className="list-disc pl-6 space-y-2  dark:">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="img-part flex-1 rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 transition-transform duration-300 shadow-lg w-full h-64 md:h-auto">
            <img
              src={service.img}
              alt={service.title}
              className="cursor-pointer w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Services;