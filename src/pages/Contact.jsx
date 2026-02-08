import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "@utils/constants";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      const formInputs = formRef.current?.querySelectorAll(
        "input, textarea, button",
      );
      gsap.fromTo(
        formInputs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        console.error("Response status:", response.status);
        console.error("Response headers:", Object.fromEntries(response.headers.entries()));

        // Try to get the raw text response
        const rawText = await response.text();
        console.error("Raw response text:", rawText.substring(0, 500));

        setDebugInfo({
          status: response.status,
          statusText: response.statusText,
          rawResponse: rawText.substring(0, 200)
        });

        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Scroll to success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitStatus("error");
        console.error("Server error:", data.message || "Unknown error");
        console.error("Full server response:", data);

        setDebugInfo({
          status: response.status,
          serverMessage: data.message,
          debug: data.debug
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      setDebugInfo({
        networkError: true,
        errorMessage: error.message,
        errorName: error.name
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold   mb-4">
            {t("contactContent.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {t("contactContent.subtitle")}
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-8 p-6 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-500 rounded-lg">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-8 p-6 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="text-red-800 dark:text-red-200 font-medium">
                Failed to send message. Please try again or contact us directly.
              </p>
            </div>
            {debugInfo && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-red-700 dark:text-red-300 font-medium">
                  Debug Information (Click to expand)
                </summary>
                <div className="mt-2 p-3 bg-red-50 dark:bg-red-950/50 rounded border text-xs font-mono">
                  <pre className="whitespace-pre-wrap text-red-800 dark:text-red-200">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              </details>
            )}
          </div>
        )}

        {/* Contact Form */}
        <div
          className=" rounded-2xl shadow-xl p-8 md:p-12"
          ref={formRef}
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold  mb-2"
              >
                {t("contactContent.form.firstName")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold   mb-2"
              >
                {t("contactContent.form.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                placeholder={t("contactContent.form.emailPlaceholder")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label
                htmlFor="phone"
             className="block text-sm font-semibold  mb-2"
              >
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors"
                placeholder="(555) 555-5555"
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                        className="block text-sm font-semibold   mb-2"

              >
                {t("contactContent.form.message")} *
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors resize-none`}
                placeholder={t("contactContent.form.messagePlaceholder")}
                disabled={isSubmitting}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:hover:scale-100"
            >
              {isSubmitting
                ? t("contactContent.form.submitting")
                : t("contactContent.form.submitButton")}
            </button>
          </form>
        </div>

        {/* Social Media Section */}
        <div className=" mt-12 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold  mb-3">
              {t("contactContent.connectWithUs")}
            </h2>
            <p className=" mb-8">
              {t("contactContent.followUs")}
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map(({ id, icon, url, name }) => (
                <a
                  key={id}  
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                  aria-label={name}
                >
                  <i
                    className={`${icon} text-2xl text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors`}
                  ></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{t("contactContent.form.privacyNote")}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
