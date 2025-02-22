
"use client"

import Image from "next/image"
import { BookOpen, Globe, Star, Eye, Users, Music, Palette, Calculator } from "lucide-react"
import { useState } from "react"
import imaga from "../../public/images/shin/buila.jpg";

const ClassroomSection = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const classrooms = [
    { name: "Sunbeam", icon: <Star className="h-6 w-6" />, description: "For our youngest learners, ages 5-6" },
    { name: "Rainbow", icon: <Palette className="h-6 w-6" />, description: "Creative space for ages 6-7" },
    { name: "Explorer", icon: <Globe className="h-6 w-6" />, description: "Discovery hub for ages 7-8" },
    { name: "Innovator", icon: <Calculator className="h-6 w-6" />, description: "STEM focus for ages 8-9" },
    { name: "Harmony", icon: <Music className="h-6 w-6" />, description: "Arts and music for ages 9-10" },
    { name: "Visionary", icon: <Eye className="h-6 w-6" />, description: "Advanced learning for ages 10-11" },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-500 sm:text-4xl lg:text-5xl mb-8">
          Inspiring Classrooms at Shining Stars Primary School
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Our classrooms are designed to nurture curiosity, creativity, and academic excellence in a warm and supportive
          environment.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 mr-2 rounded-md ${activeTab === "overview" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 rounded-md ${activeTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Classroom Details
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">Our Learning Spaces</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At Shining Stars Primary School, we believe that the environment plays a crucial role in a child's
                learning journey. Our classrooms are thoughtfully designed to:
              </p>
              <ul className="space-y-2">
                {[
                  { icon: <Users className="h-5 w-5 text-blue-500" />, text: "Foster collaboration and teamwork" },
                  { icon: <BookOpen className="h-5 w-5 text-green-500" />, text: "Encourage independent learning" },
                  {
                    icon: <Palette className="h-5 w-5 text-purple-500" />,
                    text: "Stimulate creativity and imagination",
                  },
                  { icon: <Calculator className="h-5 w-5 text-red-500" />, text: "Support STEM education" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {item.icon}
                    <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Schedule a Tour
              </button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
             
              <Image
              src={imaga}
              alt="Shining Stars Building"
              layout="fill"
              objectFit="cover"
              className="w-[500px] h-[300px] lg:mt-12 -mb-10 rounded-lg"
            />
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-2">
                  {classroom.icon}
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{classroom.name} Classroom</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{classroom.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Equipped with interactive whiteboards, cozy reading corners, and flexible seating arrangements to
                  accommodate various learning styles.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ClassroomSection

