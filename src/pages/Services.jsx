import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { services } from "@utils/constants";

const Services = () => {
  const sectionsRef = useRef([]);

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

  const serviceList = [
    services.hiring,
    services.consulting,
    services.education,
    services.modeling,
    services.workshops,
  ];

  return (
    <>

      <div
        className="flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto bg-emerald-300 rounded-xl shadow-lg mt-10"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="text-part flex-1 flex flex-col justify-center space-y-6">
          <h1 className="font-serif text-4xl font-bold text-emerald-900">
            {services.intro.title}
          </h1>
          <p className="text-lg leading-relaxed text-emerald-900">
            {services.intro.text1}
          </p>
          <p className="text-lg leading-relaxed text-emerald-900">
            {services.intro.text2}
          </p>
        </div>

        <div className="img-part flex-1 rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 transition-transform duration-300 shadow-lg w-full h-64 md:h-auto">
          <img
            src={services.intro.img}
            alt="Professional business team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>


      {serviceList.map((service, idx) => (
        <div
          key={idx}
          className={`flex flex-col ${
            idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center md:items-stretch gap-8 p-6 max-w-7xl mx-auto bg-emerald-300 rounded-xl shadow-lg mt-10`}
          ref={(el) => (sectionsRef.current[idx + 1] = el)}
        >
          <div className="text-part flex-1 flex flex-col justify-center space-y-6">
            <h2 className="font-serif text-3xl font-bold text-emerald-900">
              {service.title}
            </h2>
            <p className="text-lg leading-relaxed text-emerald-900">
              {service.description}
            </p>
            {service.features && (
              <ul className="list-disc pl-6 space-y-2 text-emerald-900">
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
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Services;