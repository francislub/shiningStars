'use client'

import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import BelowHero from "@/components/BelowHero";
import ScrollToTop from "@/components/ScrollToTop";
import ExploreBugema from "@/components/ExploreBugema";
import { Inter } from "next/font/google";
import Welcome from "@/components/Welcome/Welcome";
import Events from "@/components/Events";
import News from "@/components/News";
import Whatsup from "@/components/whatsup/whatsup";
import WebsiteShowcase from "@/components/Welcome/Wel";
import RecruitmentPopup from "@/components/RecruitmentPopup/RecruitmentPopup"



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <RecruitmentPopup />
      <Hero />
      <BelowHero />
      <Welcome />
      <WebsiteShowcase />
      <ExploreBugema />
      <Events />
      <News />
      <Contact />
      <Whatsup />
      <ScrollToTop />
    </>
  );
}
