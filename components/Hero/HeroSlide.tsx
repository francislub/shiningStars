import Image from "next/image";
import React from "react";
import HeroOverlay from "../HeroOverlay/HeroOverlay";


const HeroSlide = ({ media }) => {
  return (
    <div className="relative w-full h-[800px] z-10 bg-gray-400">
      {media.type === "video" ? (
        <div>
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <HeroOverlay
            title="Arise and shine"
            title2 = ""
            title3="SHINING STARS NURSERY AND PRIMARY SCHOOL- VVUMBA"
            subtitle="A Center for Guaranteed excellence"
            subtitle2=""
            subtitle3=""
            buttonText="Apply Now"
            buttonLink="/admission"
          />
        </div>
      ) : (
        <>
          <Image
            src={media.src}
            alt="Shining Stars"
            className="w-fit h-[800px] object-cover lg:w-full"
            width={1020}
            height={700}
          />
          <div className="absolute top-0 left-0 w-full h-full opacity-50"></div>
        </>
      )}
    </div>
  );
};

export default HeroSlide;
