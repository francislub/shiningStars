import {
  BookOpenIcon,
  GlobeAltIcon,
  CalculatorIcon,
  BeakerIcon,
  PencilIcon,
  MusicNoteIcon,
  DesktopComputerIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/solid"

const subjects = [
  {
    name: "English",
    icon: <BookOpenIcon className="w-8 h-8 text-blue-500" />,
    description:
      "Develop strong reading, writing, and communication skills through engaging literature and language activities.",
  },
  {
    name: "Mathematics",
    icon: <CalculatorIcon className="w-8 h-8 text-green-500" />,
    description:
      "Build a solid foundation in arithmetic, geometry, and problem-solving through interactive lessons and exercises.",
  },
  {
    name: "Science",
    icon: <BeakerIcon className="w-8 h-8 text-purple-500" />,
    description:
      "Explore the natural world through hands-on experiments and exciting discoveries in biology, chemistry, and physics.",
  },
  {
    name: "Social Studies",
    icon: <GlobeAltIcon className="w-8 h-8 text-yellow-500" />,
    description: "Learn about history, geography, and cultures to become informed and responsible global citizens.",
  },
  {
    name: "Art",
    icon: <PencilIcon className="w-8 h-8 text-red-500" />,
    description:
      "Express creativity through various mediums including drawing, painting, and crafts, fostering imagination and fine motor skills.",
  },
  {
    name: "Music",
    icon: <MusicNoteIcon className="w-8 h-8 text-indigo-500" />,
    description:
      "Develop an appreciation for music through singing, instrument playing, and understanding musical concepts.",
  },
  {
    name: "Computer Studies",
    icon: <DesktopComputerIcon className="w-8 h-8 text-cyan-500" />,
    description:
      "Gain essential digital literacy skills, learn basic programming concepts, and explore safe internet practices.",
  },
  {
    name: "Religious Education",
    icon: <HeartIcon className="w-8 h-8 text-pink-500" />,
    description:
      "Explore various faiths, moral values, and ethical principles to foster understanding and respect for diverse beliefs.",
  },
  {
    name: "Physical Education",
    icon: <UserGroupIcon className="w-8 h-8 text-orange-500" />,
    description:
      "Promote physical fitness, teamwork, and healthy lifestyles through sports, games, and exercise activities.",
  },
  {
    name: "Life Skills",
    icon: <SparklesIcon className="w-8 h-8 text-teal-500" />,
    description:
      "Develop essential personal and interpersonal skills, including communication, decision-making, and emotional intelligence.",
  },
]

const SubjectsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-12">Our Comprehensive Curriculum</h2>
        <p className="text-center text-xl mb-16 max-w-3xl mx-auto text-gray-600">
          At Shining Stars Primary School, we offer a diverse and well-rounded curriculum designed to nurture young
          minds, develop essential skills, and prepare students for future success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {subject.icon}
                <h3 className="text-2xl font-semibold ml-3 text-red-600">{subject.name}</h3>
              </div>
              <p className="text-gray-600">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SubjectsSection

