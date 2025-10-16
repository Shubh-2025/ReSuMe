import { useState } from "react";
import Button from "./DownloadButton";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex h-25 items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            {/* Logo */}
            <div
                className="text-3xl text-black font-bold cursor-pointer"
                title="Home"
            >
                <h2 className="text-2xl font-bold text-black">ReSuMe<span className="text-indigo-500">Craft</span></h2>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <a href="#" className="block hover:text-indigo-500 font-bold transition-all ease-in-out duration-400">Home</a>
                <a href="#" className="block hover:text-indigo-500 font-bold transition-all ease-in-out duration-400">Previous</a>
                <a href="#" className="block hover:text-indigo-500 font-bold transition-all ease-in-out duration-400">Profile</a>
                <Link to={`/auth`}><Button name={"Login"} /></Link>
            </div>

            {/* Menu Button (Mobile) */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="sm:hidden"
            >
                <svg
                    width="21"
                    height="15"
                    viewBox="0 0 21 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="25" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="20" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Overlay (detects outside clicks) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40 transition-opacity duration-300 ease-in-out sm:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`
          absolute left-0 top-0 w-full h-60 bg-white shadow-md p-5 flex flex-col justify-between items-center text-sm md:hidden overflow-hidden z-50
          transition-all duration-500 ease-out
          ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-5 py-0 pointer-events-none"}
        `}
            >
                <a href="#" className="block flex-2 font-bold">Home</a>
                <a href="#" className="block flex-2 font-bold">Previous</a>
                <a href="#" className="block flex-2 font-bold">Profile</a>
                <Button name={"Login"} />
            </div>
        </nav>
    );
};

export default Navbar;
