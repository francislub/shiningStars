"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaChevronDown,
  FaCalendarAlt,
  FaUserCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { RiComputerLine } from "react-icons/ri"
import { HiSparkles } from "react-icons/hi"
import { LinearText } from "./LinearText"
import { Search } from "./Search"
import { useTypingEffect } from "@/utils/hooks"

const statements = [
  "Welcome to Shining Stars Nursery & Primary School",
  "Quality Education in Vvumba",
  "Apply Now for 2025 Academic Year",
  "Building Tomorrow's Leaders Today",
]

const EnhancedNavbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const displayedText = useTypingEffect(statements, 150, 3000)

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  const galleryItems = [
    {
      label: "School Gallery 2024",
      href: "https://photos.google.com/share/AF1QipOVrV6OjflOoHvuTC7w95KycHlXb-uQH0fV2w_dHJX7cBX0vsuJ1L9SQ_rYuzNgPg?key=cjBTMWxTN2tiNS1NVUx6VkVOeEZfWktLOG5wMFBB",
    },
    { label: "School Gallery 2023", href: "https://photos.app.goo.gl/fVYcE9K1GW8f98Jp9" },
    {
      label: "Zoo Visit Gallery",
      href: "https://photos.google.com/share/AF1QipM3aWmWdnZT28nqVVjQPo3KNfKz0NIjkF7Od8Ap73blWXzz-Pz1CHERvhnHC8zjcg?key=QWxpUkNxNW5BTHZCMDE3czEzMXpIWkFLWE9LUFpB",
    },
  ]

  const quickLinks = [
    { label: "School Calendar", href: "/calendar", icon: <FaCalendarAlt size={12} /> },
    { label: "News & Events", href: "/news", icon: <HiSparkles size={12} /> },
    { label: "Contact Us", href: "/contact", icon: <FaUserCircle size={12} /> },
  ]

  return (
    <motion.header
      // REDUCED HEIGHT: Added min-h-0 and reduced shadow
      className="bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-sm border-b border-blue-100 min-h-0"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        {/* REDUCED HEIGHT: Changed h-16 to h-12 to make the navbar shorter */}
        <div className="flex items-center justify-between h-12">
          {/* Left Section - Animated Text & Search */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="hidden lg:block"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* REDUCED HEIGHT: Added custom class for smaller text */}
              <div className="text-xs">
                <LinearText text={displayedText} />
              </div>
            </motion.div>
            {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}>
              <Search />
            </motion.div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Quick Links Dropdown */}
            <DropdownNavLink
              title="Quick Links"
              items={quickLinks}
              icon={<HiSparkles size={14} />}
              isActive={activeDropdown === "quick"}
              onToggle={() => toggleDropdown("quick")}
              onClose={closeDropdowns}
            />

            {/* Gallery Dropdown */}
            <DropdownNavLink
              title="Gallery"
              items={galleryItems}
              icon={<RiComputerLine size={14} />}
              isActive={activeDropdown === "gallery"}
              onToggle={() => toggleDropdown("gallery")}
              onClose={closeDropdowns}
            />

            {/* Calendar Link */}
            <AnimatedNavLink href="/calendar" icon={<FaCalendarAlt size={14} />}>
              Calendar
            </AnimatedNavLink>

            {/* Staff Portal Button */}
            <motion.a
              href="https://shining1.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle size={12} />
              <span>Staff</span>
            </motion.a>

            {/* Parent Portal Button */}
            <motion.a
              href="https://shining1.vercel.app/login/parent"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle size={12} />
              <span>Parent</span>
            </motion.a>
          </nav>

          {/* Social Media Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.div
              // REDUCED HEIGHT: Reduced padding and shadow
              className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SocialIcon
                href="https://www.facebook.com/share/16F8BLqHF8/"
                icon={<FaFacebookF size={12} />}
                color="text-blue-600"
              />
              <SocialIcon href="https://twitter.com" icon={<FaTwitter size={12} />} color="text-sky-500" />
              <SocialIcon href="https://instagram.com" icon={<FaInstagram size={12} />} color="text-pink-500" />
              <SocialIcon
                href=""
                icon={<FaLinkedinIn size={12} />}
                color="text-blue-700"
              />
            </motion.div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Search />
            <motion.button
              onClick={() => setNavbarOpen(!navbarOpen)}
              // REDUCED HEIGHT: Smaller padding and icon size
              className="p-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              {navbarOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </motion.button>
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
              className="lg:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-blue-100"
            >
              <MobileMenu closeMenu={() => setNavbarOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// Enhanced Animated Nav Link
const AnimatedNavLink: React.FC<{
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}> = ({ href, icon, children }) => (
  <motion.a
    href={href}
    // REDUCED HEIGHT: Reduced padding for smaller height
    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-2 py-1 rounded-lg hover:bg-blue-50"
    whileHover={{ scale: 1.05, y: -1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
      {icon}
    </motion.span>
    <span>{children}</span>
  </motion.a>
)

// Enhanced Dropdown Component
const DropdownNavLink: React.FC<{
  title: string
  items: { label: string; href: string; icon?: React.ReactNode }[]
  icon: React.ReactNode
  isActive: boolean
  onToggle: () => void
  onClose: () => void
}> = ({ title, items, icon, isActive, onToggle, onClose }) => {
  return (
    <div className="relative group">
      <motion.button
        onClick={onToggle}
        // REDUCED HEIGHT: Reduced padding for smaller height
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium px-2 py-1 rounded-lg hover:bg-blue-50"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
          {icon}
        </motion.span>
        <span>{title}</span>
        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FaChevronDown size={12} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 backdrop-blur-sm"
            onMouseLeave={onClose}
          >
            {items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 text-sm"
                onClick={onClose}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                {item.icon && <span className="text-blue-500">{item.icon}</span>}
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Social Icon
const SocialIcon: React.FC<{
  href: string
  icon: React.ReactNode
  color: string
}> = ({ href, icon, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // REDUCED HEIGHT: Reduced padding for smaller icons
    className={`${color} hover:scale-110 transition-all duration-300 p-0.5 rounded-full hover:bg-white/50`}
    whileHover={{ scale: 1.2, rotate: 360 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
)

// Enhanced Mobile Menu
const MobileMenu: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => (
  <nav className="flex flex-col space-y-1 py-4 px-4">
    <MobileNavItem href="/calendar" icon={<FaCalendarAlt size={14} />} onClick={closeMenu}>
      Calendar
    </MobileNavItem>

    <MobileNavItem href="/news" icon={<HiSparkles size={14} />} onClick={closeMenu}>
      News & Events
    </MobileNavItem>

    <MobileNavItem href="/contact" icon={<FaUserCircle size={14} />} onClick={closeMenu}>
      Contact Us
    </MobileNavItem>

    <div className="border-t border-gray-200 my-2"></div>

    <MobileNavItem
      href="https://photos.google.com/share/AF1QipOVrV6OjflOoHvuTC7w95KycHlXb-uQH0fV2w_dHJX7cBX0vsuJ1L9SQ_rYuzNgPg?key=cjBTMWxTN2tiNS1NVUx6VkVOeEZfWktLOG5wMFBB"
      icon={<RiComputerLine size={14} />}
      onClick={closeMenu}
    >
      Gallery 2024
    </MobileNavItem>

    <MobileNavItem
      href="https://photos.app.goo.gl/fVYcE9K1GW8f98Jp9"
      icon={<RiComputerLine size={14} />}
      onClick={closeMenu}
    >
      Gallery 2023
    </MobileNavItem>

    <div className="pt-2">
      <motion.a
        href="https://shining1.vercel.app/login"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-lg font-semibold shadow-lg"
        onClick={closeMenu}
        whileTap={{ scale: 0.95 }}
      >
        Staff Portal
      </motion.a>
    </div>

    <div className="pt-2">
      <motion.a
        href="https://shining1.vercel.app/login/parent"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-3 rounded-lg font-semibold shadow-lg"
        onClick={closeMenu}
        whileTap={{ scale: 0.95 }}
      >
        Parent Portal
      </motion.a>
    </div>

    <div className="flex items-center justify-center space-x-4 pt-3 border-t border-gray-200 mt-3">
      <SocialIcon
        href="https://www.facebook.com/share/16F8BLqHF8"
        icon={<FaFacebookF size={16} />}
        color="text-blue-600"
      />
      <SocialIcon href="https://twitter.com" icon={<FaTwitter size={16} />} color="text-sky-500" />
      <SocialIcon href="" icon={<FaTiktok size={16} />} color="text-gray-800" />
      <SocialIcon href="" icon={<FaYoutube size={16} />} color="text-red-600" />
    </div>
  </nav>
)

// Mobile Navigation Item
const MobileNavItem: React.FC<{
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
}> = ({ href, icon, children, onClick }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium"
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-blue-500">{icon}</span>
    <span>{children}</span>
  </motion.a>
)

export default EnhancedNavbar
