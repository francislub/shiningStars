import Image from "next/image"
import { HeartIcon, ShieldCheckIcon, UserGroupIcon, LightningBoltIcon } from "@heroicons/react/solid"

import healthImage from "../../public/images/shin/stu.jpg"

const AboutSectionHealth = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Prioritizing Student Health and Well-being
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".15s">
            <Image
              src={healthImage || "/placeholder.svg"}
              alt="Student Health Services"
              className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Comprehensive Health Services
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At our school, we prioritize the health and well-being of every student. Our on-campus health center is
              staffed with qualified medical professionals who provide a wide range of services, including routine
              check-ups, vaccinations, and emergency care. We believe that a healthy body leads to a healthy mind,
              enabling our students to excel in their academic pursuits.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <HeartIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Learn More About Our Health Services</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".15s">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Our Health Initiatives</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Regular health check-ups and screenings</span>
                </li>
                <li className="flex items-start">
                  <UserGroupIcon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Mental health counseling and support groups</span>
                </li>
                <li className="flex items-start">
                  <LightningBoltIcon className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fitness programs and nutritional guidance</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Promoting a Healthy Lifestyle
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We believe in a holistic approach to student health. Beyond providing medical care, we actively promote
              healthy lifestyle choices through educational programs, fitness initiatives, and nutritional guidance. Our
              goal is to empower students with the knowledge and resources they need to maintain their physical and
              mental well-being throughout their academic journey and beyond.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <LightningBoltIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Explore Our Wellness Programs</span>
            </div>
          </div>
        </div>

        <div className="text-center wow fadeInUp" data-wow-delay=".2s">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Our Commitment to Student Health
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            We are dedicated to creating a safe and healthy environment for all our students. Our comprehensive approach
            to health and well-being ensures that every student has access to the care and support they need to thrive
            academically and personally.
          </p>
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Schedule a Health Consultation
          </button> */}
        </div>
      </div>
    </section>
  )
}

export default AboutSectionHealth

