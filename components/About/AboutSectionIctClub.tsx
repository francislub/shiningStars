
import Image from "next/image"
import { Laptop, Code, Globe, Users, Lightbulb, Rocket } from "lucide-react"

import image from "../../public/images/shin/car.jpg";
import imaga from "../../public/images/shin/buila.jpg";

const AboutSectionIctClub = () => {
  const activities = [
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      title: "Coding Workshops",
      description: "Learn programming basics and create your own projects",
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "Web Design",
      description: "Discover the art of creating attractive and functional websites",
    },
    {
      icon: <Laptop className="w-6 h-6 text-purple-500" />,
      title: "Digital Literacy",
      description: "Enhance your computer skills and online safety knowledge",
    },
    {
      icon: <Rocket className="w-6 h-6 text-red-500" />,
      title: "Tech Innovations",
      description: "Explore cutting-edge technologies and their applications",
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          ICT Club at Shining Stars Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Empowering young minds with technology skills for the future
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">Discover the World of Technology</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our ICT Club offers students a unique opportunity to explore the exciting world of technology. Through
              hands-on projects, interactive workshops, and expert guidance, we nurture the next generation of tech
              innovators.
            </p>
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                  {activity.icon}
                  <span className="text-gray-700 dark:text-gray-200">{activity.title}</span>
                </li>
              ))}
            </ul>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Join the ICT Club
            </button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
              src={image}
              alt="Shining Stars Building"
              layout="fill"
              objectFit="cover"
              className="w-[500px] lg:mt-12 -mb-10 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-lg">
           
            <Image
              src={imaga}
              alt="Shining Stars Building"
              layout="fill"
              objectFit="cover"
              className="w-[500px] lg:mt-12 -mb-10 rounded-lg"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">Why Join Our ICT Club?</h2>
            <ul className="space-y-4">
              {[
                {
                  icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
                  title: "Spark Creativity",
                  description: "Unleash your imagination through technology-driven projects",
                },
                {
                  icon: <Users className="w-6 h-6 text-indigo-500" />,
                  title: "Build Friendships",
                  description: "Connect with like-minded peers who share your passion for tech",
                },
                {
                  icon: <Rocket className="w-6 h-6 text-red-500" />,
                  title: "Prepare for the Future",
                  description: "Gain valuable skills that will benefit you in your academic and professional life",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-blue-500">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionIctClub


