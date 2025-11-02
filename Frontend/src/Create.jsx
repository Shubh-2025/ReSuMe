import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CurvedLoop from "./Curvedloop";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";
import { FileText, ArrowRight, LayoutTemplate, Eye } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    img: template1,
    description: "Clean corporate design",
    category: "Professional",
  },
  {
    id: 2,
    name: "Creative Portfolio",
    img: template2,
    description: "For designers & creatives",
    category: "Creative",
  },
  {
    id: 3,
    name: "Executive Classic",
    img: template3,
    description: "Traditional executive layout",
    category: "Executive",
  },
];

const Create = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Animated Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-1 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 origin-left"
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <LayoutTemplate className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Choose Your Template
              </h1>
              <p className="text-slate-600">
                Select a design that matches your professional style
              </p>
            </div>
          </div>

          {/* Animated Marquee */}
          <div className="max-w-4xl mx-auto">
            <CurvedLoop
              marqueeText="Be ✦ Creative ✦ Professional ✦ Unique ✦ With ReSuMeCraft"
              speed={2}
              curveAmount={150}
              direction="left"
              interactive={false}
            />
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link to={`/preview/#${template.id}`} className="block h-full">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Template Image */}
                  <div
                    className="w-full aspect-[4/2] bg-slate-50 relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${template.img})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                        {template.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-full p-4 shadow-lg border border-slate-200"
                      >
                        <Eye className="w-6 h-6 text-indigo-600" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                      <span className="text-indigo-600 text-sm font-medium">
                        Preview & Customize
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Guidance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
            <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </div>
                <span>Choose Template</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <span>Customize Content</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </div>
                <span>Download PDF</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm">
              All templates are fully customizable and optimized for Applicant
              Tracking Systems
            </p>
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-slate-200 py-6 mt-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <FileText className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold">
              ReSuMe<span className="text-indigo-600">Craft</span>
            </span>
          </Link>
        </div>
      </motion.footer>
    </div>
  );
};

export default Create;
