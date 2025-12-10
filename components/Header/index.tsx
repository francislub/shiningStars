"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaChevronDown,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaUsers,
  FaCalendarAlt,
  FaNewspaper,
  FaBars,
  FaTimes,
  FaBriefcase,
  FaUserCircle,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"
import image from "@/public/images/shin/log.jpg"
import "../../styles/nav.css"
import "../../styles/index.css"

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true)
      setScrolled(true)
    } else {
      setSticky(false)
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar)
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar)
    }
  }, [])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const aboutUsItems = [
    { title: "Why Choose Us", path: "/whyshin", icon: <HiSparkles /> },
    { title: "Our Mission", path: "/school-content", icon: <FaGraduationCap /> },
    { title: "Academic Programs", path: "/academics", icon: <FaUsers /> },
    { title: "Subjects Offered", path: "/subjects", icon: <FaNewspaper /> },
  ]

  const schoolLifeItems = [
    { title: "Student Life", path: "/studentlife", icon: <FaUsers /> },
    { title: "Classrooms", path: "/schoolife/classrooms", icon: <FaGraduationCap /> },
    { title: "Library", path: "/schoolife/library", icon: <FaNewspaper /> },
    { title: "ICT Center", path: "/schoolife/ICT", icon: <HiSparkles /> },
    { title: "Transport", path: "/schoolife/transport", icon: <FaMapMarkerAlt /> },
    { title: "Accommodation", path: "/accommodation", icon: <FaClock /> },
  ]

  const resourcesItems = [
    { title: "News & Updates", path: "/news", icon: <FaNewspaper /> },
    { title: "Events", path: "/events", icon: <FaCalendarAlt /> },
    { title: "Gallery", path: "/gallary", icon: <HiSparkles /> },
    { title: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  ]

  const staffItems = [
    { title: "Administrators", path: "/administrators", icon: <FaUsers /> },
    { title: "Teaching Staff", path: "/teaching", icon: <FaGraduationCap /> },
    { title: "Non-Teaching Staff", path: "/non-teaching", icon: <FaUsers /> },
    { title: "Student Leaders", path: "/studentleader", icon: <HiSparkles /> },
  ]

  const contactItems = [
    { title: "Contact Us", path: "/contact", icon: <FaEnvelope /> },
    { title: "Admission", path: "/admission", icon: <FaGraduationCap /> },
    { title: "Scholarships", path: "/scholarships", icon: <HiSparkles /> },
  ]

  return (
    <>
      {/* Top Info Bar */}
      {/* <motion.div
        className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-yellow-300" />
                <span>+256 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-yellow-300" />
                <span>info@shiningstars.ac.ug</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>Vvumba, Uganda</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-yellow-300" />
              <span>Mon - Fri: 7:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Main Header */}
      <motion.header
        className={`w-full z-50 transition-all duration-300 ${
          sticky
            ? "fixed top-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "absolute top-0 lg:top-10 bg-gradient-to-b from-black/50 to-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="Shining Stars Vvumba Logo"
                    width={60}
                    height={60}
                    className="rounded-full border-4 border-yellow-400 shadow-lg"
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div className="hidden md:block">
                  <h1 className={`text-xl font-bold ${sticky ? "text-gray-800" : "text-white"}`}>SHINING STARS</h1>
                  <p className={`text-sm ${sticky ? "text-gray-600" : "text-gray-200"}`}>MIXED DAY & BOARDING</p>
                  <p className={`text-sm ${sticky ? "text-gray-600" : "text-gray-200"}`}>
                    Nursery & Primary School - Vvumba
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink href="/" sticky={sticky}>
                Home
              </NavLink>

              <DropdownMenu
                title="About Us"
                items={aboutUsItems}
                sticky={sticky}
                isActive={activeDropdown === "about"}
                onToggle={() => handleDropdownToggle("about")}
                onClose={closeDropdown}
              />

              <DropdownMenu
                title="School Life"
                items={schoolLifeItems}
                sticky={sticky}
                isActive={activeDropdown === "school"}
                onToggle={() => handleDropdownToggle("school")}
                onClose={closeDropdown}
              />

              <DropdownMenu
                title="Staff"
                items={staffItems}
                sticky={sticky}
                isActive={activeDropdown === "staff"}
                onToggle={() => handleDropdownToggle("staff")}
                onClose={closeDropdown}
              />

              <DropdownMenu
                title="Resources"
                items={resourcesItems}
                sticky={sticky}
                isActive={activeDropdown === "resources"}
                onToggle={() => handleDropdownToggle("resources")}
                onClose={closeDropdown}
              />

              <DropdownMenu
                title="Contact"
                items={contactItems}
                sticky={sticky}
                isActive={activeDropdown === "contact"}
                onToggle={() => handleDropdownToggle("contact")}
                onClose={closeDropdown}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://shining1.vercel.app/admission"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <HiSparkles />
                  <span>Apply Now</span>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Menu Button with Recruitment Button */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.a
                href="mailto:shiningstars2022@gmail.com"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBriefcase size={14} />
                <span className="hidden sm:inline">Hiring</span>
              </motion.a>

              <motion.a
                href="https://shining1.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserCircle size={12} />
                <span className="hidden sm:inline">Staff</span>
              </motion.a>

              <motion.a
                href="https://shining1.vercel.app/login/parent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserCircle size={12} />
                <span className="hidden sm:inline">Parent</span>
              </motion.a>

              <motion.button
                onClick={navbarToggleHandler}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                {navbarOpen ? (
                  <FaTimes className={`w-6 h-6 ${sticky ? "text-gray-800" : "text-white"}`} />
                ) : (
                  <FaBars className={`w-6 h-6 ${sticky ? "text-gray-800" : "text-white"}`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-4">
                  <MobileNavLink href="/" onClick={() => setNavbarOpen(false)}>
                    Home
                  </MobileNavLink>

                  <MobileDropdown title="About Us" items={aboutUsItems} />
                  <MobileDropdown title="School Life" items={schoolLifeItems} />
                  <MobileDropdown title="Staff" items={staffItems} />
                  <MobileDropdown title="Resources" items={resourcesItems} />
                  <MobileDropdown title="Contact" items={contactItems} />

                  <div className="pt-4 border-t border-gray-200 mt-4 flex flex-col gap-2">
                    <motion.a
                      href="mailto:shiningstars2022@gmail.com"
                      className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 rounded-lg font-semibold"
                      onClick={() => setNavbarOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join Our Team
                    </motion.a>

                    <motion.a
                      href="https://shining1.vercel.app/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaUserCircle size={16} />
                      Staff Portal
                    </motion.a>

                    <motion.a
                      href="https://shining1.vercel.app/login/parent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaUserCircle size={16} />
                      Parent Portal
                    </motion.a>
                  </div>

                  <motion.div whileTap={{ scale: 0.95 }} className="pt-2">
                    <Link
                      href="https://shining1.vercel.app/admission"
                      className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 rounded-lg font-semibold"
                      onClick={() => setNavbarOpen(false)}
                    >
                      Apply Now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

// Navigation Link Component
const NavLink = ({ href, children, sticky }: { href: string; children: React.ReactNode; sticky: boolean }) => (
  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
    <Link
      href={href}
      className={`font-medium transition-colors duration-300 hover:text-yellow-400 ${
        sticky ? "text-gray-700" : "text-white"
      }`}
    >
      {children}
    </Link>
  </motion.div>
)

// Dropdown Menu Component
const DropdownMenu = ({
  title,
  items,
  sticky,
  isActive,
  onToggle,
  onClose,
}: {
  title: string
  items: any[]
  sticky: boolean
  isActive: boolean
  onToggle: () => void
  onClose: () => void
}) => (
  <div className="relative group">
    <motion.button
      onClick={onToggle}
      className={`flex items-center space-x-1 font-medium transition-colors duration-300 hover:text-yellow-400 ${
        sticky ? "text-gray-700" : "text-white"
      }`}
      whileHover={{ y: -2 }}
    >
      <span>{title}</span>
      <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <FaChevronDown className="w-3 h-3" />
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
          onMouseLeave={onClose}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200"
                onClick={onClose}
              >
                <span className="text-blue-500">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// Mobile Navigation Link
const MobileNavLink = ({
  href,
  children,
  onClick,
}: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <motion.div whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.div>
)

// Mobile Dropdown Component
const MobileDropdown = ({ title, items }: { title: string; items: any[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
        whileTap={{ scale: 0.95 }}
      >
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FaChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 mt-2 space-y-2"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className="flex items-center space-x-2 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="text-blue-500 text-sm">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
