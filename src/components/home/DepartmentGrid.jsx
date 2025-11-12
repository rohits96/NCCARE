import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookMarked, Calculator, Microscope, Briefcase, ArrowRight, ChevronRight } from "lucide-react";

const DepartmentGrid = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const popularDepartments = [
    { 
      name: "Computer Science", 
      icon: BookMarked, 
      papers: 156, 
      color: "from-blue-500 to-cyan-500", 
      students: "2.3k" 
    },
    { 
      name: "Mathematics", 
      icon: Calculator, 
      papers: 142, 
      color: "from-purple-500 to-pink-500", 
      students: "1.8k" 
    },
    { 
      name: "Physics", 
      icon: Microscope, 
      papers: 128, 
      color: "from-emerald-500 to-teal-500", 
      students: "1.5k" 
    },
    { 
      name: "Business", 
      icon: Briefcase, 
      papers: 134, 
      color: "from-orange-500 to-red-500", 
      students: "2.1k" 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
            Popular Departments
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Explore top departments with verified papers
          </p>
        </div>
        
        <Link to="/departments">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-6 py-3 mt-4 md:mt-0 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            View All
            <ChevronRight className="w-5 h-5 transition-transform transform group-hover:translate-x-1" />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {popularDepartments.map((dept, index) => {
          const Icon = dept.icon;
          const isHovered = hoveredCard === dept.name;

          return (
            <Link key={dept.name} to="/departments">
              <motion.div
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(dept.name)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-full overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer group backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border-white/50 dark:border-gray-700/50 hover:shadow-2xl"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative p-6">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${dept.color} rounded-2xl mb-4 shadow-lg`}
                  >
                    <Icon className="text-white w-7 h-7" />
                  </motion.div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                    {dept.name}
                  </h3>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Papers Available</span>
                      <span className="font-bold text-gray-800 dark:text-white">{dept.papers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Active Students</span>
                      <span className="font-bold text-gray-800 dark:text-white">{dept.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${dept.color}`}>
                      Explore Now
                    </span>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                {/* Shimmer effect */}
                <motion.div
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -skew-x-12"
                />
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      <Link to="/departments">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex md:hidden items-center justify-center gap-2 w-full px-6 py-3 mt-6 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          View All Departments
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </Link>
    </div>
  );
};

export default DepartmentGrid;