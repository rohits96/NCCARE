import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, CheckCircle, FileText, Filter, X, Calendar, BookOpen, Sparkles, Award, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { years, semesters } from "../data/mockData";
import { departments } from "../constants/departments";

const PapersPage = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters
}) => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // ✅ Fetch verified papers from Convex
  const papers = useQuery(api.papers.getPapers) || [];
  const isLoading = papers === undefined;
  
  // ✅ Get file URL mutation for downloading
  const getFileUrl = useMutation(api.papers.getFileUrl);

  // ✅ Filtering logic
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = !filters.department || paper.department === filters.department;
    const matchesYear = !filters.year || paper.year.toString() === filters.year;
    const matchesSem = !filters.semester || paper.semester.toString() === filters.semester;
    const matchesExamType = !filters.exam_type || paper.exam_type === filters.exam_type;

    // Note: getPapers already filters for verified=true, so no need to check again
    return matchesSearch && matchesDept && matchesYear && matchesSem && matchesExamType;
  });

  const handleDownload = async (paper) => {
    if (!paper.fileId) {
      alert("❌ No file available for this paper");
      return;
    }

    setDownloadingFileId(paper.fileId);

    try {
      console.log("📥 Downloading file:", paper.fileId);
      const url = await getFileUrl({ fileId: paper.fileId });
      
      if (url) {
        console.log("✅ Download URL obtained:", url);
        window.open(url, "_blank");
      } else {
        console.warn("⚠️ No URL returned from getFileUrl");
        alert("❌ Download link not found or expired. Please try again.");
      }
    } catch (err) {
      console.error("❌ Download failed:", err);
      alert("❌ Failed to download the document. Error: " + err.message);
    } finally {
      setDownloadingFileId(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ department: "", year: "", semester: "", exam_type: "" });
  };

  const activeFiltersCount = [filters.department, filters.year, filters.semester, filters.exam_type].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] text-white relative overflow-hidden pb-20 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-gray-400">Loading papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] text-white relative overflow-hidden pb-20">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-16 mx-auto">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="flex items-center gap-3 text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              <Sparkles className="w-10 h-10 text-purple-400" />
              Question Papers
            </h1>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative p-3 transition-all border lg:hidden bg-white/5 backdrop-blur-xl border-white/10 rounded-xl hover:bg-white/10"
            >
              <Filter className="w-5 h-5 text-white" />
              {activeFiltersCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* SEARCH BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search papers by title, subject, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 pl-12 pr-12 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-2xl outline-none text-white placeholder-gray-400 focus:border-purple-500/50 focus:shadow-[0px_0px_30px_#6C4EFF33] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="absolute p-1 transition-all -translate-y-1/2 rounded-lg right-4 top-1/2 hover:bg-white/10"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            )}
          </motion.div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* FILTERS SIDEBAR */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div 
                initial={{ x: -20, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="mb-8 lg:col-span-3 lg:mb-0"
              >
                <div className="sticky top-24 p-6 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]">
                  <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                    <Filter className="w-5 h-5 text-purple-400" /> Filters
                  </h3>

                  {/* Department */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Department</label>
                    <select 
                      className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                      <option value="">All Departments</option>
                      {Object.entries(departments).map(([stream, depts]) => (
                        <optgroup key={stream} label={stream}>
                          {depts.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Year</label>
                    <select 
                      className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                      <option value="">All Years</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  {/* Semester */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Semester</label>
                    <select 
                      className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
                      value={filters.semester}
                      onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                    >
                      <option value="">All Semesters</option>
                      {semesters.map((s) => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>

                  {/* Exam Type */}
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Exam Type</label>
                    <select 
                      className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
                      value={filters.exam_type}
                      onChange={(e) => setFilters({ ...filters, exam_type: e.target.value })}
                    >
                      <option value="">All Types</option>
                      <option value="Mid-Sem">Mid-Sem</option>
                      <option value="End-Sem">End-Sem</option>
                    </select>
                  </div>

                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearFilters} 
                      className="w-full px-4 py-3 font-semibold text-pink-300 transition-all border bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border-pink-500/30 rounded-xl"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PAPERS LIST */}
          <div className="lg:col-span-9">
            {filteredPapers.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]"
              >
                <FileText className="w-20 h-20 mx-auto mb-4 text-gray-500" />
                <p className="text-xl text-gray-400">No papers found</p>
                <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search query</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredPapers.map((paper, index) => (
                  <motion.div 
                    key={paper.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-6 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50] hover:shadow-[0px_0px_45px_#6C4EFF55] transition-all duration-300"
                  >
                    {/* Title with Verified Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="flex items-center gap-2 text-xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-pink-300">
                        {paper.title}
                        {paper.verified && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full bg-emerald-500/20 border-emerald-500/30 text-emerald-400">
                            <Award className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </h3>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full text-sm font-medium">
                        📚 {paper.department}
                      </span>
                      <span className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium">
                        {paper.subject}
                      </span>
                      <span className="px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded-full text-sm font-medium">
                        Semester {paper.semester}
                      </span>
                      <span className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full text-sm font-medium">
                        📅 {paper.year}
                      </span>
                      <span className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium">
                        {paper.exam_type}
                      </span>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(paper)}
                      disabled={downloadingFileId === paper.fileId}
                      className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingFileId === paper.fileId ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download PDF
                        </>
                      )}
                    </button>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 transition-all duration-300 pointer-events-none rounded-3xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PapersPage;