import React, { useState } from "react";
import { Bell, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementManager() {
  const [showForm, setShowForm] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) return;

    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: "", content: "", type: "general" });
    setShowForm(false);
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
            <p className="text-gray-600">Manage announcements (local preview mode)</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-bold">Create Announcement</h3>
                <button onClick={() => setShowForm(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 border rounded-xl"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Content"
                  className="w-full p-3 border rounded-xl h-32"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Add Announcement
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements yet.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="p-4 bg-white shadow rounded-xl border">
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{a.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Added: {new Date(a.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
