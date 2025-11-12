import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, FileText, TrendingUp, BookOpen, Trash2, Eye, Search, Sparkles, Award, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Refresh trigger state for manual refetch
let refetchTrigger = 0;

// Admin Guard Component
const AdminOnly = ({ children }) => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      </div>
    );
  }
  
  if (user?.emailAddresses?.[0]?.emailAddress !== "nccareofficial@gmail.com") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] text-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center p-12 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]"
        >
          <XCircle className="w-24 h-24 mx-auto mb-4 text-red-400" />
          <h1 className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </motion.div>
      </div>
    );
  }
  return children;
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color = "from-indigo-500 to-purple-500", trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50] hover:shadow-[0px_0px_45px_#6C4EFF55] transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2 text-sm text-emerald-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

// Upload Paper Section
const UploadPaper = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    department: '',
    semester: '',
    year: new Date().getFullYear(),
    exam_type: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const generateUploadUrl = useMutation(api.papers.generateUploadUrl);
  const uploadPaper = useMutation(api.papers.uploadPaper);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file to Convex storage
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const { storageId } = await response.json();

      // Step 3: Create paper record in database
      const paperId = await uploadPaper({
        title: formData.title,
        subject: formData.subject,
        department: formData.department,
        semester: parseInt(formData.semester),
        year: parseInt(formData.year),
        exam_type: formData.exam_type,
        fileId: storageId,
      });

      console.log("Paper uploaded successfully:", paperId);
      
      // Trigger refetch
      onUpload();
      
      alert("✅ Paper uploaded successfully!");
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        department: '',
        semester: '',
        year: new Date().getFullYear(),
        exam_type: ''
      });
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Error uploading paper: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]"
    >
      <div className="flex items-center mb-6">
        <Upload className="w-6 h-6 mr-3 text-indigo-400" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Upload Question Paper</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Paper Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all placeholder-gray-500"
              placeholder="e.g., Data Structures Final Exam"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Subject *</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all placeholder-gray-500"
              placeholder="e.g., Data Structures"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Department *</label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
            >
              <option value="">Select Department</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="B.Com">B.Com</option>
              <option value="BA">BA</option>
              <option value="BSc">BSc</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Semester *</label>
            <select
              required
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Year *</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
              min="2020"
              max="2030"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Exam Type *</label>
            <select
              required
              value={formData.exam_type}
              onChange={(e) => setFormData({...formData, exam_type: e.target.value})}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
            >
              <option value="">Select Type</option>
              <option value="Mid-Sem">Mid-Sem</option>
              <option value="End-Sem">End-Sem</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-300">PDF File *</label>
            <input
              type="file"
              required
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30"
            />
            {file && <p className="mt-2 text-sm text-gray-400">Selected: {file.name}</p>}
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={uploading}
          whileHover={{ scale: uploading ? 1 : 1.02 }}
          whileTap={{ scale: uploading ? 1 : 0.98 }}
          className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Paper
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Manage Papers Section
const ManagePapers = ({ papers, onToggleVerify, onDelete, isLoading }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPapers = papers.filter(paper => {
    const matchesFilter = filter === 'all' || 
      (filter === 'verified' && paper.verified) || 
      (filter === 'unverified' && !paper.verified);
    
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleView = (fileId) => {
    alert(`Opening file: ${fileId}\n\nIn production, this will open the PDF from Convex storage.`);
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]"
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin mr-3" />
          <p className="text-gray-400">Loading papers...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-8 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0px_0px_30px_#1a1a3f50]"
    >
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <FileText className="w-6 h-6 mr-3 text-purple-400" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Manage Papers</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pl-10 pr-4 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all placeholder-gray-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-[#070B26]/80 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500/50 focus:shadow-[0px_0px_20px_#6C4EFF22] transition-all"
          >
            <option value="all">All Papers</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Title</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Subject</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Department</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Sem</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Year</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Status</th>
              <th className="px-4 py-4 font-semibold text-left text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPapers.map((paper, index) => (
              <motion.tr 
                key={paper._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transition-colors border-b border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-indigo-400" />
                    <span className="font-medium text-white">{paper.title}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-400">{paper.subject}</td>
                <td className="px-4 py-4 text-gray-400">{paper.department}</td>
                <td className="px-4 py-4 text-gray-400">{paper.semester}</td>
                <td className="px-4 py-4 text-gray-400">{paper.year}</td>
                <td className="px-4 py-4">
                  {paper.verified ? (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold border rounded-full bg-emerald-500/20 border-emerald-500/30 text-emerald-400">
                      <Award className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-yellow-400 border rounded-full bg-yellow-500/20 border-yellow-500/30">
                      <XCircle className="w-3 h-3 mr-1" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleVerify(paper._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        paper.verified 
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      }`}
                      title={paper.verified ? 'Unverify' : 'Verify'}
                    >
                      {paper.verified ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(paper._id)}
                      className="p-2 text-red-400 transition-colors border rounded-lg bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(paper.fileId)}
                      className="p-2 text-blue-400 transition-colors border rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {filteredPapers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-gray-400"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg font-medium">No papers found</p>
            <p className="text-sm text-gray-500">Try adjusting your filters or search term</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Admin Dashboard Main Component
const AdminDashboard = () => {
  const { user } = useUser();
  const allPapers = useQuery(api.papers.getAllPapersAdmin);
  const [refetchKey, setRefetchKey] = useState(0);
  
  // Force refetch by changing the key
  const papers = allPapers || [];
  const isLoading = allPapers === undefined;

  const toggleVerifyPaper = useMutation(api.papers.toggleVerifyPaper);
  const deletePaper = useMutation(api.papers.deletePaper);

  const stats = {
    total: papers.length,
    verified: papers.filter(p => p.verified).length,
    pending: papers.filter(p => !p.verified).length,
    departments: new Set(papers.map(p => p.department)).size
  };

  const handleUpload = () => {
    // Force refetch by re-running the query
    setRefetchKey(prev => prev + 1);
  };

  const handleToggleVerify = async (paperId) => {
    try {
      await toggleVerifyPaper({ paperId });
      setRefetchKey(prev => prev + 1);
    } catch (error) {
      console.error("Error toggling verify:", error);
      alert("Error updating paper status: " + error.message);
    }
  };

  const handleDelete = async (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        await deletePaper({ paperId });
        setRefetchKey(prev => prev + 1);
      } catch (error) {
        console.error("Error deleting paper:", error);
        alert("Error deleting paper: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] text-white relative overflow-hidden pb-20">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 px-4 py-16 mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 mb-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                <Sparkles className="w-10 h-10 text-purple-400" />
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-400">Welcome back, {user?.fullName || 'Admin'}</p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-3 bg-[#0F153A]/60 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <p className="text-sm text-gray-400">Admin Access</p>
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{user?.emailAddresses?.[0]?.emailAddress}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={FileText}
            title="Total Papers"
            value={stats.total}
            color="from-indigo-500 to-blue-500"
            trend="+12% this month"
          />
          <StatsCard
            icon={CheckCircle}
            title="Verified Papers"
            value={stats.verified}
            color="from-emerald-500 to-green-500"
          />
          <StatsCard
            icon={XCircle}
            title="Pending Review"
            value={stats.pending}
            color="from-yellow-500 to-orange-500"
          />
          <StatsCard
            icon={BookOpen}
            title="Departments"
            value={stats.departments}
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <UploadPaper onUpload={handleUpload} />
        </div>

        {/* Manage Papers Section */}
        <ManagePapers
          papers={papers}
          onToggleVerify={handleToggleVerify}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

// Main App with Admin Guard
const App = () => {
  return (
    <AdminOnly>
      <AdminDashboard />
    </AdminOnly>
  );
};

export default App;