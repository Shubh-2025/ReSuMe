import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CurvedLoop from "./Curvedloop";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";

const templates = [
    { id: 1, name: "Template 1",img : template1 },
    { id: 2, name: "Template 2",img : template2 },
    { id: 3, name: "Template 3",img : template3 },
];

const Create = () => {
    return (

        <div className="h-full w-full bg-gray-100 flex flex-col items-start justify-start px-6 md:px-16 lg:px-32 py-10 overflow-auto">
            <CurvedLoop
                marqueeText="Be ✦ Creative ✦ ⌀ ✦ With ✦ ReSuMeCraft ✦ ⌀ ✦"
                speed={2}
                curveAmount={200}
                direction="left"
                interactive={false}
                className="custom-text-style"
            />
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-semibold text-black mb-4"
            >
                Canvas
            </motion.h1>

            {/* line */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-[5px] w-full bg-black mb-8"
            />

            {/* Grid Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {/* Template Cards */}
                {templates.map((t) => (
                    <Link
                        to={`/preview/#${t.id}`}
                        key={t.id}
                        className="rounded flex items-center justify-center cursor-pointer"
                    >
                        <motion.div
                            style={{
                                backgroundImage: `url(${t.img})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full aspect-square rounded-xl"
                        ></motion.div>
                    </Link>
                ))}
            </div>
            {/* line */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-[5px] w-full bg-black mt-8"
            />  
        </div>
    );
};

export default Create;