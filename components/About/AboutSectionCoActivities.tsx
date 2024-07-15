import Image from "next/image";
import { BookOpenIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { EyeIcon } from '@heroicons/react/solid';

import image from "../../public/images/shin/stu.jpg";
import community from "../../public/images/shi/pip.jpeg";
import music from "../../public/images/shi/songg.jpeg";


const AboutSectionCoActivities = () => {
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
              src={music}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Music
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> Students can participate in school bands, orchestras, or choirs, learning instruments or vocal performance.
              </p>
              <p className=""> Example: A student plays the trumpet in the school band, performing at school events and concerts, enhancing their musical talents and discipline.
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Debate Club
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> Debate clubs help students develop critical thinking, public speaking, and argumentation skills.
              </p>
              <p className="">Example: A student competes in inter-school debate competitions, researching topics and practicing persuasive speaking.

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
              src={community}
              alt="Shining Stars"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10"
            />
          </div>
          <div className="w-full px-2 lg:w-1/2 h-[500px] lg:h-[300px] mt-4 lg:-mt-20 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            Community Service:
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> Community service programs encourage students to engage in volunteer work and social initiatives.
              </p>
              <p className="">Example: A student volunteers at a local food bank, developing a sense of civic responsibility and empathy.

              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionCoActivities;
