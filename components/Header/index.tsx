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
    { title: "Admission", path: "https://shining1.vercel.app/admission", icon: <FaGraduationCap /> },
    { title: "Scholarships", path: "/scholarships", icon: <HiSparkles /> },
  ]

  return (
    <>

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
      </motion.header>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {navbarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setNavbarOpen(false)}
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-screen w-80 max-w-[90vw] bg-gradient-to-b from-white to-gray-50 shadow-2xl border-r border-gray-200 z-50 lg:hidden overflow-hidden flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between border-b border-blue-500">
                <h2 className="text-xl font-bold">Menu</h2>
                <motion.button
                  onClick={() => setNavbarOpen(false)}
                  className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <nav className="space-y-2 p-4">
                  <MobileNavLink href="/" onClick={() => setNavbarOpen(false)}>
                    Home
                  </MobileNavLink>

                  <MobileDropdown title="About Us" items={aboutUsItems} onClose={() => setNavbarOpen(false)} />
                  <MobileDropdown title="School Life" items={schoolLifeItems} onClose={() => setNavbarOpen(false)} />
                  <MobileDropdown title="Staff" items={staffItems} onClose={() => setNavbarOpen(false)} />
                  <MobileDropdown title="Resources" items={resourcesItems} onClose={() => setNavbarOpen(false)} />
                  <MobileDropdown title="Contact" items={contactItems} onClose={() => setNavbarOpen(false)} />
                </nav>
              </div>

              {/* Sidebar Footer with Actions */}
              <div className="bg-white border-t border-gray-200 p-4 space-y-3">
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

                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="https://shining1.vercel.app/admission"
                    className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 rounded-lg font-semibold"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
      className="block py-3 px-4 text-gray-700 font-semibold rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-l-4 border-transparent hover:border-blue-600"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.div>
)

// Mobile Dropdown Component
const MobileDropdown = ({ title, items, onClose }: { title: string; items: any[]; onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-transparent">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
        whileTap={{ scale: 0.95 }}
      >
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FaChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white space-y-1 overflow-hidden"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.path}
                  className="flex items-center space-x-3 py-2 px-6 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-l-2 border-transparent hover:border-blue-600"
                  onClick={onClose}
                >
                  <span className="text-blue-500 text-sm">{item.icon}</span>
                  <span className="text-sm font-medium">{item.title}</span>
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
