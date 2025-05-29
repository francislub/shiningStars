"use client";

import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
// import { useState } from "react";
import { useState,useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
import Modal from "../Helper/Modal";
export const img = "/images/shin/s.jpg"


const Video = () => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);
  const [animate, setAnimate] = useState(false);

  const animated = () => {
    if (window.scrollY >= 1000) {
          setAnimate(true);
    } else {
          setAnimate(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", animated);
    return () => {
      window.removeEventListener("scroll", animated);
    };
  }, []);

  return (
      <>
      <section className="flex relative z-10 py-6 md:py-6 lg:py-6">

{/* Modal */}
{showModal && <Modal hideModal={closeModalHandler} />}

{/* <div className="container flex">

      <div>
            
            {/* Section Title on big screens */}

            <div className="hidden md:block">
            {/* <SectionTitle
                  title="Explore Shining Stars"
                  paragraph="At Shining Stars, we understand the importance of quality assurance. We have developed comprehensive self-regulating and self-maintaining procedures to ensure the highest standards of excellence in academic delivery and performance.

                  Join us at Shining Stars, where education is embraced as a catalyst for empowerment and change. Experience an inclusive and enriching learning environment where equal opportunities, academic excellence, and a commitment to students' success define our core values. Together, we can shape a brighter future through education."
                  center
                  mb="50px"
            /> */}
            </div>
      </section>

<section id="features" className="bg-primary/[.03] pt-8 -mt-5">
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">

      <div
        className={`wow fadeInUp overflow-hidden rounded-md h-[400px]  ${animate ?"slider slide--slower":"" }`}
        data-wow-delay=".15s">
           {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/kVH8TNOGeF0?si=XAcCeZbkGzFJCBrk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
            {/* <iframe width="500" height="300" title="YouTube video player"  allow="accelerometer; loop=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                src="https://www.youtube.com/embed/kVH8TNOGeF0?si=XAcCeZbkGzFJCBrk &autoplay=1"
                className='w-full h-full'>
            </iframe> */}
            <iframe width="500" height="300" title="YouTube video player"  allow="accelerometer; loop=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                src="https://www.youtube.com/embed/kVH8TNOGeF0?si=XAcCeZbkGzFJCBrk"
                className='w-full h-full'>
            </iframe>

        
      </div>

    <div className="flex flex-col ">
      {/* Section title on big screens */}
      <div className={`  mb-8 hidden md:flex md:flex-col  ${animate ?"slider-right slide--slower":"" }`}>
        <div className="wow fadeInUp w-full" data-wow-delay=".1s">
          
          <h1 className="mb-4 text-3xl font-bold !leading-tight text-black/80 dark:text-white sm:text-4xl md:text-[45px]">
          Discover Your Path at Shining Stars! 
          </h1>
          <p className="text-base !leading-relaxed md:text-lg">
          
At Shining Stars, it’s not just about academics; it’s about nurturing your mind, heart, and hands. Shining Stars fosters holistic excellence – where character development meets intellectual growth.
With Flexible Intakes, whether you’re a fresh high school graduate or a working professional seeking advancement. 

          </p>
        </div>
      </div>

      {/* Section title on small screens */}
      <div className="mb-8 block md:hidden text-sm">
        <div className="wow fadeInUp w-full" data-wow-delay=".1s">
          <h1 className="mb-4 text-3xl font-bold !leading-tight text-black/80 dark:text-white sm:text-4xl">
          Discover Your Path
          </h1>
          {/* <div className="">
            <Image
              className="img1 mb-2 rounded"
              src={img}
              alt="Shining Stars"
              width="600"
              height="250"
            />
          </div> */}
          <p className="text-base !leading-relaxed md:text-lg">
          At Shining Stars, it’s not just about academics; it’s about nurturing your mind, heart, and hands. Shining Stars fosters holistic excellence – where character development meets intellectual growth.
With Flexible Intakes, whether you’re a fresh high school graduate or a working professional seeking advancement. 

          </p>
        </div>

      </div>
    </div>

    
  </div>
</div>

</section>

      </>
    
  );
};

export default Video;
