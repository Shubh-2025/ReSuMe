import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { Link, useLocation } from "react-router-dom";
import Button from "./DownloadButton";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Generated = () => {
  const resumeRef = useRef();

  const handleDownload = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "My_Resume",
  });
  
  // dummy user id
  const userid = 1;
  // let resumeData={};
  let [resumeData,setResumeData] =useState({
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
    });
  const location = useLocation();
  const [templateId, setTemplateId] = useState(1);

  useEffect(() => {
    // Extract hash from URL (like "#2")
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTemplateId(parseInt(hash));
    }
  }, [location]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch("http://localhost:9000/generate");
        if (!response.ok) {
          alert("data not found");
          return;
        }

        const result = await response.json();
        let data = result.message;

        // ✅ Normalize structure because backend sends wrong format
        const formatted = {
          name: data.name,
          title: data.title,
          profile: data.profile,
          contact: {
            phone: data.phone,
            email: data.email,
            address: data.address,
          },
          skills: data.skills || [],
          experience: data.experience?.map(item => JSON.parse(item)) || ["none"],
          education: data.education?.map(item => JSON.parse(item)) || ["none"],
        };

        setResumeData(formatted); // ✅ Now correct shape
        // console.log("Formatted Resume Data:", formatted);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTemplate();
  }, [templateId]);


  // Select which template to render dynamically
  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <Template1 ref={resumeRef} resumeData={resumeData} />;
      case 2:
        return <Template2 ref={resumeRef} resumeData={resumeData} />;
      case 3:
        return <Template3 ref={resumeRef} resumeData={resumeData} />;
    }
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
        <Link to={`/format/${templateId}/${userid}`}>
        <Button name={"Format"} /></Link>
        <Button name={"Download"} onClick={handleDownload} />
      </div>
    </div>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-[5px] w-full bg-black "
    />
    {renderTemplate()}
  </div>
  );
};

export default Generated;