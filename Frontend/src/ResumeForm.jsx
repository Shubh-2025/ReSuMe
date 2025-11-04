import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Trash2, ArrowLeft, Send, Calendar, Building, BookOpen, CheckCircle } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';

export default function ResumeForm() {
    const { tid, uid } = useParams();
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');
    useEffect(() => {
        if (!id) {
            toast.error("Please login to make your own resume",{duration:5000});
            navigate("/auth");
        }
    }, []); // prevents user from editin the document without logging in.

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
    const [activeSection, setActiveSection] = useState("personal");
    const [completion, setCompletion] = useState(0);

    const sections = [
        { id: "personal", title: "Personal Information" },
        { id: "contact", title: "Contact Details" },
        { id: "profile", title: "Professional Summary" },
        { id: "skills", title: "Skills" },
        { id: "experience", title: "Work Experience" },
        { id: "education", title: "Education" },
        { id: "review", title: "Review & Generate" },
    ];

    // Calculate completion percentage based on filled fields
    useEffect(() => {
        let filledFields = 0;
        let totalFields = 0;

        // Personal Info (2 required fields)
        totalFields += 2;
        if (formData.name.trim()) filledFields++;
        if (formData.title.trim()) filledFields++;

        // Contact Info (2 required, 1 optional)
        totalFields += 2; // Only count required fields for completion
        if (formData.contact.email.trim()) filledFields++;
        if (formData.contact.phone.trim()) filledFields++;
        // Address is optional, don't count towards completion

        // Profile (1 required field)
        totalFields += 1;
        if (formData.profile.trim()) filledFields++;

        // Skills (at least one required)
        totalFields += 1;
        if (formData.skills.some(skill => skill.trim())) filledFields++;

        // Experience (at least one entry with role is required for good resume)
        totalFields += 1;
        if (formData.experience.some(exp => exp.role.trim())) filledFields++;

        // Education (at least one entry with degree is required for good resume)
        totalFields += 1;
        if (formData.education.some(edu => edu.degree.trim())) filledFields++;

        const percentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        setCompletion(Math.min(Math.max(percentage, 0), 100));
    }, [formData]);

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
        // Clear error when user starts typing
        if (errors[path]) {
            setErrors(prev => ({ ...prev, [path]: "" }));
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
                ? ""
                : type === "experience"
                    ? { role: "", period: "", details: "" }
                    : { degree: "", institution: "", details: "" };

        setFormData((prev) => ({
            ...prev,
            [type]: [...prev[type], emptyItem],
        }));
    };

    // Remove array field
    const removeArrayField = (type, index) => {
        if (formData[type].length > 1) {
            setFormData((prev) => ({
                ...prev,
                [type]: prev[type].filter((_, i) => i !== index),
            }));
        }
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

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.title.trim()) newErrors.title = "Professional title is required";
        if (!formData.contact.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.contact.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.contact.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        if (!formData.profile.trim()) newErrors.profile = "Profile summary is required";
        if (formData.skills.length === 0 || !formData.skills[0].trim()) newErrors.skills = "At least one skill is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 📨 Submit + Send to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            alert("Please fill all required fields before submitting!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:9000/format", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                alert("Could not generate resume");
                return;
            }

            const result = await response.json();
            navigate(`/generated/${result.id}`);
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Failed to submit form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get current section index
    const currentSectionIndex = sections.findIndex(s => s.id === activeSection);

    // Check if a section is completed based on its data
    const isSectionCompleted = (sectionId) => {
        switch (sectionId) {
            case "personal":
                return formData.name.trim() && formData.title.trim();
            case "contact":
                return formData.contact.email.trim() && formData.contact.phone.trim();
            case "profile":
                return formData.profile.trim();
            case "skills":
                return formData.skills.some(skill => skill.trim());
            case "experience":
                return formData.experience.some(exp => exp.role.trim());
            case "education":
                return formData.education.some(edu => edu.degree.trim());
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            {/* Header */}
            <Toaster />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Create Your Resume
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Fill in your details to generate a professional resume
                        </p>
                    </div>

                    <div className="w-20"></div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">
                            Form Completion
                        </span>
                        <span className="text-sm font-medium text-indigo-600">
                            {Math.round(completion)}%
                        </span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${completion}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Section Progress */}
                <div className="flex items-center justify-between text-sm text-slate-600">
                    {sections.map((section, index) => {
                        const isCompleted = isSectionCompleted(section.id) || index < currentSectionIndex;
                        const isCurrent = index === currentSectionIndex;
                        const isUpcoming = index > currentSectionIndex;

                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex flex-col items-center transition-all ${isCurrent
                                    ? "text-indigo-600 font-semibold scale-110"
                                    : isCompleted
                                        ? "text-green-600"
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${isCompleted
                                    ? "bg-green-100 border-2 border-green-500"
                                    : isCurrent
                                        ? "bg-indigo-100 border-2 border-indigo-500"
                                        : "bg-slate-100 border-2 border-slate-300"
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <span className={`text-xs font-semibold ${isCurrent ? "text-indigo-600" : "text-slate-400"
                                            }`}>
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs max-w-16 text-center leading-tight hidden sm:block">
                                    {section.title.split(' ')[0]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Personal Information */}
                        <AnimatePresence mode="wait">
                            {activeSection === "personal" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Personal Information</h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={(e) => handleChange(e, "name")}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.name ? "border-red-500" : "border-slate-300"
                                                    }`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Professional Title *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Frontend Developer"
                                                value={formData.title}
                                                onChange={(e) => handleChange(e, "title")}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.title ? "border-red-500" : "border-slate-300"
                                                    }`}
                                            />
                                            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("contact")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Continue to Contact
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Contact Information */}
                        <AnimatePresence mode="wait">
                            {activeSection === "contact" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="your.email@example.com"
                                                value={formData.contact.email}
                                                onChange={(e) => handleChange(e, "contact.email")}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.email ? "border-red-500" : "border-slate-300"
                                                    }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                value={formData.contact.phone}
                                                onChange={(e) => handleChange(e, "contact.phone")}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.phone ? "border-red-500" : "border-slate-300"
                                                    }`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="City, State, Country"
                                                value={formData.contact.address}
                                                onChange={(e) => handleChange(e, "contact.address")}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("personal")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("profile")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Continue to Summary
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Professional Summary */}
                        <AnimatePresence mode="wait">
                            {activeSection === "profile" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Professional Summary</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Write a brief overview of your professional background *
                                        </label>
                                        <textarea
                                            rows="5"
                                            placeholder="Describe your professional experience, key achievements, and career objectives..."
                                            value={formData.profile}
                                            onChange={(e) => handleChange(e, "profile")}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${errors.profile ? "border-red-500" : "border-slate-300"
                                                }`}
                                        />
                                        {errors.profile && <p className="text-red-500 text-sm mt-2">{errors.profile}</p>}
                                        <p className="text-sm text-slate-500 mt-2">
                                            Keep it concise and impactful (3-5 sentences recommended)
                                        </p>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("contact")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("skills")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Continue to Skills
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Skills Section */}
                        <AnimatePresence mode="wait">
                            {activeSection === "skills" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Skills & Expertise</h2>

                                    <div className="space-y-4">
                                        {formData.skills.map((skill, i) => (
                                            <div key={i} className="flex items-center space-x-3">
                                                <input
                                                    type="text"
                                                    placeholder={`Skill ${i + 1} (e.g. React, Project Management)`}
                                                    value={skill}
                                                    onChange={(e) => handleSkillChange(i, e.target.value)}
                                                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                />
                                                {formData.skills.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayField("skills", i)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

                                        <button
                                            type="button"
                                            onClick={() => addArrayField("skills")}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Another Skill</span>
                                        </button>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("profile")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("experience")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Continue to Experience
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Experience Section */}
                        <AnimatePresence mode="wait">
                            {activeSection === "experience" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Work Experience</h2>

                                    <div className="space-y-6">
                                        {formData.experience.map((exp, i) => (
                                            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-slate-700">Experience #{i + 1}</h3>
                                                    {formData.experience.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayField("experience", i)}
                                                            className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="text-sm">Remove</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            <Building className="w-4 h-4 inline mr-2" />
                                                            Job Role & Company *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Senior Developer at Tech Corp"
                                                            value={exp.role}
                                                            onChange={(e) => handleArrayChange(i, "role", e.target.value, "experience")}
                                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            <Calendar className="w-4 h-4 inline mr-2" />
                                                            Employment Period *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Jan 2020 - Present"
                                                            value={exp.period}
                                                            onChange={(e) => handleArrayChange(i, "period", e.target.value, "experience")}
                                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                                        Responsibilities & Achievements
                                                    </label>
                                                    <textarea
                                                        rows="3"
                                                        placeholder="Describe your key responsibilities, achievements, and contributions..."
                                                        value={exp.details}
                                                        onChange={(e) => handleArrayChange(i, "details", e.target.value, "experience")}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => addArrayField("experience")}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Another Experience</span>
                                        </button>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("skills")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("education")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Continue to Education
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Education Section */}
                        <AnimatePresence mode="wait">
                            {activeSection === "education" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Education</h2>

                                    <div className="space-y-6">
                                        {formData.education.map((edu, i) => (
                                            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-slate-700">Education #{i + 1}</h3>
                                                    {formData.education.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayField("education", i)}
                                                            className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="text-sm">Remove</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            <BookOpen className="w-4 h-4 inline mr-2" />
                                                            Degree / Qualification *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Bachelor of Computer Science"
                                                            value={edu.degree}
                                                            onChange={(e) => handleArrayChange(i, "degree", e.target.value, "education")}
                                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            <Building className="w-4 h-4 inline mr-2" />
                                                            Institution *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. University of Technology"
                                                            value={edu.institution}
                                                            onChange={(e) => handleArrayChange(i, "institution", e.target.value, "education")}
                                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                                        Additional Details
                                                    </label>
                                                    <textarea
                                                        rows="3"
                                                        placeholder="Mention honors, relevant coursework, achievements..."
                                                        value={edu.details}
                                                        onChange={(e) => handleArrayChange(i, "details", e.target.value, "education")}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => addArrayField("education")}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Another Education</span>
                                        </button>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("experience")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("review")}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Review & Generate
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Final Review Section */}
                        <AnimatePresence mode="wait">
                            {activeSection === "review" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                                        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                                            Ready to Generate Your Resume
                                        </h2>
                                        <p className="text-slate-600 mb-8">
                                            Review your information below and generate your professional resume
                                        </p>
                                    </div>

                                    {/* Review Summary */}
                                    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                                        <h3 className="font-semibold text-slate-900 mb-4">Summary Preview</h3>

                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-slate-700">Name:</span>
                                                <p className="text-slate-600">{formData.name || "Not provided"}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-700">Title:</span>
                                                <p className="text-slate-600">{formData.title || "Not provided"}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-700">Email:</span>
                                                <p className="text-slate-600">{formData.contact.email || "Not provided"}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-700">Phone:</span>
                                                <p className="text-slate-600">{formData.contact.phone || "Not provided"}</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="font-medium text-slate-700">Skills:</span>
                                                <p className="text-slate-600">
                                                    {formData.skills.filter(skill => skill.trim()).join(", ") || "No skills added"}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="font-medium text-slate-700">Experience Entries:</span>
                                                <p className="text-slate-600">{formData.experience.length}</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="font-medium text-slate-700">Education Entries:</span>
                                                <p className="text-slate-600">{formData.education.length}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection("education")}
                                            className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            ← Back to Education
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all ${isSubmitting
                                                ? "bg-slate-400 cursor-not-allowed"
                                                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                                                } text-white`}
                                        >
                                            <Send className="w-5 h-5" />
                                            <span>{isSubmitting ? "Generating..." : "Generate Resume"}</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}