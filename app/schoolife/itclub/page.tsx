'use client'

import { useState } from "react";
import Image from "next/image";
import AboutSectionIctClub from "@/components/About/AboutSectionIctClub";
import Breadcrumb from "@/components/Common/Breadcrumb";

const IctClubPage = () => {
  return (
    <>
      {/* <WhyHero /> */}
      <Breadcrumb
        pageName="ICT Club"
        description="
        Shining Stars is a place for everyone, somewhere you can be yourself. Whether you're an out-of-the-box thinker, boundary-breaker or change-maker, this is where you'll get ahead and find your place as part of a global community.
        "
      />
      {/* <AboutSectionSix /> */}
      <AboutSectionIctClub />
    </>
  );
};

export default IctClubPage;
