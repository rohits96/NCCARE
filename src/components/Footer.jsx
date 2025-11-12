import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Mail, Github, Linkedin, Twitter, Heart, BookOpen, Home, Shield } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";

const Footer = () => {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'About Us', path: '/' },
      { label: 'How It Works', path: '/' },
      { label: 'Privacy Policy', path: '/' },
      { label: 'Terms of Service', path: '/' },
    ],
    quickLinks: [
      { label: 'Home', path: '/', icon: Home },
      { label: 'Departments', path: '/departments', icon: BookOpen },
      { label: 'All Papers', path: '/papers', icon: FileText },
      { label: 'Dashboard', path: '/dashboard', icon: Shield },
    ],
    departments: [
      { label: 'Computer Science', path: '/departments' },
      { label: 'Mathematics', path: '/departments' },
      { label: 'Physics', path: '/departments' },
      { label: 'Business', path: '/departments' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="relative mt-20 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center mb-4 space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl"
              >
                <FileText className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">NC-CARE Portal</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Question Papers Hub</p>
              </div>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Your trusted platform for accessing verified question papers from top universities. Prepare smarter, perform better.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 transition-all bg-gray-100 rounded-lg dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 dark:text-gray-400 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => {
                const Icon = link.icon;
                // Dynamic dashboard link based on user email
                const dashboardPath = email === "nccareofficial@gmail.com" ? "/admin-dashboard" : "/dashboard";
                const linkPath = link.label === "Dashboard" ? dashboardPath : link.path;
                
                return (
                  <li key={link.label}>
                    <Link
                      to={linkPath}
                      className="flex items-center gap-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Popular Departments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Departments
            </h3>
            <ul className="space-y-2">
              {footerLinks.departments.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              About & Legal
            </h3>
            <ul className="mb-6 space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Stay Updated
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-white transition-shadow rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-6 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 md:text-left">
              © {currentYear} PYQP Portal - Previous Year Question Papers Platform. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              for Students
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;