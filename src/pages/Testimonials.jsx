import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@utils/constants";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonialsSectionRef = useRef(null);
  const testimonialItemsRef = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const maxIndex = Math.max(0, testimonials.length - 1);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [maxIndex, next]);

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
    const ctx = gsap.context(() => {
      // Testimonials section title reveal
      gsap.fromTo(
        testimonialsSectionRef.current.querySelector("h2"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger testimonial cards as they enter viewport
      testimonialItemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

        
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={testimonialsSectionRef} className="py-20 mt-20 relative overflow-hidden">
      <div className="absolute inset-0  "></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center  dark: mb-16">
          {t('testimonials')}
        </h2>

        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex" ref={carouselRef}>
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  ref={(el) => (testimonialItemsRef.current[idx] = el)}
                  className="w-full flex-shrink-0 px-8"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                    <div className="flex justify-center md:justify-end">
                      <div className="relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-emerald-400 shadow-2xl">
                          <img
                            src={testimonial.img}
                            alt={t(`testimonialsContent.${testimonial.id}.name`)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -inset-4 rounded-full border-4 border-white/20"></div>
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center">
                      <div className="text-7xl md:text-9xl font-serif text-emerald-300 mb-6">"</div>
                      <p className="text-xl md:text-2xl leading-relaxed /90 mb-10">
                        {t(`testimonialsContent.${testimonial.id}.quote`)}
                      </p>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold ">
                          {t(`testimonialsContent.${testimonial.id}.name`)}
                        </h3>
                        <p className="text-lg text-emerald-300 mt-2">{t(`testimonialsContent.${testimonial.id}.role`)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm  w-14 h-14 rounded-full hover:bg-white/30 flex items-center justify-center text-3xl z-10 transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm  w-14 h-14 rounded-full hover:bg-white/30 flex items-center justify-center text-3xl z-10 transition"
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
  );
};

export default Testimonials;
