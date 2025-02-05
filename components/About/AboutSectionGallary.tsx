import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenIcon, GlobeAltIcon, StarIcon, EyeIcon } from '@heroicons/react/solid';

import basketa from "../../public/images/shi/life.jpeg";
import basketb from "../../public/images/shi/mddfz.jpeg";
import basketc from "../../public/images/shi/pip.jpeg";
import basketd from "../../public/images/shi/mdgd.jpeg";
import grad from "../../public/images/shi/schoo.jpeg";

const AboutSectionGallery = () => {

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container -mb-20">
        <h3 className="mt-4 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
        Welcome to Shining Stars Primary School Gallery!
        </h3>

        <h3 className="mb-2 text-xl font-bold text-black text-center sm:text-2xl lg:text-xl xl:text-2xl">
        Discover Our School Life Through Our Gallery
          </h3>

          <div className="flex flex-wrap -mx-4 mb-7">
           <div className="w-full px-4 lg:w-2/5 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="wow fadeInUp relative mx-auto lg:m-0" data-wow-delay=".15s">
              <Image
                src={grad}
                alt="about image 1"
                className="w-[250px] h-[130px] sm:w-[250px] sm:h-[100px] md:w-[300px] md:h-[150px] lg:w-[300px] lg:h-[180px] xl:w-[350px] xl:h-[200px]"
              />
            </div>
          </div>
            
            <div className="w-full px-4 lg:w-3/5 flex flex-col bg-green-200">
              <div className="wow fadeInUp relative mx-auto lg:m-0" data-wow-delay=".15s">
                <p className="mb-4 text-base text-gray-600">
                Explore the dynamic world of Shining Stars Primary School through our vibrant gallery. Here, you&apos;ll find captivating images from our engaging educational trips, inspiring tours, and the lively school environment that makes our community unique. Each photo tells a story of our pupil&apos;s adventures, learning experiences, and the nurturing atmosphere we proudly offer. Dive into the moments that highlight the essence of our school&apos;s commitment to enriching young minds.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 lg:w-1/4 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] text-center lg:m-0" data-wow-delay=".15s">
                <Image
                  src={basketa}
                  alt="about image 1"
                  className="w-full h-auto"
                />
                
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/4 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] text-center lg:m-0" data-wow-delay=".15s">
                <Image
                  src={basketb}
                  alt="about image 2"
                  className="w-full h-auto"
                />
                {/* <h3 className="mb-5 mt-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  A matter of debate.
                </h3>
                <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
                  Join the debating society at Bugema University.
                </p> */}
                {/* <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Bugema Debating Union
                </button> */}
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/4 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] text-center lg:m-0" data-wow-delay=".15s">
                <Image
                  src={basketc}
                  alt="about image 3"
                  className="w-full h-auto"
                />
                {/* <h3 className="mb-5 mt-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  A matter of debate.
                </h3>
                <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
                  Join the debating society at Bugema University.
                </p> */}
                {/* <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Bugema Debating Union
                </button> */}
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/4 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] text-center lg:m-0" data-wow-delay=".15s">
                <Image
                  src={basketd}
                  alt="about image 4"
                  className="w-full h-auto"
                />
                {/* <h3 className="mb-5 mt-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  A matter of debate.
                </h3>
                <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
                  Join the debating society at Bugema University.
                </p> */}
                {/* <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Bugema Debating Union
                </button> */}
              </div>
            </div>
          </div>

          {/* ########END######### */}
          
      </div>
      <h3 className="mt-10 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
            Get more Photos
          </h3>
          <div className="flex flex-wrap -mx-4 justify-center">
          <div className="flex mx-2">
            <Link href="https://photos.google.com/share/AF1QipM3aWmWdnZT28nqVVjQPo3KNfKz0NIjkF7Od8Ap73blWXzz-Pz1CHERvhnHC8zjcg?key=QWxpUkNxNW5BTHZCMDE3czEzMXpIWkFLWE9LUFpB">
              <button className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300 ease-in-out mt-6 lg:mt-12">
                Explore More Entebbe Zoo
              </button>
            </Link>
          </div>
          <div className="flex mx-2">
            <Link href="https://photos.google.com/share/AF1QipOVrV6OjflOoHvuTC7w95KycHlXb-uQH0fV2w_dHJX7cBX0vsuJ1L9SQ_rYuzNgPg?key=cjBTMWxTN2tiNS1NVUx6VkVOeEZfWktLOG5wMFBB">
              <button className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300 ease-in-out mt-6 lg:mt-12">
                Explore More About Tour 2024
              </button>
            </Link>
          </div>

          <div className="flex mx-2">
            <Link href="https://photos.app.goo.gl/fVYcE9K1GW8f98Jp9">
              <button className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300 ease-in-out mt-6 lg:mt-12">
                Explore More About Our Events
              </button>
            </Link>
          </div>

          <div className="flex mx-2">
            <Link href="https://photos.app.goo.gl/cmdPf3JP5cstDoi77">
              <button className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300 ease-in-out mt-6 lg:mt-12">
                Explore More About Our News
              </button>
            </Link>
          </div>


          </div>
          
    </section>
  );
};

export default AboutSectionGallery;
