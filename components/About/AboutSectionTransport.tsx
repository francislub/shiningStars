

import Image from "next/image"
import { Bus, Car, MapPin, Shield, Clock, Users } from "lucide-react"
import image from "../../public/images/shin/car.jpg";

const AboutSectionTransport = () => {
  const transportOptions = [
    {
      icon: <Bus className="w-8 h-8 text-yellow-500" />,
      title: "School Bus Service",
      description: "Safe and reliable transportation for students across the city",
    },
    {
      icon: <Car className="w-8 h-8 text-blue-500" />,
      title: "Carpool Program",
      description: "Eco-friendly option for families to share rides",
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      title: "Walking School Bus",
      description: "Supervised groups walking together for nearby students",
    },
  ]

  const transportFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Safety First",
      description: "All vehicles equipped with latest safety features and regularly inspected",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Punctuality",
      description: "Timely pick-up and drop-off to ensure students are never late",
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "Experienced Staff",
      description: "Trained and friendly drivers and supervisors for a pleasant journey",
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          Transportation at Shining Stars Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Ensuring safe, reliable, and convenient transportation for all our students
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {transportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {option.icon}
                <h3 className="ml-3 text-xl font-semibold text-blue-500">{option.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">
              Our Commitment to Safe Transportation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Shining Stars Primary School, we prioritize the safety and comfort of our students during their daily
              commute. Our transportation services are designed to provide peace of mind for parents and a positive
              experience for children.
            </p>
            <ul className="space-y-4">
              {transportFeatures.map((feature, index) => (
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
              src={image}
              alt="Shining Stars Cars"
              layout="fill"
              objectFit="cover"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Transportation FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I sign up for the school bus service?",
                a: "You can register for our bus service through the school's online portal or by visiting the administrative office.",
              },
              {
                q: "What areas does the school bus cover?",
                a: "Our bus routes cover major residential areas within a 10-mile radius of the school. Specific route information is available upon request.",
              },
              {
                q: "Is there a supervisor on the bus besides the driver?",
                a: "Yes, all our buses have a trained supervisor to ensure student safety and maintain discipline during the journey.",
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-blue-500 ">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionTransport

