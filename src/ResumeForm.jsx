import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function ResumeForm() {
    const { tid, uid } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tid: tid,
        uid: uid,
        name: "",
        title: "",
        contact: { phone: "", email: "", address: "" },
        skills: [""],
        profile: "",
        experience: [{ role: "", period: "", details: "" }],
        education: [{ degree: "", institution: "", details: "" }],
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    // Handle simple fields (and nested contact fields)
    const handleChange = (e, path) => {
        const value = e.target.value;
        if (path.includes(".")) {
            const [main, sub] = path.split(".");
            setFormData((prev) => ({
                ...prev,
                [main]: { ...prev[main], [sub]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [path]: value }));
        }
    };

    // Handle experience and education arrays
    const handleArrayChange = (index, field, value, type) => {
        const updated = [...formData[type]];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, [type]: updated }));
    };

    // Add dynamic fields
    const addArrayField = (type) => {
        const emptyItem =
            type === "skills"
                ? [""]
                : type === "experience"
                    ? { role: "", period: "", details: "" }
                    : { degree: "", institution: "", details: "" };
        setFormData((prev) => ({
            ...prev,
            [type]: [...prev[type], ...(Array.isArray(emptyItem) ? emptyItem : [emptyItem])],
        }));
    };

    // Skills array handler
    const handleSkillChange = (index, value) => {
        const updated = [...formData.skills];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, skills: updated }));
    };

    // 🔍 Validation
    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.title.trim()) newErrors.title = "Title is required.";
        if (!formData.contact.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.contact.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!formData.contact.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.contact.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number.";
        }

        if (!formData.profile.trim())
            newErrors.profile = "Profile summary cannot be empty.";

        if (formData.skills.length === 0 || !formData.skills[0].trim())
            newErrors.skills = "At least one skill is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 📨 Submit + Send to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        if (!validate()) {
            alert("Please fill all necessary details before submitting!");
            return;
        }

        setIsSubmitting(true);
        try {
            // Change this URL to your backend endpoint
            const response = await fetch("http://localhost:9000/format", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {return alert("could not generate")}

            const result = await response.json();
            // console.log("✅ Backend Response:", result);
            setSuccess("Resume submitted successfully!");
            setFormData({
                name: "",
                title: "",
                contact: { phone: "", email: "", address: "" },
                skills: [""],
                profile: "",
                experience: [{ role: "", period: "", details: "" }],
                education: [{ degree: "", institution: "", details: "" }],
            });
            navigate('/generated')
        } catch (err) {
            console.error("❌ Error submitting form:", err);
            alert("Failed to submit form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
            <h2 className="text-2xl m-3 font-bold text-black">
                ReSuMe<span className="text-indigo-500">Craft</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => handleChange(e, "name")}
                        className="border p-3 rounded w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <input
                        type="text"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={(e) => handleChange(e, "title")}
                        className="border p-3 rounded w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Phone"
                            value={formData.contact.phone}
                            onChange={(e) => handleChange(e, "contact.phone")}
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.contact.email}
                            onChange={(e) => handleChange(e, "contact.email")}
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={formData.contact.address}
                            onChange={(e) => handleChange(e, "contact.address")}
                            className="border p-3 rounded w-full"
                        />
                    </div>
                    {(errors.phone || errors.email) && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone || errors.email}
                        </p>
                    )}
                </div>

                {/* Profile */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Profile Summary</h2>
                    <textarea
                        rows="4"
                        placeholder="Write a short profile summary..."
                        value={formData.profile}
                        onChange={(e) => handleChange(e, "profile")}
                        className="border p-3 rounded w-full"
                    ></textarea>
                    {errors.profile && <p className="text-red-500 text-sm">{errors.profile}</p>}
                </div>

                {/* Skills */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    {formData.skills.map((skill, i) => (
                        <input
                            key={i}
                            type="text"
                            placeholder={`Skill #${i + 1}`}
                            value={skill}
                            onChange={(e) => handleSkillChange(i, e.target.value)}
                            className="border p-3 rounded w-full mb-2"
                        />
                    ))}
                    {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                    <button
                        type="button"
                        onClick={() => addArrayField("skills")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        + Add Skill
                    </button>
                </div>

                {/* Experience */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Experience</h2>
                    {formData.experience.map((exp, i) => (
                        <div key={i} className="border p-4 rounded mb-3">
                            <input
                                type="text"
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) =>
                                    handleArrayChange(i, "role", e.target.value, "experience")
                                }
                                className="border p-2 rounded w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Period"
                                value={exp.period}
                                onChange={(e) =>
                                    handleArrayChange(i, "period", e.target.value, "experience")
                                }
                                className="border p-2 rounded w-full mb-2"
                            />
                            <textarea
                                rows="3"
                                placeholder="Details"
                                value={exp.details}
                                onChange={(e) =>
                                    handleArrayChange(i, "details", e.target.value, "experience")
                                }
                                className="border p-2 rounded w-full"
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("experience")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        + Add Experience
                    </button>
                </div>

                {/* Education */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {formData.education.map((edu, i) => (
                        <div key={i} className="border p-4 rounded mb-3">
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) =>
                                    handleArrayChange(i, "degree", e.target.value, "education")
                                }
                                className="border p-2 rounded w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) =>
                                    handleArrayChange(i, "institution", e.target.value, "education")
                                }
                                className="border p-2 rounded w-full mb-2"
                            />
                            <textarea
                                rows="3"
                                placeholder="Details"
                                value={edu.details}
                                onChange={(e) =>
                                    handleArrayChange(i, "details", e.target.value, "education")
                                }
                                className="border p-2 rounded w-full"
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("education")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        + Add Education
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                        } text-white py-3 rounded font-semibold transition`}
                >
                    {isSubmitting ? "Submitting..." : "Generate Resume"}
                </button>

                {success && <p className="text-green-600 text-center">{success}</p>}
            </form>
        </div>
    );
}