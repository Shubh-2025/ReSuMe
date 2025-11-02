import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import {
  Download,
  Edit3,
  Save,
  ArrowLeft,
  FileText,
  X,
  Plus,
  Trash2,
} from "lucide-react";

// Move EditForm outside the main component to prevent re-renders
const EditForm = ({
  formData,
  onFormChange,
  onContactChange,
  onArrayChange,
  onAddItem,
  onRemoveItem,
  onSave,
  onCancel,
  isSaving,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Edit Resume
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Basic Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => onFormChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => onFormChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Professional Summary
                  </label>
                  <textarea
                    value={formData.profile}
                    onChange={(e) => onFormChange("profile", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base resize-vertical"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                  Contact Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => onContactChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => onContactChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => onContactChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Skills
                  </h3>
                  <button
                    type="button"
                    onClick={() => onAddItem("skills", "New Skill")}
                    className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Skill</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex space-x-2 items-center">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          onArrayChange("skills", index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                        placeholder="Enter a skill"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveItem("skills", index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Work Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      onAddItem("experience", {
                        role: "",
                        period: "",
                        details: "",
                      })
                    }
                    className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Experience</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="space-y-3 p-3 sm:p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-slate-900 text-sm sm:text-base">
                          Experience #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem("experience", index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Job Role & Company
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            onArrayChange("experience", index, {
                              ...exp,
                              role: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                          placeholder="e.g., Frontend Developer – Company Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            onArrayChange("experience", index, {
                              ...exp,
                              period: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                          placeholder="e.g., 2023 – Present"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Details
                        </label>
                        <textarea
                          value={exp.details}
                          onChange={(e) =>
                            onArrayChange("experience", index, {
                              ...exp,
                              details: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base resize-vertical"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Education
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      onAddItem("education", {
                        degree: "",
                        institution: "",
                        details: "",
                      })
                    }
                    className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Education</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="space-y-3 p-3 sm:p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-slate-900 text-sm sm:text-base">
                          Education #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem("education", index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            onArrayChange("education", index, {
                              ...edu,
                              degree: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                          placeholder="e.g., B.Tech in Information Technology"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) =>
                            onArrayChange("education", index, {
                              ...edu,
                              institution: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                          placeholder="e.g., University Name (Year – Year)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Details
                        </label>
                        <textarea
                          value={edu.details}
                          onChange={(e) =>
                            onArrayChange("education", index, {
                              ...edu,
                              details: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base resize-vertical"
                          placeholder="Additional details like GPA, honors, relevant coursework..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Generated = () => {
  const resumeRef = useRef(null);
  const location = useLocation();
  const [templateId, setTemplateId] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "Priya Sharma",
    title: "Frontend Developer",
    contact: {
      phone: "+91 91234 56789",
      email: "priyasharma@email.com",
      address: "Bengaluru, India",
    },
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Git / GitHub",
    ],
    profile:
      "Creative and detail-oriented Frontend Developer with 2 years of experience in building responsive and interactive web applications.",
    experience: [
      {
        role: "Frontend Developer – Tech Solutions Ltd.",
        period: "2023 – Present",
        details:
          "- Built responsive web interfaces using React.js and Tailwind CSS.\n- Optimized website performance and enhanced user experience.",
      },
      {
        role: "Web Development Intern – SoftWorks Pvt. Ltd.",
        period: "2022 – 2023",
        details:
          "- Assisted in developing interactive components using JavaScript and React.\n- Participated in code reviews and implemented feedback.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Information Technology",
        institution: "Bangalore Institute of Technology (2019 – 2023)",
        details:
          "Graduated with Distinction. Focused on Web Development, Data Structures, and Database Management.",
      },
    ],
  });

  const [formData, setFormData] = useState({ ...resumeData });

  // Initialize form data when opening the form
  const handleEditClick = () => {
    setFormData(JSON.parse(JSON.stringify(resumeData))); // Deep copy
    setShowForm(true);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || isDownloading) return;

    setIsDownloading(true);
    const element = resumeRef.current;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Resume_${resumeData.name.replace(/\s+/g, "_")}.pdf`);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Use useCallback to prevent function re-creation on every render
  const handleFormChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleContactChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  }, []);

  const handleArrayChange = useCallback((field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  }, []);

  const handleAddItem = useCallback((field, template) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  }, []);

  const handleRemoveItem = useCallback((field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }, []);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Update local state
      setResumeData({ ...formData });

      // Save to backend
      const response = await fetch("http://localhost:9000/update-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId,
          ...formData,
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Failed to save resume");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) setTemplateId(parseInt(hash));
  }, [location]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/generate/${localStorage.getItem("userId")}`
        );
        if (!response.ok) {
          console.error("Data not found");
          return;
        }

        const result = await response.json();
        const data = result.message;
        setTemplateId(data.tid);

        const formatted = {
          name: data.name,
          title: data.title,
          profile: data.profile,
          contact: {
            phone: data.phone,
            email: data.email,
            address: data.address,
          },
          skills: data.skills || [],
          experience: data.experience?.map((item) => JSON.parse(item)) || [],
          education: data.education?.map((item) => JSON.parse(item)) || [],
        };

        setResumeData(formatted);
        setFormData(formatted);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchTemplate();
  }, []);

  const renderTemplate = () => {
    // Use formData for real-time preview when form is open
    const previewData = showForm ? formData : resumeData;

    switch (templateId) {
      case 1:
        return <Template1 ref={resumeRef} resumeData={previewData} />;
      case 2:
        return <Template2 ref={resumeRef} resumeData={previewData} />;
      case 3:
        return <Template3 ref={resumeRef} resumeData={previewData} />;
      default:
        return <h1>Loading</h1>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/canvas"
              className="flex items-center space-x-2 text-slate-900 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-semibold">
                ReSuMe<span className="text-indigo-600">Craft</span>
              </span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEditClick}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg hover:border-slate-400 cursor-pointer transition-colors text-sm sm:text-base"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Resume</span>
                <span className="sm:hidden">Edit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isDownloading ? "Downloading..." : "Download PDF"}
                </span>
                <span className="sm:hidden">
                  {isDownloading ? "..." : "PDF"}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 text-sm sm:text-base">
              <FileText className="w-4 h-4" />
              <span>Resume updated successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-1 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 origin-left"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Text */}
        <div className="text-center mb-4 sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          >
            Your Professional Resume
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base"
          >
            Review and customize your resume before downloading
          </motion.p>
        </div>

        {/* Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="w-full flex justify-center overflow-auto min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] no-scrollbar">
            {renderTemplate()}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4 sm:mt-6 text-slate-500 text-xs sm:text-sm"
        >
          <p>
            Need to make changes? Use the Edit button above to modify your
            resume content.
          </p>
        </motion.div>
      </main>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <EditForm
            formData={formData}
            onFormChange={handleFormChange}
            onContactChange={handleContactChange}
            onArrayChange={handleArrayChange}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onSave={handleSaveChanges}
            onCancel={handleCancelForm}
            isSaving={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Generated;
