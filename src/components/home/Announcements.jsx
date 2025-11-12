import React from "react";
import { motion } from "framer-motion";
import { Bell, Clock } from "lucide-react";

const Announcements = () => {
  const announcements = [
    { 
      title: "New Papers Added: Physics Department", 
      date: "2 hours ago", 
      type: "update" 
    },
    { 
      title: "Exam Schedule Released for Dec 2024", 
      date: "1 day ago", 
      type: "important" 
    },
    { 
      title: "Website Maintenance on Nov 15", 
      date: "3 days ago", 
      type: "info" 
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
    hidden: { opacity: 0, x: 30 },
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
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-6"
      >
        <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Announcements
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {announcements.map((announcement, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: -5 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-4 border border-white/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  scale: announcement.type === 'important' ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: announcement.type === 'important' ? Infinity : 0,
                }}
                className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  announcement.type === 'important' 
                    ? 'bg-red-500' 
                    : announcement.type === 'update' 
                    ? 'bg-green-500' 
                    : 'bg-blue-500'
                }`}
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {announcement.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  {announcement.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Announcements;