'use client'

import { useState } from "react";
import Image from "next/image";
import AboutSectionLife2 from "@/components/About/AboutSectionLife2";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutSports = () => {
  return (
    <>
      <Breadcrumb
        pageName="Sports"
        description="Welcome to Shining Stars Sports page! Here, you'll find sports
         on various topics related to different activities"
      />
      <AboutSectionLife2 />
    </>
  );
};

export default AboutSports;
