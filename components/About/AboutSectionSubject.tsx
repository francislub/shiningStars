import Image from "next/image";
import { BookOpenIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { EyeIcon } from '@heroicons/react/solid';

import image from "../../public/images/shin/stu.jpg";


const AboutSectionSubject = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">

    <div className="container -mb-20">
        <h3 className="mt-4 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
           Excellence in research, teaching, and medical care
        </h3>
        <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary Six
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary five
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
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
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
        </div>
 {/* third */}
 <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary Four
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
              </div>
            </div>
          </div>
        </div>
     {/* fourth */}
       <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary Three
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
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
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
        </div>

        {/* fourth */}
       <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary two
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* fourth */}
       <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Primary One
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
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
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSectionSubject;
