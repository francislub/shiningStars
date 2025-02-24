
import Image from "next/image"
import { Book, BookOpen, Search, Users, Clock, Laptop, Calendar, Award } from "lucide-react"
import image from "../../public/images/shin/car.jpg";
import imaga from "../../public/images/shin/buila.jpg";

const AboutSectionLibrary = () => {
  const libraryFeatures = [
    {
      icon: <Book className="w-6 h-6 text-blue-500" />,
      title: "Extensive Collection",
      description: "Over 10,000 books covering various subjects and reading levels",
    },
    {
      icon: <Search className="w-6 h-6 text-green-500" />,
      title: "Easy Navigation",
      description: "User-friendly cataloging system for quick book location",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Reading Nooks",
      description: "Cozy spaces for individual and group reading sessions",
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Extended Hours",
      description: "Open before and after school for maximum accessibility",
    },
  ]

  const libraryPrograms = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      title: "Reading Challenges",
      description: "Monthly themed reading competitions to encourage literacy",
    },
    {
      icon: <Laptop className="w-6 h-6 text-yellow-500" />,
      title: "Digital Resources",
      description: "Access to e-books and online research databases",
    },
    {
      icon: <Calendar className="w-6 h-6 text-orange-500" />,
      title: "Author Visits",
      description: "Regular visits from childrens authors for inspiration",
    },
    {
      icon: <Award className="w-6 h-6 text-pink-500" />,
      title: "Literacy Awards",
      description: "Recognition for outstanding readers and researchers",
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          Library at Shining Stars Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          A haven for young readers and researchers, nurturing a lifelong love for learning
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">Our Library Facilities</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Shining Stars Primary School library is a state-of-the-art facility designed to inspire curiosity,
              foster learning, and promote literacy. Our library offers a welcoming environment for students to explore,
              study, and grow.
            </p>
            <ul className="space-y-4">
              {libraryFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-blue-500">{feature.title}</h3>
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Library Programs and Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryPrograms.map((program, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-4 mb-4">{program.icon}</div>
                <h3 className="font-semibold text-blue-500 mb-2">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{program.description}</p>
              </div>
            ))}
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
            <h2 className="text-2xl font-semibold text-blue-500">Supporting Curriculum and Beyond</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our library is an integral part of the academic experience at Shining Stars Primary School. We work
              closely with teachers to support the curriculum and provide resources for projects and research. Beyond
              academics, we strive to:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-blue-500" />
                <span>Cultivate a love for reading across all genres</span>
              </li>
              <li className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-green-500" />
                <span>Develop critical thinking and research skills</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Encourage collaboration and peer learning</span>
              </li>
              <li className="flex items-center space-x-2">
                <Laptop className="w-5 h-5 text-red-500" />
                <span>Introduce students to digital literacy and online resources</span>
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              Visit our library to explore the world of knowledge that awaits you!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionLibrary

