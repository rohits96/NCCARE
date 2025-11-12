import React, { useState, useEffect } from "react";
import { FileText, Download, BookOpen, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  // ✅ Fake Papers (no backend yet)
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    setPapers([
      {
        id: 1,
        title: "Data Structures Mid-Sem 2024",
        subject: "Data Structures",
        department: "BCA",
        semester: 2,
        year: 2024,
        verified: true,
        uploaded_at: "2024-10-10",
      },
      {
        id: 2,
        title: "Operating System End-Sem 2023",
        subject: "Operating Systems",
        department: "BCA",
        semester: 3,
        year: 2023,
        verified: true,
        uploaded_at: "2024-09-15",
      },
    ]);
  }, []);

  const verifiedPapers = papers.filter((p) => p.verified);
  const recentPapers = [...verifiedPapers].reverse().slice(0, 6);

  const stats = {
    totalPapers: verifiedPapers.length,
    departments: new Set(verifiedPapers.map((p) => p.department)).size,
    thisMonth: verifiedPapers.filter((p) => {
      const uploadDate = new Date(p.uploaded_at);
      const now = new Date();
      return (
        uploadDate.getMonth() === now.getMonth() &&
        uploadDate.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                Welcome <span className="text-blue-600">Student</span> 👋
              </h1>
              <p className="mt-2 text-gray-600">Your question paper dashboard</p>
            </div>

            <button
              onClick={() => navigate("/papers")}
              className="px-6 py-3 text-white shadow-md rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse Papers
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard icon={FileText} label="Total Papers" value={stats.totalPapers} color="blue" />
            <StatCard icon={BookOpen} label="Departments" value={stats.departments} color="green" />
            <StatCard icon={TrendingUp} label="This Month" value={`+${stats.thisMonth}`} color="purple" />
          </div>
        </motion.div>

        {/* RECENT PAPERS */}
        <Section title="Recent Papers" actionText="View All →" onAction={() => navigate("/papers")}>
          {recentPapers.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentPapers.map((paper, index) => (
                <PaperCard key={paper.id} paper={paper} delay={index} />
              ))}
            </div>
          )}
        </Section>

      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} className={`p-6 text-white rounded-2xl shadow-lg bg-${color}-600`}>
    <Icon className="w-10 h-10 mb-3 opacity-80" />
    <p className="text-sm">{label}</p>
    <p className="text-4xl font-extrabold">{value}</p>
  </motion.div>
);

const Section = ({ title, children, actionText, onAction }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {actionText && (
        <button onClick={onAction} className="text-blue-600 hover:text-blue-800">
          {actionText}
        </button>
      )}
    </div>
    {children}
  </motion.div>
);

const PaperCard = ({ paper, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.05 }}
    className="p-6 bg-white border shadow-md rounded-2xl hover:border-blue-500"
  >
    <h3 className="mb-1 font-bold text-gray-900">{paper.title}</h3>
    <div className="flex flex-wrap gap-2 mb-3 text-sm">
      <span className="px-2 py-1 text-blue-700 bg-blue-100 rounded-full">{paper.department}</span>
      <span className="px-2 py-1 text-purple-700 bg-purple-100 rounded-full">Sem {paper.semester}</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Calendar className="w-4 h-4" /> {paper.uploaded_at}
    </div>
  </motion.div>
);

const EmptyState = () => (
  <div className="p-12 text-center bg-white shadow-lg col-span-full rounded-2xl">
    <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
    <p className="text-gray-600">No papers available yet.</p>
  </div>
);

export default DashboardPage;
