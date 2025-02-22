
import Image from "next/image"
import { Home, Users, Shield, Book, Utensils, Wifi } from "lucide-react"
import imaga from "../../public/images/shin/buila.jpg";

const AboutSectionResidence = () => {
  const residenceFeatures = [
    {
      icon: <Home className="w-6 h-6 text-blue-500" />,
      title: "Comfortable Living Spaces",
      description: "Modern, well-furnished rooms designed for comfort and study",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Dedicated House Parents",
      description: "Caring staff available 24/7 to support and guide students",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Safe and Secure",
      description: "State-of-the-art security systems and controlled access",
    },
    {
      icon: <Book className="w-6 h-6 text-purple-500" />,
      title: "Study Areas",
      description: "Quiet spaces for focused learning and group study sessions",
    },
    {
      icon: <Utensils className="w-6 h-6 text-yellow-500" />,
      title: "Nutritious Meals",
      description: "Balanced, varied menu catering to different dietary needs",
    },
    {
      icon: <Wifi className="w-6 h-6 text-indigo-500" />,
      title: "Modern Amenities",
      description: "High-speed internet and recreational facilities",
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          Residences at Shining Stars Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          A home away from home, nurturing academic excellence and personal growth
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">Welcome to Our Boarding Community</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Shining Stars Primary School, we offer a warm and supportive boarding environment that fosters academic
              success, personal development, and lifelong friendships. Our residences are designed to provide a safe,
              comfortable, and inspiring home for students from diverse backgrounds.
            </p>
            <ul className="space-y-4">
              {residenceFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-blue-500 ">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imaga}
              alt="Shining Stars Building"
              layout="fill"
              objectFit="cover"
              className="w-[500px] lg:mt-12 -mb-10 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {residenceFeatures.slice(3).map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-3 text-xl font-semibold text-blue-500">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Residence Life at Shining Stars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-500 mb-2">Daily Schedule</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Morning wake-up and exercise</li>
                <li>Breakfast in the dining hall</li>
                <li>Classes and extracurricular activities</li>
                <li>Supervised study hours</li>
                <li>Evening leisure time</li>
                <li>Lights out at age-appropriate times</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-500 mb-2">Weekend Activities</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Sports tournaments</li>
                <li>Arts and crafts workshops</li>
                <li>Movie nights</li>
                <li>Local excursions and field trips</li>
                <li>Community service projects</li>
                <li>Cultural celebrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionResidence

