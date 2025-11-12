import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, ArrowRight, CheckCircle, Star, Users } from "lucide-react";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-16"
    >
      <div className="relative overflow-hidden shadow-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl">
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 right-0 w-full h-full translate-x-1/2 translate-y-1/2 bg-white rounded-full"
          />
        </div>

        <div className="relative px-6 py-16 md:px-16 md:py-24">
          
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold text-white">#1 Question Paper Portal</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Your Gateway to
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-200%"
            >
              Exam Excellence
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mb-10 text-lg font-light text-blue-100 md:text-xl lg:text-2xl"
          >
            Access <span className="font-bold text-white">1000+ verified</span> question papers from top universities.
            <span className="block mt-2">Prepare smarter, perform better 🎯</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/departments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 overflow-hidden font-bold text-indigo-600 transition-all duration-300 bg-white shadow-xl md:px-8 md:py-4 group rounded-2xl hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  Explore Departments
                  <ArrowRight className="w-5 h-5 transition-transform transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:opacity-10"
                  whileHover={{ scale: 1.5 }}
                />
              </motion.button>
            </Link>

            <Link to="/papers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 font-bold text-white transition-all duration-300 bg-transparent border-2 border-white md:px-8 md:py-4 rounded-2xl backdrop-blur-sm hover:bg-white hover:text-indigo-600"
              >
                View All Papers
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 md:gap-6 text-white/90"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">100% Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium">2k+ Students</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;