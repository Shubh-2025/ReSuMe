import { forwardRef } from "react";
import { FaUser } from "react-icons/fa";

const Template1 = forwardRef((props, ref) => {
  const { resumeData } = props;
  
  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', width: '210mm', minHeight: '297mm', pageBreakAfter: 'auto' }} className="shadow-lg flex flex-col md:flex-row">
      <div style={{ backgroundColor: '#111827', color: '#ffffff' }} className="w-full md:w-1/3 p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center">
          <FaUser size={70} color="#ffffff" />
        </div>

        <h1 className="text-2xl font-bold mb-1">{resumeData.name}</h1>
        <p style={{ color: '#d1d5db' }} className="text-sm mb-6">{resumeData.title}</p>

        <div className="w-full">
          <h2 style={{ borderBottomColor: '#374151' }} className="text-lg font-semibold border-b pb-1 mb-3">Contact</h2>
          <p className="text-sm mb-1">📞 {resumeData.contact.phone}</p>
          <p className="text-sm mb-1">✉️ {resumeData.contact.email}</p>
          <p className="text-sm mb-1">📍 {resumeData.contact.address}</p>
        </div>

        <div className="w-full mt-6">
          <h2 style={{ borderBottomColor: '#374151' }} className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
          <ul className="text-sm space-y-1">
            {resumeData.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-6 relative">
        <section className="mb-6">
          <h2 style={{ color: '#1f2937' }} className="text-xl font-semibold mb-2">Profile</h2>
          <p style={{ color: '#374151' }} className="text-sm leading-relaxed">{resumeData.profile}</p>
        </section>

        <section className="mb-6">
          <h2 style={{ color: '#1f2937' }} className="text-xl font-semibold mb-2">Experience</h2>
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 style={{ color: '#111827' }} className="text-lg font-medium">{exp.role}</h3>
              <p style={{ color: '#6b7280' }} className="text-sm">{exp.period}</p>
              <p style={{ color: '#374151' }} className="text-sm mt-1 whitespace-pre-line">{exp.details}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: '#1f2937' }} className="text-xl font-semibold mb-2">Education</h2>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h3 style={{ color: '#111827' }} className="text-lg font-medium">{edu.degree}</h3>
              <p style={{ color: '#6b7280' }} className="text-sm">{edu.institution}</p>
              <p style={{ color: '#374151' }} className="text-sm mt-1">{edu.details}</p>
            </div>
          ))}
        </section>

        <div style={{ color: '#9ca3af' }} className="absolute bottom-2 right-2 text-xs opacity-60 select-none">© ReSuMe.com</div>
      </div>
    </div>
  );
});

Template1.displayName = "Template1";
export default Template1;