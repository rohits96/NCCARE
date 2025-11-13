import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap } from "lucide-react";

const CTABanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="relative overflow-hidden shadow-2xl backdrop-blur-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl">
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-96 h-96"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 bg-white rounded-full w-96 h-96"
          />
        </div>

        <div className="relative px-6 py-16 text-center md:px-16">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl"
          >
            Ready to Excel in Your Exams?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-blue-100"
          >
            Join 2000+ students who trust our platform for their exam preparation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/sign-up">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 font-bold text-indigo-600 transition-all duration-300 bg-white shadow-xl group rounded-2xl hover:shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                </span>
              </motion.button>
            </Link>
            
            <Link to="/papers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 font-bold text-white transition-all duration-300 bg-transparent border-2 border-white rounded-2xl backdrop-blur-sm hover:bg-white hover:text-indigo-600"
              >
                Browse Papers
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-blue-200"
          >
            ✨ No credit card required • Free forever • Instant access
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default CTABanner;
