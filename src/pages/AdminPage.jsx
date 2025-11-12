import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "../constants/departments";
import AnnouncementManager from "../components/AnnouncementManager";

const AdminPage = ({ user }) => {
  const navigate = useNavigate();

  // ✅ Hooks must be here at the top
  const [papers, setPapers] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [newPaper, setNewPaper] = useState({
    title: "",
    department: "",
    subject: "",
    year: 2024,
    semester: 1,
    exam_type: "Mid-Sem",
    file: null,
  });

  // ✅ NOW we can check user access
  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
        <div className="p-12 text-center bg-white shadow-lg rounded-2xl">
          <Shield className="w-16 h-16 mb-4 text-red-500" />
          <h2 className="text-2xl font-bold">Admin Access Required</h2>
          <p className="mt-2 text-gray-600">Please login as admin.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 mt-6 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file?.type !== "application/pdf") return alert("Please select a PDF file.");
    setNewPaper({ ...newPaper, file });
  };

  const handleUpload = () => {
    if (!newPaper.title || !newPaper.department || !newPaper.subject || !newPaper.file) {
      alert("Please fill all fields");
      return;
    }

    const fakePaper = { id: Date.now(), ...newPaper, verified: false };
    setPapers([fakePaper, ...papers]);
    setShowUpload(false);

    setNewPaper({
      title: "",
      department: "",
      subject: "",
      year: 2024,
      semester: 1,
      exam_type: "Mid-Sem",
      file: null,
    });
  };

  const toggleVerify = (id) => {
    setPapers(papers.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p)));
  };

  const deletePaper = (id) => {
    if (window.confirm("Delete this paper?")) {
      setPapers(papers.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage Question Papers</p>
          </div>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl"
        >
          <Plus className="w-5 h-5" /> Upload Paper
        </button>
      </div>

      <AnnouncementManager />

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {showUpload && (
          <motion.div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
            <div className="w-full max-w-xl p-6 bg-white rounded-2xl">
              <h2 className="mb-4 text-2xl font-bold">Upload Paper</h2>

              <input
                className="w-full p-2 mb-3 border rounded-xl"
                placeholder="Title"
                value={newPaper.title}
                onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
              />

              <select
                className="w-full p-2 mb-3 border rounded-xl"
                value={newPaper.department}
                onChange={(e) => setNewPaper({ ...newPaper, department: e.target.value })}
              >
                <option value="">Select Department</option>
                {Object.entries(departments).map(([stream, depts]) => (
                  <optgroup key={stream} label={stream}>
                    {depts.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <input
                className="w-full p-2 mb-3 border rounded-xl"
                placeholder="Subject"
                value={newPaper.subject}
                onChange={(e) => setNewPaper({ ...newPaper, subject: e.target.value })}
              />

              <input type="file" className="mb-3" accept=".pdf" onChange={handleFileSelect} />

              <button
                onClick={handleUpload}
                className="w-full py-3 text-white bg-purple-600 rounded-xl hover:bg-purple-700"
              >
                Upload
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST */}
      <div className="p-6 mt-6 bg-white shadow-lg rounded-2xl">
        {papers.length === 0 ? (
          <p className="py-12 text-center text-gray-500">No Papers Yet</p>
        ) : (
          papers.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 mb-3 border rounded-xl bg-gray-50">
              <div>
                <p className="font-bold">{p.title}</p>
                <p className="text-sm text-gray-600">{p.subject} • {p.department}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleVerify(p.id)}
                  className="px-3 py-1 text-blue-600 bg-blue-100 rounded-lg"
                >
                  {p.verified ? "Unverify" : "Verify"}
                </button>

                <button
                  onClick={() => deletePaper(p.id)}
                  className="px-3 py-1 text-red-600 bg-red-100 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AdminPage;
