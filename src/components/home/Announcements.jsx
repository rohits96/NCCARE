import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Clock, AlertCircle, Info, Megaphone, ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Announcements = ({ userDepartment = "all", maxDisplay = 3 }) => {
  const [expandedId, setExpandedId] = useState(null);
  const announcements = useQuery(api.announcements.getAllAnnouncements);

  // Filter announcements for user's department
  const relevantAnnouncements = announcements?.filter(announcement => {
    const matchesDepartment = 
      announcement.targetDepartment === 'all' || 
      announcement.targetDepartment === userDepartment ||
      userDepartment === 'all';
    
    return matchesDepartment;
  }).sort((a, b) => {
    // Sort by priority first (urgent > important > normal)
    const priorityOrder = { urgent: 0, important: 1, normal: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by date (newest first)
    return b._creationTime - a._creationTime;
  }).slice(0, maxDisplay);

  const getTypeStyles = (priority) => {
    switch (priority) {
      case 'urgent':
        return {
          color: 'bg-red-500',
          icon: AlertCircle,
          text: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20'
        };
      case 'important':
        return {
          color: 'bg-yellow-500',
          icon: Bell,
          text: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20'
        };
      default:
        return {
          color: 'bg-blue-500',
          icon: Info,
          text: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return new Date(timestamp).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  // Loading state
  if (announcements === undefined) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Announcements
          </h2>
        </motion.div>
        <div className="flex items-center justify-center py-8 border backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl border-white/50 dark:border-gray-700/50">
          <Loader2 className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400 animate-spin" />
          <span className="text-gray-600 dark:text-gray-400">Loading announcements...</span>
        </div>
      </div>
    );
  }

  // Empty state
  if (!relevantAnnouncements || relevantAnnouncements.length === 0) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Announcements
          </h2>
        </motion.div>
        <div className="flex flex-col items-center justify-center py-8 border backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl border-white/50 dark:border-gray-700/50">
          <Megaphone className="w-12 h-12 mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">No announcements at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Announcements
          </h2>
        </div>
        {announcements.length > maxDisplay && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/announcements'}
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {relevantAnnouncements.map((announcement, index) => {
          const styles = getTypeStyles(announcement.priority);
          const IconComponent = styles.icon;
          const isExpanded = expandedId === announcement._id;

          return (
            <motion.div
              key={announcement._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: -5 }}
              onClick={() => setExpandedId(isExpanded ? null : announcement._id)}
              className={`backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-4 border ${styles.border} shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${styles.bg}`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    scale: announcement.priority === 'urgent' ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: announcement.priority === 'urgent' ? Infinity : 0,
                  }}
                  className={`flex-shrink-0 p-2 rounded-lg ${styles.bg} border ${styles.border}`}
                >
                  <IconComponent className={`w-4 h-4 ${styles.text}`} />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white">
                      {announcement.title}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold border rounded-full ${styles.border} ${styles.text} flex-shrink-0`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-2 text-xs text-gray-700 whitespace-pre-wrap dark:text-gray-300"
                      >
                        {announcement.message}
                      </motion.p>
                    ) : (
                      <p className="mb-2 text-xs text-gray-700 dark:text-gray-300 line-clamp-1">
                        {announcement.message}
                      </p>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(announcement._creationTime)}
                    </div>
                    {announcement.targetDepartment !== 'all' && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {announcement.targetDepartment}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Announcements;