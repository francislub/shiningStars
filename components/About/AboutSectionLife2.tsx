"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"

import sport from "../../public/images/shin/chil.jpg"
import neta from "../../public/images/shin/stuc.jpg"
import netb from "../../public/images/shin/stuf.jpg"
import netc from "../../public/images/shin/teac.jpg"
import netd from "../../public/images/shin/tt.jpg"
import foota from "../../public/images/shin/tt.jpg"
import footb from "../../public/images/shin/teac.jpg"
import footc from "../../public/images/shin/stue.jpg"
import footd from "../../public/images/shin/s.jpg"
import basketa from "../../public/images/shi/gra.jpeg"
import basketb from "../../public/images/shi/grac.jpeg"
import basketc from "../../public/images/shi/grad.jpeg"
import basketd from "../../public/images/shi/gradz.jpeg"
import grad from "../../public/images/shi/teach.jpeg"

const images = [neta, netb, netc, netd, foota, footb, footc, footd, basketa, basketb, basketc, basketd]

const AboutSectionLife2 = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate={controls} variants={fadeInUpVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Pupil&#39;s Life At Shining Stars
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a world of opportunities, from sports to academics, where every student shines.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center mb-16">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={sport || "/placeholder.svg"}
                alt="Sports at Shining Stars"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-blue-600">Sports at Shining Stars</h3>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              At Shining Stars, sports are more than just physical activities – they&apos;re a cornerstone of our holistic
              education. Our state-of-the-art facilities and dedicated coaches nurture both recreational enthusiasts and
              competitive athletes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through sports, our students learn invaluable life skills such as teamwork, resilience, and leadership.
              Whether you&apos;re aiming for personal fitness or dreaming of athletic stardom, Shining Stars provides the
              perfect platform for your sporting journey.
            </p>
          </motion.div>
        </div>

        <motion.div initial="hidden" animate={controls} variants={staggerChildrenVariants} className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-purple-600">Our Vibrant Activities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <motion.div key={index} variants={childVariants} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Activity ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 hover:scale-110 hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">Activity {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-16" initial="hidden" animate={controls} variants={fadeInUpVariants}>
          <h3 className="text-3xl font-bold text-center mb-8 text-blue-600">Celebrating Excellence: Our Graduation</h3>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={grad || "/placeholder.svg"}
                  alt="Graduation at Shining Stars"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                Our graduation ceremony is the pinnacle of the Shining Stars experience. It&apos;s not just a celebration of
                academic achievements, but a recognition of personal growth, leadership, and community impact.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As we honor our graduates, we reflect on their journey and look forward to the bright futures they&apos;ll
                forge. It&apos;s a momentous occasion that brings together families, friends, and faculty to celebrate the
                remarkable accomplishments of our students.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 relative h-96 rounded-lg overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={fadeInUpVariants}
        >
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Slideshow"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-8">
            <h3 className="text-3xl font-bold text-white text-center">Experience the Shining Stars Difference</h3>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSectionLife2

