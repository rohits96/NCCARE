import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      avatar: "PS",
      rating: 5,
      text: "This platform helped me ace my semester exams! The papers are well-organized and verified. Highly recommended!",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Rahul Verma",
      role: "Mathematics Major",
      avatar: "RV",
      rating: 5,
      text: "Amazing collection of previous year papers. Saved me hours of searching. The quality is top-notch!",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Sneha Patel",
      role: "Physics Department",
      avatar: "SP",
      rating: 5,
      text: "Best resource for exam preparation! Clean interface, easy navigation, and all papers are authentic.",
      color: "from-emerald-500 to-teal-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        className="text-center mb-12"
      >
        <h2 className="mb-3 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
          What Students Say
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join thousands of students who trust PYQP Portal for their exam preparation
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-6 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Quote icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                >
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </motion.div>
              ))}
            </div>

            {/* Testimonial text */}
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
              "{testimonial.text}"
            </p>

            {/* Author info */}
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full shadow-lg`}
              >
                <span className="text-white font-bold text-sm">
                  {testimonial.avatar}
                </span>
              </motion.div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;