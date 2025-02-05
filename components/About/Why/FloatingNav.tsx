"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const FloatingNav = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { title: "Home", href: "#" },
    { title: "About", href: "#" },
    { title: "Academics", href: "#" },
    { title: "Student Life", href: "#" },
    { title: "Contact", href: "#" },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 flex flex-col justify-center"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="py-2 px-4 text-lg font-semibold text-gray-800 hover:bg-gray-100"
              >
                {item.title}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingNav

