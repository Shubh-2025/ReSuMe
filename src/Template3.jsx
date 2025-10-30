import { forwardRef } from "react";

const Template3 = forwardRef((props, ref) => {
  const { resumeData } = props;
  
  if (!resumeData) return null;
  const { name, title, contact, skills, profile, experience, education } = resumeData;

  return (
    <div ref={ref} style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#ffffff', pageBreakAfter: 'auto' }} className="shadow-2xl flex flex-col">
      <div style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)', color: '#ffffff' }} className="p-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">{name}</h1>
        <p className="text-lg mt-2 opacity-90">{title}</p>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRightColor: '#e5e7eb' }} className="md:w-1/3 p-8 border-r">
          <div className="mb-8">
            <h2 style={{ color: '#4338ca' }} className="text-xl font-semibold mb-3 uppercase tracking-wide">Contact</h2>
            <ul style={{ color: '#374151' }} className="space-y-2">
              <li>📞 {contact.phone}</li>
              <li>✉️ {contact.email}</li>
              <li>📍 {contact.address}</li>
            </ul>
          </div>

          <div>
            <h2 style={{ color: '#4338ca' }} className="text-xl font-semibold mb-3 uppercase tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', color: '#ffffff' }} className="text-sm px-3 py-1 rounded-full shadow text-wrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="flex flex-col flex-1 p-8 w-full">
          <section className="mb-8">
            <h2 style={{ color: '#4338ca', borderLeftColor: '#6366f1' }} className="text-2xl font-bold border-l-4 pl-3 mb-3">Profile</h2>
            <p style={{ color: '#374151' }} className="leading-relaxed">{profile}</p>
          </section>

          <section className="mb-8">
            <h2 style={{ color: '#4338ca', borderLeftColor: '#6366f1' }} className="text-2xl font-bold border-l-4 pl-3 mb-3">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <h3 style={{ color: '#111827' }} className="text-lg font-semibold">{exp.role}</h3>
                <p style={{ color: '#6b7280' }} className="text-sm mb-2">{exp.period}</p>
                <p style={{ color: '#374151' }} className="whitespace-pre-line leading-relaxed">{exp.details}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 style={{ color: '#4338ca', borderLeftColor: '#6366f1' }} className="text-2xl font-bold border-l-4 pl-3 mb-3">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 style={{ color: '#111827' }} className="text-lg font-semibold">{edu.degree}</h3>
                <p style={{ color: '#6b7280' }} className="text-sm">{edu.institution}</p>
                <p style={{ color: '#374151' }} className="mt-1">{edu.details}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
});

Template3.displayName = "Template3";
export default Template3;