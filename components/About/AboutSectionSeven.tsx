import Image from "next/image";
import { BookOpenIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { EyeIcon } from '@heroicons/react/solid';

import image from "../../public/images/shin/stu.jpg";
import academic from "../../public/images/shi/name.jpeg";
import sports from "../../public/images/shi/mddx.jpeg";
import feed from "../../public/images/shin/stuf.jpg";
import accomodation from "../../public/images/shi/buil.jpeg";
import Link from "next/link";


const AboutSectionSeven = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">

    <div className="container -mb-20">
        <h3 className="-mt-7 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
           Excellence in research, teaching, and medical care
        </h3>

        <div className="flex flex-col lg:flex-row items-center gap-10 mb-8">
          <div
            className="wow h-[500px] -mb-20 fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={academic}
              alt="Shining Stars"
              className="w-[500px] h-[300px] mt-3 lg:mt-12"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] -mt-20 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Academics
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
              <Link href="/academics">
                <button className="bg-gray-700 mt-6 lg:mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:-mt-20 ">
          <div className="w-full px-2 lg:w-1/2 h-[410px] lg:h-[300px] -mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Sports
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className="">The university treasures the quality of it&apos;s products, and for that reason, we hire the quality and experienced lecturers to train and produce the quality for our students. Our lecturers are associated with industry enterprises which helps them get the market experience that they instil in our students. Research is a core role for our lecturers to keep producing relevant knowledge for the market.</p>
              <Link href="/studentlife">
                <button className="bg-gray-700 mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={sports}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12"
            />
          </div>
        </div>
      <div className="flex flex-col lg:flex-row items-center gap-10 -mt-20">
         <div
              className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer -mb-10"
              data-wow-delay=".15s" 
            >
              <Image
                src={accomodation}
                alt="Shining Stars"
                className="w-[500px] h-[300px] lg:mt-12"
              />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[600px] lg:h-[300px] -mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Accommodation
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className="">Our blended learning programs combine traditional classroom instruction with interactive online components, empowering students to engage with course materials, collaborate with peers. Our E-Learning system is available all the time to cater for those that may be in different time zones. Our support team will take you step by step on how to get the best from the platform. Pay a visit to our E-Learning Platform.</p>
              <Link href="/accommodation">
                <button className="bg-gray-700 mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:-mt-20">
          <div className="w-full px-2 lg:w-1/2 lg:h-[300px] -mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Health
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className="">We believe in creating relationships that last with our clients. The institution has academic families where each student is assigned to a mentor. This increases the bond between our students and lecturers. Since students are let free to interact with the lecturers, this gives them a chance to be well prepared for the market challenges ahead of them. This enriches their (Students) career readiness as well.</p>
              <Link href="/health">
                <button className="bg-gray-700 mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 -mt-20">
        <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[600px] lg:h-[350px] -mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
             Religion
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className="">We understand the importance of holistic development and the role of spirituality in our students&apos; lives. We provide a nurturing environment that fosters personal growth and offers opportunities for spiritual enrichment. Our university offers worship services and spaces that cater to diverse religious and spiritual needs. Students can engage in prayer, meditation, and other spiritual activities to promote a sense of community, mindfulness, and well-being.</p>
              <Link href="/religion">
                <button className="bg-gray-700 lg:mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 -mt-20">
        <div className="w-full px-2 lg:w-1/2 h-[500px]  lg:h-[300px] lg:-mt-20 bg-green-200">
          <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          Feeding
          </h3>
          <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
            <div className="flex-1">
            <p className="">We believe in equipping our students with the necessary skills and credentials to excel in their chosen professions. As part of our commitment to professional development, we offer a range of professional certification programs. These certifications are designed to enhance students&apos; expertise, improve their marketability, and demonstrate their proficiency in specific areas of study.</p>
            <Link href="/feeding">
                <button className="bg-gray-700 mt-12 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out">
                  Explore more
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={feed}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12"
            />
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionSeven;
