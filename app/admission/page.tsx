"use client";

import { useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdmissionForm from "@/components/AdmissionForm/AdmissionForm";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Admission Form"
        description="
        Welcome to Shining Stars! We're excited to learn more about your child and the potential for them to join our vibrant school community.
        "
      />
      <AdmissionForm />
    </>
  );
};

export default AboutPage;
