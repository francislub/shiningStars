import Image from "next/image"
import { HomeIcon, ShieldCheckIcon, UserGroupIcon, WifiIcon } from "@heroicons/react/solid"

import dormImage from "../../public/images/shi/car.jpeg"
import facilitiesImage from "../../public/images/shi/cara.jpeg"

const AboutSectionAccommodation = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Comfortable and Safe Learner Accommodation
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".15s">
            <Image
              src={dormImage || "/placeholder.svg"}
              alt="Learner Dormitories"
              className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Modern and Comfortable Dormitories
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our school offers state-of-the-art dormitories designed to provide a comfortable and conducive living
              environment for Learners. Each room is furnished with essential amenities, including
              comfortable beds, and ample storage space. We prioritize creating a home away from home for our Learners,
              ensuring they have a peaceful place to rest and study.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <HomeIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Explore Our Dormitories</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2 wow fadeInRight" data-wow-delay=".15s">
            <Image
              src={facilitiesImage || "/placeholder.svg"}
              alt="Accommodation Facilities"
              className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 wow fadeInLeft" data-wow-delay=".2s">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Comprehensive Facilities and Services
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our accommodation facilities go beyond just providing a place to sleep. We offer a range of services and
              amenities to enhance Learner life, including common areas for socializing, quiet study spaces, laundry
              facilities, and high-speed internet access throughout the premises. Our goal is to create a supportive
              community that fosters academic success and personal growth.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <UserGroupIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">Learn About Our Community</span>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Our Commitment to Learner Comfort and Safety
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <ShieldCheckIcon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">24/7 Security</h4>
              <p className="text-gray-600 dark:text-gray-300">Round-the-clock surveillance and security personnel</p>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <WifiIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">High-Speed Internet</h4>
              <p className="text-gray-600 dark:text-gray-300">Seamless connectivity for studies and leisure</p>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".3s">
              <UserGroupIcon className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Community Events</h4>
              <p className="text-gray-600 dark:text-gray-300">Regular activities to foster Learner bonding</p>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".4s">
              <HomeIcon className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Maintenance Support</h4>
              <p className="text-gray-600 dark:text-gray-300">Quick response to accommodation-related issues</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionAccommodation

