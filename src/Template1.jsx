import { FaUser } from "react-icons/fa";

const Template1 = ({ resumeData }) => {
    return (
        <div>
            {/* Resume Body */}
            <div
                id="resume"
                className="bg-white w-full h-full max-w-5xl shadow-lg rounded-lg lg:overflow-hidden flex flex-col md:flex-row flex-1 relative overflow-scroll"
            >
                {/* Left Sidebar */}
                <div className="bg-gray-900 text-white w-full md:w-1/3 p-6 flex flex-col items-center">
                    {/* Profile Picture Placeholder */}
                    <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center">
                        <FaUser size={70} />
                    </div>

                    <h1 className="text-2xl font-bold mb-1">{resumeData.name}</h1>
                    <p className="text-sm text-gray-300 mb-6">{resumeData.title}</p>

                    {/* Contact Info */}
                    <div className="w-full">
                        <h2 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">
                            Contact
                        </h2>
                        <p className="text-sm mb-1">📞 {resumeData.contact.phone}</p>
                        <p className="text-sm mb-1">✉️ {resumeData.contact.email}</p>
                        <p className="text-sm mb-1">📍 {resumeData.contact.address}</p>
                    </div>

                    {/* Skills */}
                    <div className="w-full h-full mt-6">
                        <h2 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">
                            Skills
                        </h2>
                        <ul className="text-sm space-y-1">
                            {resumeData.skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full h-full md:w-2/3 p-4 relative">
                    {/* Profile Summary */}
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Profile
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">{resumeData.profile}</p>
                    </section>

                    {/* Experience */}
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Experience
                        </h2>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
                                <p className="text-sm text-gray-500">{exp.period}</p>
                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                                    {exp.details}
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Education
                        </h2>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-500">{edu.institution}</p>
                                <p className="text-sm text-gray-700 mt-1">{edu.details}</p>
                            </div>
                        ))}
                    </section>

                    {/* Watermark */}
                    <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-4 text-xs text-gray-400 opacity-60 select-none">
                        © ReSuMe.com
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Template1;