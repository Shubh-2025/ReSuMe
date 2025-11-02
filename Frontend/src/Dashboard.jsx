import React, { useEffect ,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  Calendar,
  User,
  ArrowRight,
  FolderOpen,
} from "lucide-react";

export default function Dashboard({ onCreate, onOpen }) {
  const [name,setName] =useState("User");
  const [cvs,setCvs] = useState([]);
  const navigate = useNavigate();
  const hours = new Date().getHours();
  const greetingWord =
    hours < 12
      ? "Good morning"
      : hours < 18
      ? "Good afternoon"
      : "Good evening";
  const displayName = String(name).trim() ? String(name).trim() : { name };

  const handleCreate = () => {
    if (onCreate) {
      onCreate();
    } else {
      navigate("/canvas");
    }
  };

  const handleOpen = (cv) => {
    if (onOpen) {
      onOpen(cv);
    } else {
      navigate("/generated");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  useEffect(()=>{
    (async () => {
        try {
            const res = await fetch(`https://localhost:9000/dashboard/${localStorage.getItem("userId")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!res.ok) {
                console.error("Failed to fetch user data", res.status);
                return;
            }

            const data = await res.json();

            // update local variables (note: these are not stateful in the current component)
            if (data.name) name = setName(data.name);
            if (Array.isArray(data.cvs)) cvs = setCvs(data.cvs);
        } catch (err) {
            console.error("Error loading user data:", err.message);
        }
    })();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <FileText className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold">
              ReSuMe<span className="text-indigo-600">Craft</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Welcome back</span>
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {greetingWord}, {displayName}!
                </h1>
                <p className="text-slate-600">
                  Manage your resumes and create new professional CVs
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreate}
                className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Resume</span>
              </motion.button>
            </div>
          </div>

          {/* Resumes Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your Resumes
              </h2>
              <span className="text-slate-500 text-sm">
                {cvs.length} {cvs.length === 1 ? "resume" : "resumes"}
              </span>
            </div>
            {/* cvs */}
            <AnimatePresence>
              {cvs.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {cvs.map((cv, index) => (
                    <motion.div
                      key={cv.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => handleOpen(cv)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <FileText className="w-6 h-6 text-indigo-600" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>

                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                          {cv.title || "Untitled Resume"}
                        </h3>

                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Edited {formatDate(cv.updatedAt)}</span>
                          </div>
                          {cv.template && (
                            <div className="flex items-center space-x-2">
                              <FolderOpen className="w-4 h-4" />
                              <span>{cv.template}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 group-hover:bg-indigo-50 transition-colors">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 group-hover:text-indigo-700 transition-colors">
                            Click to open
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
                >
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No Resumes Yet
                  </h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    Start creating your first professional resume to showcase
                    your skills and experience.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreate}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Your First Resume</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
