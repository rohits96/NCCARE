import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Home, BookOpen, Shield, Menu, X, 
  Moon, Sun
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode initialization
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true" || 
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/departments", label: "Departments", icon: BookOpen },
    { path: "/papers", label: "Papers", icon: FileText },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg py-2"
          : "bg-white dark:bg-gray-900 shadow-md py-4"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-all hover:opacity-80 group">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-800 dark:text-white">NC-CARE Portal</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Question Papers Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-2 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive(link.path)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 transition-all rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </motion.div>
            </button>

            {/* Desktop Auth Section */}
            <div className="items-center hidden gap-3 lg:flex">
              <SignedOut>
                <SignInButton>
                  <button className="px-6 py-2 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl hover:shadow-xl">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 transition rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="py-4 space-y-2 overflow-hidden border-t border-gray-200 dark:border-gray-800 lg:hidden"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                      isActive(link.path)
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}

              <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full px-4 py-3 font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-center p-3">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;