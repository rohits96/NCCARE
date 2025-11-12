import React from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, Users, CheckCircle } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    { 
      label: "Total Papers", 
      value: "10,000+", 
      icon: FileText, 
      color: "from-blue-500 to-blue-600",
      delay: 0.1 
    },
    { 
      label: "Departments", 
      value: "24", 
      icon: BookOpen, 
      color: "from-purple-500 to-purple-600",
      delay: 0.2 
    },
    { 
      label: "Active Students", 
      value: "50k+", 
      icon: Users, 
      color: "from-emerald-500 to-emerald-600",
      delay: 0.3 
    },
    { 
      label: "Verified Papers", 
      value: "98%", 
      icon: CheckCircle, 
      color: "from-orange-500 to-orange-600",
      delay: 0.4 
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 gap-4 mb-16 md:grid-cols-4 md:gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 transition-all duration-300 border shadow-lg cursor-pointer group backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border-white/50 dark:border-gray-700/50 hover:shadow-2xl"
          >
            <motion.div
              whileHover={{ rotate: 6, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-4 shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: stat.delay, type: "spring", stiffness: 200 }}
              className="mb-1 text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
            >
              {stat.value}
            </motion.div>
            
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsGrid;