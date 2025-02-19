import { Sun, Stars, BookOpen, Check, Users, Star, Heart, Target, Globe } from "lucide-react"
import Link from "next/link"

export default function Mission() {
    const values = [
        {
          title: "Conducive Environment",
          description: "We foster a nurturing and supportive atmosphere that promotes growth and learning.",
          icon: <Users className="w-8 h-8 text-green-500" />,
        },
        {
          title: "Classic Performance",
          description:
            "We strive for excellence in all our endeavors, setting high standards and achieving remarkable results.",
          icon: <Star className="w-8 h-8 text-yellow-500" />,
        },
        {
          title: "Christ-like Character",
          description:
            "We embody and promote values of compassion, integrity, and selflessness in our actions and interactions.",
          icon: <Heart className="w-8 h-8 text-red-500" />,
        },
        {
          title: "Commitment without Compromise",
          description:
            "We are dedicated to our mission and values, maintaining our principles even in challenging situations.",
          icon: <Target className="w-8 h-8 text-blue-500" />,
        },
        {
          title: "Community Impact",
          description: "We actively engage with and positively influence our local and global communities.",
          icon: <Globe className="w-8 h-8 text-purple-500" />,
        },
      ]
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 z-0" />
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            Nurturing Tomorrow's
            <span className="text-blue-600"> Stars</span>
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Empowering young minds through holistic education and character development
          </p>
        </div>
      </section>

      {/* Motto, Vision, Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Motto */}
          <div className="group relative">
            <div className="absolute inset-0 bg-red-100 rounded-2xl transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-800">Our Motto</h2>
              <p className="text-lg text-red-700">Arise And Shine</p>
              <p className="text-orange-600 italic">(Isaiah 60:1)</p>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                01
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative">
            <div className="absolute inset-0 bg-yellow-100 rounded-2xl transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 space-y-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <Stars className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-800">Our Vision</h2>
              <p className="text-lg text-yellow-700">Raising Children In Our Community to Shine Like Stars</p>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                02
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="group relative">
            <div className="absolute inset-0 bg-red-100 rounded-2xl transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-800">Our Mission</h2>
              <p className="text-lg text-red-700">
                To Provide Holistic Education That Will Transform The Children And Their Generation
              </p>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                03
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Preview */}
      <div className="container grid gap-12 lg:grid-cols-3">
          {values.map((value, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 rounded-full bg-white shadow-md">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{value.description}</p>
              
            </div>
          ))}
        </div>
    </main>
  )
}

