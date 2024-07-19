import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpenIcon, GlobeAltIcon, StarIcon, EyeIcon } from '@heroicons/react/solid';

const fetchImageUrls = async (albumLink) => {
  // Mock API call - Replace this with your actual API call logic
  return [
    "https://lh3.googleusercontent.com/your-image-url1.jpg",
    "https://lh3.googleusercontent.com/your-image-url2.jpg",
    "https://lh3.googleusercontent.com/your-image-url3.jpg",
    // Add more URLs as needed
  ];
};

const AboutSectionGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const urls = await fetchImageUrls("https://photos.google.com/share/AF1QipM3aWmWdnZT28nqVVjQPo3KNfKz0NIjkF7Od8Ap73blWXzz-Pz1CHERvhnHC8zjcg?key=QWxpUkNxNW5BTHZCMDE3czEzMXpIWkFLWE9LUFpB");
      setImageUrls(urls);
    };

    getImages();
  }, []);

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container -mb-20">
        <h3 className="mt-4 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
          Excellence in research, teaching, and medical care
        </h3>

        <div className="flex flex-wrap items-center gap-10 -mt-20">
          {imageUrls.map((url, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <Image src={url} alt={`Gallery Image ${index + 1}`} width={500} height={500} className="rounded-lg object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionGallery;
