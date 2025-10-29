import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaBriefcase,
} from "react-icons/fa";


const Initials = ({ name }) => {
    const initials =
        (name || "")
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "JD";
    const colors = [
        "bg-teal-600",
        "bg-indigo-600",
        "bg-rose-600",
        "bg-emerald-600",
        "bg-violet-600",
    ];
    const color = colors[(initials.charCodeAt(0) || 0) % colors.length];
    return (
        <div
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full mb-4 flex items-center justify-center ${color} text-white text-2xl md:text-3xl font-semibold shadow-lg`}
            aria-hidden
        >
            {initials}
        </div>
    );
};

const SkillBar = ({ skill }) => {
    const name = typeof skill === "string" ? skill : skill.name;
    return (
        <div>
            <div className="flex justify-between text-xs text-gray-300">
                <span>{name}</span>
            </div>
        </div>
    );
};

const Template2 = ({ resumeData }) => {
    const rd = resumeData;
    console.log(rd);
    return (
        <div
            id="resume"
            className="bg-gray-950 text-gray-100 w-full h-full max-w-5xl shadow-2xl rounded-xl flex flex-col md:flex-row overflow-scroll lg:overflow-hidden border border-gray-800"
        >
            {/* LEFT SIDEBAR */}
            <aside className="bg-gray-900 w-full md:w-1/3 p-6 flex flex-col items-center border-r border-gray-800">
                <div className="mb-4">
                    {rd.avatar ? (
                        <img
                            src={rd.avatar}
                            alt="profile"
                            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-lg ring-2 ring-teal-500"
                        />
                    ) : (
                        <Initials name={rd.name} />
                    )}
                </div>

                <h1 className="text-2xl font-bold text-center text-white">{rd.name}</h1>
                <p className="text-sm text-teal-400 mb-4 text-center font-medium">
                    {rd.title}
                </p>

                {/* Contact Info */}
                    <div className="w-full">
                        <h2 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-3">
                            Contact
                        </h2>
                        <p className="text-sm mb-1">📞 {resumeData.contact.phone}</p>
                        <p className="text-sm mb-1">✉️ {resumeData.contact.email}</p>
                        <p className="text-sm mb-1">📍 {resumeData.contact.address}</p>
                    </div>

                {/* SKILLS */}
                <div className="w-full mb-0">
                    <h2 className="text-sm font-semibold border-b border-gray-700 pb-1 mb-3 uppercase tracking-wide text-teal-400">
                        Skills
                    </h2>
                    <div className="space-y-3">
                        {rd.skills.map((s, i) => (
                            <SkillBar skill={s} key={i} />
                        ))}
                    </div>
                </div>
            </aside>

            {/* RIGHT MAIN SECTION */}
            <main className="w-full md:w-2/3 p-4 md:p-6 bg-gray-950 text-gray-200">
                {/* EXPERIENCE */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-teal-400">
                        <FaBriefcase />
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {rd.experience.map((exp, i) => (
                            <div key={i} className="border-l-2 border-teal-700 pl-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="text-md font-medium text-white">{exp.role}</h3>
                                    <span className="text-xs text-gray-400">{exp.period}</span>
                                </div>
                                {Array.isArray(exp.details) ? (
                                    <ul className="list-disc ml-5 mt-2 text-sm text-gray-400 space-y-1">
                                        {exp.details.map((d, idx) => (
                                            <li key={idx}>{d}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-400 mt-2 whitespace-pre-line">
                                        {exp.details}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* EDUCATION */}
                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-teal-400">
                        <FaGraduationCap />
                        Education
                    </h2>
                    <div className="space-y-3">
                        {rd.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="text-md font-medium text-white">{edu.degree}</h3>
                                <p className="text-sm text-gray-400">{edu.institution}</p>
                                {edu.details && (
                                    <p className="text-sm text-gray-500 mt-1">{edu.details}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
-
                <div className="relative bottom-0 left-60 lg:top-23 lg:left-140 text-xs text-white select-none">
                    © ReSuMe.com
                </div>
            </main>
        </div>
    );
};

export default Template2;