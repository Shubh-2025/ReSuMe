import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { Download, Edit3, Save, ArrowLeft, FileText } from "lucide-react";

const Generated = () => {
  const resumeRef = useRef(null);
  const location = useLocation();
  const [templateId, setTemplateId] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "Priya Sharma",
    title: "Frontend Developer",
    contact: {
      phone: "+91 91234 56789",
      email: "priyasharma@email.com",
      address: "Bengaluru, India",
    },
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Git / GitHub"],
    profile: "Creative and detail-oriented Frontend Developer with 2 years of experience in building responsive and interactive web applications.",
    experience: [
      {
        role: "Frontend Developer – Tech Solutions Ltd.",
        period: "2023 – Present",
        details: "- Built responsive web interfaces using React.js and Tailwind CSS.\n- Optimized website performance and enhanced user experience.",
      },
      {
        role: "Web Development Intern – SoftWorks Pvt. Ltd.",
        period: "2022 – 2023",
        details: "- Assisted in developing interactive components using JavaScript and React.\n- Participated in code reviews and implemented feedback.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Information Technology",
        institution: "Bangalore Institute of Technology (2019 – 2023)",
        details: "Graduated with Distinction. Focused on Web Development, Data Structures, and Database Management.",
      },
    ],
  });

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
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Resume_${resumeData.name.replace(/\s+/g, '_')}.pdf`);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEditToggle = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      // Update the details in DB
      // Add your update logic here
    }
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) setTemplateId(parseInt(hash));
  }, [location]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch("http://localhost:9000/generate");
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
          experience: data.experience?.map(item => JSON.parse(item)) || [],
          education: data.education?.map(item => JSON.parse(item)) || [],
        };

        setResumeData(formatted);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <Template1 ref={resumeRef} resumeData={resumeData} />;
      case 2:
        return <Template2 ref={resumeRef} resumeData={resumeData} />;
      case 3:
        return <Template3 ref={resumeRef} resumeData={resumeData} />;
      default:
        return <h1>Loading</h1>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
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
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEditToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  edit 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                {edit ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{edit ? "Save Changes" : "Edit Resume"}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? "Downloading..." : "Download PDF"}
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
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resume downloaded successfully!</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Text */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            Your Professional Resume
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600"
          >
            Review and customize your resume before downloading
          </motion.p>
        </div>

        {/* Edit Mode Indicator */}
        {edit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <Edit3 className="w-4 h-4" />
              <span className="font-medium">Edit Mode Enabled</span>
              <span className="text-blue-600">• Click anywhere on the resume to edit content</span>
            </div>
          </motion.div>
        )}

        {/* Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${
            edit ? "ring-2 ring-indigo-200" : ""
          } transition-all`}
        >
          <div className={`
            w-full flex justify-center overflow-auto min-h-[calc(100vh-200px)] 
            ${edit ? "opacity-90 cursor-text" : ""}
            no-scrollbar
          `}>
            {renderTemplate()}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-slate-500 text-sm"
        >
          <p>Need to make changes? Use the Edit button above to modify your resume content.</p>
        </motion.div>
      </main>
    </div>
  );
};

export default Generated;