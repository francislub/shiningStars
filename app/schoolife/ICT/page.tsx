'use client'

import { useState } from "react";
import Image from "next/image";
import AboutSectionICT from "@/components/About/AboutSectionICT";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ICTPage = () => {
  return (
    <>
      {/* <WhyHero /> */}
      <Breadcrumb
        pageName="Computer Programs"
        description="
        Shining Stars is a place for everyone, somewhere you can be yourself. Whether you're an out-of-the-box thinker, boundary-breaker or change-maker, this is where you'll get ahead and find your place as part of a global community.
        "
      />
      {/* <AboutSectionSix /> */}
      <AboutSectionICT />
    </>
  );
};

export default ICTPage;
