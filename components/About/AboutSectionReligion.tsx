import Image from "next/image"
import { HeartIcon, UsersIcon, BookOpenIcon, SunIcon } from "@heroicons/react/solid"

import worshipImage from "../../public/images/shin/stu.jpg"

const AboutSectionReligion = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Nurturing Faith and Spiritual Growth
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".15s">
            <Image
              src={worshipImage || "/placeholder.svg"}
              alt="Students in Worship"
              className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Embracing Diversity in Faith
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At our school, we celebrate the rich tapestry of religious beliefs and practices. We provide a welcoming
              environment for students of all faiths, fostering mutual respect and understanding. Our approach to
              religious education emphasizes both the academic study of world religions and the personal spiritual
              growth of our students.
            </p>
            <div className="flex items-center text-amber-600 dark:text-amber-400">
              <HeartIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Discover Our Interfaith Programs</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".15s">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Religious Life on Campus</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <UsersIcon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Multi-faith prayer and meditation spaces</span>
                </li>
                <li className="flex items-start">
                  <BookOpenIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Diverse religious studies curriculum</span>
                </li>
                <li className="flex items-start">
                  <SunIcon className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Regular interfaith dialogues and events</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Supporting Spiritual Growth
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We believe that spiritual growth is an essential part of holistic education. Our campus offers various
              resources to support students in their faith journeys, including chaplaincy services, religious student
              organizations, and opportunities for community service. We encourage students to explore their beliefs,
              ask questions, and engage in meaningful discussions about faith and ethics.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <SunIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Explore Our Spiritual Support Services</span>
            </div>
          </div>
        </div>

        <div className="text-center wow fadeInUp" data-wow-delay=".2s">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Our Commitment to Religious Freedom and Respect
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            We are dedicated to creating an inclusive environment where all religious beliefs are respected and valued.
            Our commitment to religious freedom ensures that every student feels welcome and supported in their
            spiritual journey, regardless of their faith background.
          </p>
          {/* <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Join an Interfaith Dialogue
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Explore Religious Studies Courses
            </button>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default AboutSectionReligion

