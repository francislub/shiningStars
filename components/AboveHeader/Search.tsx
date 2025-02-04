import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SearchItem {
  title: string;
  link: string;
}

const searchItems: SearchItem[] = [
  { title: "Home", link: "/" },
  // { title: "Admissions", link: "" },

];

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredResults = searchItems.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      router.push(searchResults[0].link);
      setIsOpen(false);
    }
  };

  const handleResultClick = (link: string) => {
    router.push(link);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-blue-600 focus:outline-none"
        aria-label="Open search"
      >
        <FaSearch size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white text-gray-500 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-4 text-lg focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close search"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleResultClick(item.link)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200"
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  searchTerm && (
                    <p className="px-4 py-3 text-gray-500">No results found</p>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

