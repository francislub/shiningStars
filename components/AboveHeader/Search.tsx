"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaTimes } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"
import { useRouter } from "next/navigation"

interface SearchItem {
  title: string
  link: string
  category: string
}

const searchItems: SearchItem[] = [
  { title: "Home", link: "/", category: "Navigation" },
  { title: "About Us", link: "/school-content", category: "School Info" },
  { title: "Admissions", link: "/admission", category: "Enrollment" },
  { title: "Academic Programs", link: "/academics", category: "Education" },
  { title: "News & Events", link: "/news", category: "Updates" },
  { title: "Gallery", link: "/gallary", category: "Media" },
  { title: "Contact", link: "/contact", category: "Support" },
  { title: "Calendar", link: "/calendar", category: "Schedule" },
]

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      setSearchResults([])
      return
    }

    const filteredResults = searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      router.push(searchResults[0].link)
      setIsOpen(false)
      setSearchTerm("")
    }
    if (e.key === "Escape") {
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  const handleResultClick = (link: string) => {
    router.push(link)
    setIsOpen(false)
    setSearchTerm("")
  }

  const closeSearch = () => {
    setIsOpen(false)
    setSearchTerm("")
    setSearchResults([])
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600 focus:outline-none px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open search"
      >
        <FaSearch size={14} />
        <span className="hidden sm:block text-sm font-medium">Search...</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4"
            onClick={closeSearch}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search Shining Stars..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3 text-lg bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={closeSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Close search"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleResultClick(item.link)}
                        className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 focus:outline-none focus:bg-blue-50 transition-all duration-200 rounded-lg flex items-center justify-between group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center space-x-3">
                          <HiSparkles
                            className="text-blue-500 group-hover:text-purple-500 transition-colors duration-200"
                            size={16}
                          />
                          <div>
                            <div className="font-medium text-gray-800">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                          </div>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-blue-500 text-sm">→</span>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <FaSearch size={32} className="mx-auto" />
                    </div>
                    <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                    <p className="text-gray-400 text-sm mt-1">Try searching for something else</p>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-blue-400 mb-2">
                      <HiSparkles size={32} className="mx-auto" />
                    </div>
                    <p className="text-gray-600 font-medium">Start typing to search</p>
                    <p className="text-gray-400 text-sm mt-1">Find pages, news, events, and more</p>
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press Enter to search</span>
                  <span>ESC to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
