import { forwardRef } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const Initials = ({ name }) => {
  const initials = (name || "").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "JD";
  const colorCodes = ["#0d9488", "#4f46e5", "#e11d48", "#059669", "#7c3aed"];
  const bgColor = colorCodes[(initials.charCodeAt(0) || 0) % colorCodes.length];
  return (
    <div style={{ backgroundColor: bgColor, color: '#ffffff' }} className="w-28 h-28 md:w-32 md:h-32 rounded-full mb-4 flex items-center justify-center text-2xl md:text-3xl font-semibold shadow-lg">
      {initials}
    </div>
  );
};

const Template2 = forwardRef((props, ref) => {
  const { resumeData } = props;
  
  return (
    <div ref={ref} style={{ backgroundColor: '#030712', color: '#f3f4f6', width: '210mm', minHeight: '297mm', borderColor: '#1f2937', pageBreakAfter: 'auto' }} className="shadow-2xl flex flex-col md:flex-row border">
      <aside style={{ backgroundColor: '#111827', borderRightColor: '#1f2937' }} className="w-full md:w-1/3 p-6 flex flex-col items-center border-r">
        <Initials name={resumeData.name} />
        <h1 style={{ color: '#ffffff' }} className="text-2xl font-bold text-center">{resumeData.name}</h1>
        <p style={{ color: '#14b8a6' }} className="text-sm mb-4 text-center font-medium">{resumeData.title}</p>

        <div className="w-full mb-6">
          <h2 style={{ borderBottomColor: '#374151' }} className="text-lg font-semibold border-b pb-1 mb-3">Contact</h2>
          <p className="text-sm mb-1">📞 {resumeData.contact.phone}</p>
          <p className="text-sm mb-1">✉️ {resumeData.contact.email}</p>
          <p className="text-sm mb-1">📍 {resumeData.contact.address}</p>
        </div>

        <div className="w-full">
          <h2 style={{ borderBottomColor: '#374151', color: '#14b8a6' }} className="text-sm font-semibold border-b pb-1 mb-3 uppercase tracking-wide">Skills</h2>
          <div className="space-y-2">
            {resumeData.skills.map((s, i) => (
              <div key={i} style={{ color: '#d1d5db' }} className="text-sm">{s}</div>
            ))}
          </div>
        </div>
      </aside>

      <main style={{ backgroundColor: '#030712', color: '#e5e7eb' }} className="w-full md:w-2/3 p-6">
        <section className="mb-6">
          <h2 style={{ color: '#14b8a6' }} className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaBriefcase color="#14b8a6" /> Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, i) => (
              <div key={i} style={{ borderLeftColor: '#0f766e' }} className="border-l-2 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 style={{ color: '#ffffff' }} className="text-md font-medium">{exp.role}</h3>
                  <span style={{ color: '#9ca3af' }} className="text-xs">{exp.period}</span>
                </div>
                <p style={{ color: '#9ca3af' }} className="text-sm mt-2 whitespace-pre-line">{exp.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 style={{ color: '#14b8a6' }} className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaGraduationCap color="#14b8a6" /> Education
          </h2>
          <div className="space-y-3">
            {resumeData.education.map((edu, i) => (
              <div key={i}>
                <h3 style={{ color: '#ffffff' }} className="text-md font-medium">{edu.degree}</h3>
                <p style={{ color: '#9ca3af' }} className="text-sm">{edu.institution}</p>
                {edu.details && <p style={{ color: '#6b7280' }} className="text-sm mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        <div style={{ color: '#ffffff' }} className="text-xs select-none">© ReSuMe.com</div>
      </main>
    </div>
  );
});

Template2.displayName = "Template2";
export default Template2;