'use client'

import { useState } from "react";
import Image from "next/image";
import AboutSectionLibrary from "@/components/About/AboutSectionLibrary";
import Breadcrumb from "@/components/Common/Breadcrumb";

const LibraryPage = () => {
  return (
    <>
      {/* <WhyHero /> */}
      <Breadcrumb
        pageName="Library"
        description="
        Shining Stars is a place for everyone, somewhere you can be yourself. Whether you're an out-of-the-box thinker, boundary-breaker or change-maker, this is where you'll get ahead and find your place as part of a global community.
        "
      />
      {/* <AboutSectionSix /> */}
      <AboutSectionLibrary />
    </>
  );
};

export default LibraryPage;
