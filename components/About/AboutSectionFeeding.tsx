import Image from "next/image"
import { CakeIcon, ClockIcon, HeartIcon, ShieldCheckIcon } from "@heroicons/react/solid"

import cafeteriaImage from "../../public/images/shin/stu.jpg"

const AboutSectionFeeding = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Nourishing Minds and Bodies: Our School Feeding Program
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".15s">
            <Image
              src={cafeteriaImage || "/placeholder.svg"}
              alt="School Cafeteria"
              className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Balanced Nutrition for Academic Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At our school, we understand the crucial role that proper nutrition plays in academic performance and
              overall well-being. Our state-of-the-art cafeteria serves a variety of nutritious and delicious meals,
              carefully crafted to meet the dietary needs of our diverse student body. We believe that well-fed students
              are happy, healthy, and ready to learn.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <HeartIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Explore Our Menu</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".15s">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Our Feeding Program Highlights
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CakeIcon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Diverse menu options catering to various dietary requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <ClockIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Extended cafeteria hours to accommodate different schedules
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheckIcon className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Strict adherence to food safety and hygiene standards
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              More Than Just Meals
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our feeding program goes beyond simply providing meals. We&apos;ve created a welcoming dining environment that
              fosters social interaction and community building. Our cafeteria is a place where students can relax,
              socialize, and recharge between classes. We also offer nutrition education programs to help students make
              informed food choices and develop healthy eating habits that will serve them well beyond their school
              years.
            </p>
            <div className="flex items-center text-purple-600 dark:text-purple-400">
              <CakeIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Learn About Our Nutrition Education</span>
            </div>
          </div>
        </div>

        <div className="text-center wow fadeInUp" data-wow-delay=".2s">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Our Commitment to Quality and Sustainability
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            We are dedicated to providing high-quality, nutritious meals while also considering our environmental
            impact. Our kitchen uses locally sourced ingredients whenever possible, supporting local farmers and
            reducing our carbon footprint. We also implement waste reduction strategies and use eco-friendly packaging
            to minimize our environmental impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              View This Week&apos;s Menu
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Learn About Our Sustainability Efforts
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionFeeding

