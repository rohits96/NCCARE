import React from "react";
import { motion } from "framer-motion";

// Import all home components
import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import StatsGrid from "../components/home/StatsGrid";
import DepartmentGrid from "../components/home/DepartmentGrid";
import FeaturedPapers from "../components/home/FeaturedPapers";
import Announcements from "../components/home/Announcements";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTABanner from "../components/home/CTABanner";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bg-blue-300 dark:bg-blue-600 rounded-full top-20 left-10 w-96 h-96 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20"
        />
        
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bg-purple-300 dark:bg-purple-600 rounded-full top-40 right-20 w-96 h-96 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20"
        />
        
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bg-pink-300 dark:bg-pink-600 rounded-full bottom-20 left-1/2 w-96 h-96 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Hero Section */}
        <Hero />

        {/* Search Bar */}
        <SearchBar />

        {/* Stats Grid */}
        <StatsGrid />

        {/* Popular Departments */}
        <DepartmentGrid />

        {/* Featured Papers & Announcements */}
        <div className="grid grid-cols-1 gap-8 mb-16 lg:grid-cols-3">
          <FeaturedPapers />
          <Announcements />
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Banner */}
        <CTABanner />
      </div>
    </div>
  );
};

export default HomePage;