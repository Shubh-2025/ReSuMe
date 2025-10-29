const Template3 = ({ resumeData }) => {
  if (!resumeData) return null;

  const { name, title, contact, skills, profile, experience, education } = resumeData;

  return (
    <div className="w-full max-w-5xl h-full rounded-xl overflow-y-scroll no-scrollbar shadow-2xl bg-white flex flex-col ">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">{name}</h1>
        <p className="text-lg mt-2 opacity-90">{title}</p>
      </div>

      {/* Body Section */}
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Left Panel */}
        <div className="md:w-1/3 backdrop-blur-md bg-white/60 p-8 border-r border-gray-200">
          
          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 uppercase tracking-wide">
              Contact
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>📞 {contact.phone}</li>
              <li>✉️ {contact.email}</li>
              <li>📍 {contact.address}</li>
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col flex-1 p-8 w-full bg-white/80">
          
          {/* Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 border-l-4 border-indigo-500 pl-3 mb-3">
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{profile}</p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 border-l-4 border-indigo-500 pl-3 mb-3">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {exp.details}
                </p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section  >
            <h2 className="text-2xl font-bold text-indigo-700 border-l-4 border-indigo-500 pl-3 mb-3">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-500">{edu.institution}</p>
                <p className="text-gray-700 mt-1">{edu.details}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template3;