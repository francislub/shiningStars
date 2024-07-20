import Image from "next/image";
import { HiAcademicCap } from "react-icons/hi";
import { FaScroll } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoCameraSharp } from "react-icons/io5";
import {IoClipboardOutline} from "react-icons/io5";
import {FaWpforms} from "react-icons/fa";
import {IoBookOutline} from "react-icons/io5";
import Link from "next/link"


const AboutSectionLife2 = () => {
  return (
    <section className="top-0">
            <div className="container  -my-24">
                  <div className="container mx-auto">
                        <div className="flex flex-wrap -mx-4 gap-2 lg:gap-0">
                              <div className="w-full px-4 lg:w-1/2 xl:w-1/4 transition-transform duration-300 lg:hover:scale-105 cursor-pointer rounded bg-blue-300">
                                    <div className="wow fadeInUp relative mx-auto mb-6 aspect-[25/24] lg:m-0 flex flex-col justify-center items-center text-center" data-wow-delay=".15s ">

                                          <FaWpforms className="w-10 h-8  text-black dark:text-white items-center"/>

                                          <h3 className="mb-2 mt-3 text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                          Fees Structure
                                          </h3>
                                          <p className="mb-4 text-base text-white ">
                                          Get more information about fees structure.
                                          </p>
                                          <Link href="/finances.pdf" target="_blank" rel="noopener noreferrer">
                                                <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                      Download
                                                </button>
                                          </Link>
                                    </div>
                              </div>
                              <div className="w-full px-4 lg:w-1/2 xl:w-1/4 transition-transform duration-300 lg:hover:scale-105 cursor-pointer rounded bg-blue-500">
                              <div className="wow fadeInUp relative mx-auto mb-6 aspect-[25/24] lg:m-0 flex flex-col justify-center items-center text-center" data-wow-delay=".15s">
                              <FaMoneyCheckDollar className="w-10 h-8 text-black dark:text-white items-center"/>

                                    <h3 className="mb-2 mt-3 text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                          Pupils pay code
                                    </h3>
                              <p className="mb-4 text-base text-white">
                              Search for your childs mobile pay code for easy transactions.
                              </p>
                              <Link href={"/payment-code"} >
                                    <button className="px-6 py-2 text-white bg-blue-300 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Search
                                    </button>
                              </Link>
                              </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2 xl:w-1/4 transition-transform duration-300 lg:hover:scale-105 cursor-pointer rounded bg-blue-300">
                        <div className="wow fadeInUp relative mx-auto mb-6 aspect-[25/24] lg:m-0 flex flex-col justify-center items-center text-center" data-wow-delay=".15s">
                        <IoBookOutline className="w-10 h-8 text-black dark:text-white items-center"/>
                        <h3 className="mb-2 mt-3 text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                        School Circular
                        </h3>
                        <p className="mb-4 text-base text-white dark:text-gray-300">
                        Find the attached circular for school fees dues/fees remainder.
                        </p>
                        <Link href="/circular.pdf" target="_blank" rel="noopener noreferrer">
                              <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Download
                              </button>
                        </Link>
                        </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2 xl:w-1/4 transition-transform duration-300 lg:hover:scale-105 cursor-pointer rounded bg-blue-500 ">
                        <div className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] lg:m-0 flex flex-col justify-center items-center text-center" data-wow-delay=".15s">
                        <FaScroll className="w-10 h-8 text-black dark:text-white "/>
                        <h3 className="mb-2 mt-3 text-xl font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                        Requirements
                        </h3>
                        <p className="mb-2 text-base text-white ">
                        Find Schools Requirements
                        </p>
                        <Link href="/requirements.pdf" target="_blank" rel="noopener noreferrer">
                              <button className="px-6 py-2 mt-2 text-white bg-blue-300 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Download
                              </button>
                        </Link>
                        </div>
                        </div>
                        </div>
                  </div>
            </div>
    </section>
  );
};

export default AboutSectionLife2;
