"use client"
import Image from "next/image";
import image from "../../public/images/shin/stu.jpg";
import { motion } from "framer-motion"
import { Book, Globe, Star, GraduationCap, Users, Award, Library } from "lucide-react"

export default function AboutSectionAcademic() {
  const stats = [
    { icon: <GraduationCap className="w-6 h-6" />, label: "Professional Courses", value: "15+" },
    { icon: <Users className="w-6 h-6" />, label: "Expert Lecturers", value: "50+" },
    { icon: <Award className="w-6 h-6" />, label: "Certifications", value: "20+" },
    { icon: <Library className="w-6 h-6" />, label: "Research Papers", value: "100+" },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-background to-muted">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16"
        >
          Excellence in Research, Teaching, and Medical Care
        </motion.h2>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">{stat.icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* First Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="relative group">
              <Image
                src={image}
                alt="Academic Excellenc"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">Professional Development</h3>
            <p className="text-muted-foreground leading-relaxed">
              We offer a comprehensive range of professional courses across our faculties. The Department of Computing
              and Technology provides industry-recognized certifications including CISCO (CCNA, CCNP) and Microsoft
              (MCSE, MCSA). Our School of Business prepares students for CPA and various accounting professional
              courses, while our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board
              (UNMEB).
            </p>
            <div className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">Quality Education</h3>
            <p className="text-muted-foreground leading-relaxed">
              The School treasures the quality of its products, and for that reason, we hire quality and experienced
              lecturers to train and produce excellence in our students. Our lecturers are associated with industry
              enterprises which helps them get the market experience that they instill in our students. Research is a
              core role for our lecturers to keep producing relevant knowledge for the market.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">Expert Faculty</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-medium">Recognition</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="relative group">
              <Image
                src={image}
                alt="Quality Education"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


