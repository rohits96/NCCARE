import React from "react";
import { useUser } from "@clerk/clerk-react";
import { FileText, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-4xl font-extrabold text-white">
            Welcome, {user?.firstName || "Student"}! 👋
          </h1>
          <p className="text-gray-300">Your student dashboard</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-[#0F153A]/70 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <FileText className="w-8 h-8 mb-3 text-blue-400" />
            <h3 className="mb-1 text-xl font-bold text-white">My Papers</h3>
            <p className="text-sm text-gray-400">Access your saved papers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-[#0F153A]/70 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <BookOpen className="w-8 h-8 mb-3 text-purple-400" />
            <h3 className="mb-1 text-xl font-bold text-white">Browse Papers</h3>
            <p className="text-sm text-gray-400">Explore all available papers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-[#0F153A]/70 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <Calendar className="w-8 h-8 mb-3 text-green-400" />
            <h3 className="mb-1 text-xl font-bold text-white">Recent Activity</h3>
            <p className="text-sm text-gray-400">View your recent actions</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-[#0F153A]/70 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Quick Actions</h2>
          <p className="text-gray-300">
            This is your student dashboard. More features coming soon!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;

