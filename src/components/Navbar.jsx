import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, Moon, Sun, Download } from 'lucide-react';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// Shared utility components
// ... (NavLink, IconButton remain similar but will look cleaner against a solid background)

const Navbar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { name: 'Papers', href: '#featured' },
    { name: 'Departments', href: '#departments' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
      // ZYADA CLEAN aur SOLID LOOK
      className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            PaperHub
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200 dark:text-slate-200 dark:hover:text-indigo-400"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>

          <button onClick={toggleDarkMode} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <SignedOut>
            <SignInButton>
              <button className="hidden sm:flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 dark:shadow-none">
                <User className='w-4 h-4' />
                <span>Login</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user?.emailAddresses?.[0]?.emailAddress === "nccareofficial@gmail.com" && (
              <a
                href="/admin-dashboard"
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white ml-3"
              >
                Admin Dashboard
              </a>
            )}
            <UserButton />
          </SignedIn>

          <button onClick={toggleDrawer} className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence remains for smooth exit) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
          >
            {/* ... Drawer content ... */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full text-left flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
                      <User className='w-5 h-5' />
                      <span>Login / Sign Up</span>
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  {user?.emailAddresses?.[0]?.emailAddress === "nccareofficial@gmail.com" && (
                    <a
                      href="/admin-dashboard"
                      className="block w-full text-center px-3 py-2 text-base font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </a>
                  )}
                  <div className="flex justify-center">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;