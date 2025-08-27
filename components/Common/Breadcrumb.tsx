"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LoadingStars from "./LoadingStars"; // Import the LoadingStars component

interface LinkItem {
  href: string;
  label: string;
}

interface BreadcrumbProps {
  pageName: string;
  description: string;
  links?: LinkItem[]; // ✅ optional links
}

const Breadcrumb = ({ pageName, description, links }: BreadcrumbProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://shining-stars-dashboard-hr8p.onrender.com/api/v1/sliders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSlides(data.reverse());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(
        () =>
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % slides.length
          ),
        3000
      );
      return () => clearInterval(interval);
    }
  }, [slides]);

  return (
    <section className="relative z-10 overflow-hidden pt-8 lg:pt-[150px] min-h-[400px] lg:min-h-[600px]">
      {/* Background Slider */}
      <div className="absolute inset-0 h-full">
        <AnimatePresence>
          {loading && <LoadingStars />}
          {!loading && (
            <>
              {error && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
                  <p>{error}</p>
                </div>
              )}
              {!error && slides.length > 0 && (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 h-full"
                >
                  <Image
                    src={slides[currentImageIndex]?.photo}
                    alt={`Background ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
                    <h2 className="text-3xl font-bold">
                      {slides[currentImageIndex]?.title}
                    </h2>
                    <p className="text-xl mt-2">
                      {slides[currentImageIndex]?.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Foreground Content */}
      <div className="relative container z-20">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12">
            <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12 mt-16 lg:mt-0 bg-opacity-75 p-6 rounded-md">
              {/* Page Title + Description */}
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {pageName}
              </h1>
              {description && (
                <p className="text-base font-medium leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Breadcrumb Links */}
          <div className="w-full px-4 md:w-4/12 lg:w-5/12">
            <div className="text-end bg-opacity-75 p-6 rounded-md">
              <ul className="flex items-center md:justify-end">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="pr-1 text-base font-medium text-body-color hover:text-primary"
                  >
                    Home
                  </Link>
                  <span className="mr-3 block h-2 w-2 rotate-45 border-t-2 border-r-2 border-body-color"></span>
                </li>

                {/* Optional Links */}
                {links?.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <Link
                      href={link.href}
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                      {link.label}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-t-2 border-r-2 border-body-color"></span>
                  </li>
                ))}

                <li className="text-base font-medium text-primary">
                  {pageName}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
