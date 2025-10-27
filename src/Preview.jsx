import Template1 from "./Template1";
import { Link } from "react-router-dom";
import Button from "./DownloadButton";
import { motion } from "framer-motion";

const Preview = () => {
  const resumeData = {
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
  };

  return (<div className="h-screen bg-gray-100 flex flex-col justify-center items-center gap-10 p-5">
    {/* Header Section */}
    <div className="w-full m-1 flex flex-wrap gap-4">
      <div className="text-3xl text-black font-bold  flex-1">
        <Link to={`/canvas`}>ReSuMe<span className="text-indigo-500">Craft</span></Link>
        <br />
        <span className="text-xl font-light">Thanks For Choosing Us...</span>
      </div>
      <div className="flex flex-1 justify-evenly gap-1">
        <Button className="" name={"Format"} />
        <Button className="" name={"Download"} />
      </div>
    </div>
    {/* line */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-[5px] w-full bg-black "
    />
    {/* template */}
    <Template1 resumeData={resumeData} />
  </div>
  );
};

export default Preview;
