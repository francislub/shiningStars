

import Image from "next/image"
import {
  Monitor,
  Code,
  Database,
  Globe,
  Cpu,
  Users,
  Lightbulb,
  Rocket,
  FileText,
  Table,
  PresentationIcon as PresentationScreen,
  Newspaper,
} from "lucide-react"

const AboutSectionICT = () => {
  const courseModules = [
    {
      icon: <Monitor className="w-6 h-6 text-blue-500" />,
      title: "Computer Basics",
      description: "Introduction to hardware, software, and operating systems",
    },
    // {
    //   icon: <Code className="w-6 h-6 text-green-500" />,
    //   title: "Coding Fundamentals",
    //   description: "Learn basic programming concepts and simple coding",
    // },
    // {
    //   icon: <Database className="w-6 h-6 text-purple-500" />,
    //   title: "Data Management",
    //   description: "Understanding file systems and basic data organization",
    // },
    {
      icon: <Globe className="w-6 h-6 text-red-500" />,
      title: "Internet Safety",
      description: "Navigate the web safely and responsibly",
    },
  ]

  const learningOutcomes = [
    {
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      title: "Tech Literacy",
      description: "Develop a strong foundation in using digital tools",
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "Collaboration",
      description: "Learn to work on group projects using digital platforms",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-orange-500" />,
      title: "Problem Solving",
      description: "Enhance logical thinking and problem-solving skills",
    },
    {
      icon: <Rocket className="w-6 h-6 text-pink-500" />,
      title: "Future Readiness",
      description: "Prepare for a technology-driven future",
    },
  ]

  const basicSkills = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Microsoft Word",
      description: "Create and format documents, learn text styling, and page layout",
    },
    {
      icon: <Table className="w-6 h-6 text-green-600" />,
      title: "Microsoft Excel",
      description: "Build spreadsheets, use formulas, and create charts and graphs",
    },
    {
      icon: <PresentationScreen className="w-6 h-6 text-red-600" />,
      title: "Microsoft PowerPoint",
      description: "Design engaging presentations with slides, animations, and transitions",
    },
    {
      icon: <Newspaper className="w-6 h-6 text-purple-600" />,
      title: "Microsoft Publisher",
      description: "Develop eye-catching publications, brochures, and newsletters",
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          Computer Studies at Shining Stars Vvumba Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Empowering young minds with essential digital skills for the 21st century
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">Our ICT Curriculum</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Shining Stars Vvumba Nursery And Primary School, we believe in preparing our Learners for a digital future. Our
              comprehensive computer studies program is designed to introduce children to the world of technology in a
              fun, engaging, and age-appropriate manner.
            </p>
            <ul className="space-y-4">
              {courseModules.map((module, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{module.icon}</div>
                  <div>
                    <h3 className="font-semibold text-blue-500">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{module.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841a4970039c3427287/view?project=683381d6001779054d64&mode=admin"
              alt="Shining Stars Building"
              layout="fill"
              objectFit="cover"
              className="w-[500px] lg:mt-12 -mb-10 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Basic Computing Skills</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We ensure our Learners are proficient in essential office applications, preparing them for academic success
            and future careers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicSkills.map((skill, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1">{skill.icon}</div>
                <div>
                  <h3 className="font-semibold text-blue-500">{skill.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Learning Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 mb-4">{outcome.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{outcome.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
              src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6845b60600074b1e4f49/view?project=683381d6001779054d64&mode=admin"
              alt="Shining Stars "
              layout="fill"
              objectFit="cover"
              className="w-[500px] lg:mt-12 -mb-10 rounded-lg"
            />

          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-2xl font-semibold text-blue-500">ICT Club: Beyond the Classroom</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our ICT Club provides enthusiastic Learners with opportunities to explore technology beyond the regular
              curriculum. Club activities include:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Graphics Design Using Publisher</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-500" />
                <span>Hardware use and maintaince</span>
              </li>
              <li className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                <span>Typing Skill</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-500" />
                <span>Designing powerpoint presentations</span>
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              The ICT Club is a great way for Learners to deepen their interest in technology and connect with
              like-minded peers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSectionICT

