import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/papers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mb-16 -mt-8"
    >
      <div className="max-w-4xl p-2 mx-auto border shadow-xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border-white/50 dark:border-gray-700/50">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl"
          >
            <Search className="w-6 h-6 text-white" />
          </motion.div>
          
          <input
            type="text"
            placeholder="Search for papers, subjects, or departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-base md:text-lg font-medium text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none"
          />
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-6 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-lg"
          >
            Search
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchBar;