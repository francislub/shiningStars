import Image from "next/image";
import { BookOpenIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { EyeIcon } from '@heroicons/react/solid';
import image from "../../public/images/shin/stu.jpg";


const AboutSectionAcademic = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">

    <div className="container -mb-20">
        <h3 className="mt-4 lg:-mt-20 text-xl font-bold text-black dark:text-white sm:text-3xl lg:text-xl xl:text-4xl text-center">
           Excellence in research, teaching, and medical care
        </h3>
        <div className="flex flex-col lg:flex-row items-center gap-10 -mb-8">
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer "
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
            Academics
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className=""> We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 -mt-20">
          <div className="w-full px-2 lg:w-1/2 h-[500px] mt-5 bg-green-200">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            ........
            </h3>
           <div className="wow fadeInUp flex space-x-6" data-wow-delay=".2s">
              <div className="flex-1">
              <p className="">The university treasures the quality of it&apos;s products, and for that reason, we hire the quality and experienced lecturers to train and produce the quality for our students. Our lecturers are associated with industry enterprises which helps them get the market experience that they instil in our students. Research is a core role for our lecturers to keep producing relevant knowledge for the market.</p>
              
              </div>
            </div>
          </div>
          <div
            className="wow h-[500px] fadeInUp relative mx-auto text-center lg:m-0 transition-transform duration-300 hover:scale-105 cursor-pointer -mb-20 lg:mb-0"
            data-wow-delay=".15s" 
          >
            <Image
              src={image}
              alt="Bugema University"
              className="w-[500px] "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionAcademic;
