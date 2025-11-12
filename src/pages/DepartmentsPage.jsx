import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
  GraduationCap,
  Microscope,
  Calculator,
  Briefcase,
  FlaskConical,
  Globe,
  Users,
  Binary,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const departmentIcons = {
  English: BookOpen,
  Odia: Globe,
  History: BookOpen,
  "Political Science": Users,
  Economics: TrendingUp,
  Education: GraduationCap,
  Sociology: Users,
  Philosophy: BookOpen,
  Physics: Sparkles,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
  Botany: BookOpen,
  Zoology: Microscope,
  Accountancy: Calculator,
  "Business Management": Briefcase,
  "BCA (Bachelor of Computer Applications)": Binary,
  "BBA (Bachelor of Business Administration)": Briefcase,
};

const departmentGroups = [
  {
    stream: "Arts Stream",
    departments: [
      { name: "English", papers: 45, verified: 38 },
      { name: "Odia", papers: 32, verified: 28 },
      { name: "History", papers: 41, verified: 35 },
      { name: "Political Science", papers: 38, verified: 30 },
      { name: "Economics", papers: 52, verified: 45 },
      { name: "Education", papers: 29, verified: 24 },
      { name: "Sociology", papers: 35, verified: 30 },
      { name: "Philosophy", papers: 27, verified: 22 },
    ],
  },
  {
    stream: "Science Stream",
    departments: [
      { name: "Physics", papers: 56, verified: 48 },
      { name: "Chemistry", papers: 61, verified: 52 },
      { name: "Mathematics", papers: 68, verified: 60 },
      { name: "Botany", papers: 42, verified: 36 },
      { name: "Zoology", papers: 44, verified: 38 },
    ],
  },
  {
    stream: "Commerce Stream",
    departments: [
      { name: "Accountancy", papers: 47, verified: 40 },
      { name: "Business Management", papers: 39, verified: 33 },
    ],
  },
  {
    stream: "Self-Finance Stream",
    departments: [
      { name: "BCA (Bachelor of Computer Applications)", papers: 55, verified: 48 },
      { name: "BBA (Bachelor of Business Administration)", papers: 43, verified: 37 },
    ],
  },
];

const streamFilters = ['All', 'Arts Stream', 'Science Stream', 'Commerce Stream', 'Self-Finance Stream'];

export default function DepartmentsPage() {
  const [selectedStream, setSelectedStream] = useState('All');

  const getIcon = (deptName) => {
    const IconComponent = departmentIcons[deptName] || BookOpen;
    return IconComponent;
  };

  const filteredGroups = selectedStream === 'All' 
    ? departmentGroups 
    : departmentGroups.filter((g) => g.stream === selectedStream);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-16 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Explore Departments
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Choose your department to browse verified question papers
          </p>
        </motion.div>

        {/* Stream Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {streamFilters.map((stream) => (
            <Button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              variant="ghost"
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedStream === stream
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {stream.replace(' Stream', '')}
            </Button>
          ))}
        </motion.div>

        {/* Department Groups */}
        <div className="space-y-16">
          {filteredGroups.map((group, groupIndex) => (
            <motion.div
              key={group.stream}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                {group.stream}
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.departments.map((dept, index) => {
                  const Icon = getIcon(dept.name);
                  
                  return (
                    <Link
                      key={dept.name}
                      to={`/papers?dept=${encodeURIComponent(dept.name)}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.04 }}
                        className="group relative bg-[#0F153A]/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0px_0px_30px_#1a1a3f50] hover:shadow-[0px_0px_45px_#6C4EFF55] transition-all duration-300 p-6 cursor-pointer"
                      >
                        {/* Icon */}
                        <div className="mb-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Department Name */}
                        <h3 className="mb-2 text-lg font-semibold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-pink-300">
                          {dept.name}
                        </h3>

                        {/* Stats */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 text-emerald-400">
                            <Award className="w-4 h-4" />
                            <span>{dept.verified} verified</span>
                          </div>
                          <div className="text-gray-400">
                            • {dept.papers} total
                          </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 transition-all duration-300 pointer-events-none rounded-3xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10" />
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}