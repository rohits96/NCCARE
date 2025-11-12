import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Eye, Download } from "lucide-react";

const FeaturedPapers = () => {
  const featuredPapers = [
    { 
      title: "Advanced Calculus Final Exam 2024", 
      dept: "Mathematics", 
      year: "2024", 
      downloads: 1234, 
      verified: true 
    },
    { 
      title: "Data Structures & Algorithms Mid-Sem", 
      dept: "Computer Science", 
      year: "2024", 
      downloads: 2156, 
      verified: true 
    },
    { 
      title: "Quantum Mechanics Theory Paper", 
      dept: "Physics", 
      year: "2023", 
      downloads: 891, 
      verified: true 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="lg:col-span-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
          Featured Papers
        </h2>
        <Link to="/papers">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            View All
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {featuredPapers.map((paper, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            className="group backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-6 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {paper.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </motion.div>
                  )}
                  <span className="px-2 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    {paper.year}
                  </span>
                </div>

                <h3 className="mb-2 text-base md:text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {paper.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {paper.dept}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {paper.downloads.toLocaleString()} views
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-white transition-all duration-300 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedPapers;