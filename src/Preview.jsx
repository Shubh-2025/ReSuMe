import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";

const Preview = () => {
  const userid = 1; // from cookies

  const [resumeData, setResumeData] = useState({
    name: "Priya Sharma",
    title: "Frontend Developer",
    contact: {
      phone: "+91 91234 56789",
      email: "priyasharma@email.com",
      address: "Bengaluru, India",
    },
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Git / GitHub"],
    profile:
      "Creative and detail-oriented Frontend Developer with 2 years of experience in building responsive and interactive web applications. Skilled in modern frontend frameworks and passionate about UI/UX design.",
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

  const location = useLocation();
  const [templateId, setTemplateId] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const templateNum = parseInt(hash);
      setTemplateId(templateNum);
      setSelectedTemplate(templateNum);
    }
  }, [location]);

  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <Template1 resumeData={resumeData} />;
      case 2:
        return <Template2 resumeData={resumeData} />;
      case 3:
        return <Template3 resumeData={resumeData} />;
      default:
        return <Template1 resumeData={resumeData} />;
    }
  };

  const TemplateCard = ({ id, name, description, isSelected, onSelect }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-indigo-500 bg-indigo-50 shadow-md"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">{name}</h3>
        {isSelected && (
          <CheckCircle className="w-5 h-5 text-indigo-600 fill-current" />
        )}
      </div>
      <p className="text-sm text-slate-600">{description}</p>
    </motion.div>
  );

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech roles"
    },
    {
      id: 2,
      name: "Creative Portfolio",
      description: "Ideal for designers and creative professionals"
    },
    {
      id: 3,
      name: "Executive Classic",
      description: "Traditional layout for corporate and executive positions"
    }
  ];

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

            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to={`/format/${selectedTemplate}/${userid}`}
                className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-black/50 transition-colors cursor-pointer shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Use This Template</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

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
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900 mb-3"
          >
            Choose Your Template
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto"
          >
            Preview our professionally designed templates and select the one that best represents your personal brand
          </motion.p>
        </div>

        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                isSelected={selectedTemplate === template.id}
                onSelect={(id) => {
                  setSelectedTemplate(id);
                  setTemplateId(id);
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Selected Template Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <h3 className="font-semibold text-slate-900">
              Preview: {templates.find(t => t.id === selectedTemplate)?.name}
            </h3>
          </div>
          
          <div className="w-full flex justify-center overflow-auto min-h-[calc(100vh-400px)] no-scrollbar p-6">
            {renderTemplate()}
          </div>
        </motion.div>

        {/* Bottom Action Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="bg-white rounded-lg border border-slate-200 p-6 inline-block">
            <p className="text-slate-700 mb-4">
              Ready to customize the <span className="font-semibold text-indigo-600">
                {templates.find(t => t.id === selectedTemplate)?.name}
              </span> template?
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to={`/format/${selectedTemplate}/${userid}`}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-black/50 transition-colors shadow-sm font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Start Customizing This Template</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-8 text-slate-500 text-sm"
      >
        <p>You can always change templates later during the customization process</p>
      </motion.div>
    </div>
  );
};

export default Preview;