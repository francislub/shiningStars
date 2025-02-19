"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import Masonry from "react-masonry-css"

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

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">Pupil&#39;s Life At School</h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Whether your passion is sport or sustainability, you&#39;re a foodie or keen on gaming, there are lots to
            choose from.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center mb-16">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={sport || "/placeholder.svg"}
              alt="Sports at Shining Stars"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            className="lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4">Sports at Shining Stars</h3>
            <p className="text-lg mb-6">
              At Shining Stars, sports play a vital role in student life. From soccer and basketball to volleyball and
              athletics, students have numerous opportunities to engage in physical activities and competitions. The
              School&#39;s sports facilities are top-notch, providing a conducive environment for both recreational and
              competitive sports.
            </p>
            <p className="text-lg">
              Participating in sports not only helps students stay fit but also fosters teamwork, discipline, and
              leadership skills. Whether you&#39;re a seasoned athlete or just looking to stay active, Shining Stars
              offers something for everyone.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="text-3xl font-bold text-center mb-8">Our Activities</h3>
          <Masonry
            breakpointCols={{
              default: 4,
              1100: 3,
              700: 2,
              500: 1,
            }}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((img, index) => (
              <motion.div key={index} className="mb-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Activity ${index + 1}`}
                  className="rounded-lg shadow-md"
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        <motion.div
          className="mt-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="text-3xl font-bold text-center mb-8">Top Class Graduation</h3>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <Image
                src={grad || "/placeholder.svg"}
                alt="Graduation at Shining Stars"
                className="rounded-lg shadow-lg"
                width={600}
                height={400}
                objectFit="cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <p className="text-lg mb-6">
                At Shining Stars, we celebrate the achievements of our students with a grand graduation ceremony. This
                event marks the culmination of years of hard work and dedication, showcasing the bright futures that
                await our graduates.
              </p>
              <p className="text-lg">
                Our graduation ceremonies are not just about academic achievements, but also about recognizing the
                personal growth, leadership skills, and community contributions of our students. It&#39;s a time for
                families, friends, and faculty to come together and honor the accomplishments of our graduating class.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSectionLife2

