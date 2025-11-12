import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I access question papers?",
      answer: "Simply browse through departments or use the search bar to find specific papers. All verified papers are available for free download without registration."
    },
    {
      question: "Are all papers verified and authentic?",
      answer: "Yes! We verify 98% of our papers through multiple sources. Papers with the 'Verified' badge have been cross-checked with official university records."
    },
    {
      question: "Can I contribute question papers?",
      answer: "Absolutely! Registered users can upload papers through the dashboard. Our team reviews all submissions before publishing to ensure authenticity."
    },
    {
      question: "Is the platform completely free?",
      answer: "Yes, PYQP Portal is 100% free for all students. We believe education resources should be accessible to everyone without any barriers."
    },
    {
      question: "How often are new papers added?",
      answer: "We update our database regularly. New papers are added weekly from various universities and departments. Subscribe to notifications to stay updated!"
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="mb-3 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
          Got Questions? We've Got Answers
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about PYQP Portal
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-8">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;