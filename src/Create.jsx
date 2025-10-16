import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
    { id: 1, name: "Template 1" },
    { id: 2, name: "Template 2" },
    { id: 3, name: "Template 3" },
];

const Create = () => {
    return (
        <div className="h-full w-full bg-white flex flex-col items-start justify-start px-6 md:px-16 lg:px-32 py-10 overflow-hidden">
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
                className="h-[2px] bg-black mb-8"
            />

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {/* Create Blank Card */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.6 }}
                    className="border border-gray-500 rounded-xl flex flex-col items-center justify-center p-6 text-black cursor-pointer bg-transparent hover:bg-black hover:text-white transition-all"
                >
                    <div className="border border-gray-400 rounded-lg p-4 mb-3 flex items-center justify-center bg-white text-black transition">
                        <Plus size={28} />
                    </div>
                    <p className=" text-sm font-medium">Create Blank</p>
                </motion.div>

                {/* Template Cards */}
                {templates.map((t) => (
                    <Link to={`/preview/#${t.id}`} key={t.id} className="border border-gray-500 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gradient-to-r from-indigo-500/60 via-pink-500/60 to-yellow-400/60 transition-all">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.6 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.6 }}
                        >
                            <p className="text-black text-sm font-medium">{t.name}</p>
                        </motion.div></Link>
                ))}
            </div>
        </div>
    );
};

export default Create;