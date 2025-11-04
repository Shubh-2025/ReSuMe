import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-black via-gray-800 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            ReSuMe<span className="text-indigo-500">Craft</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Design your professional resume in minutes. Choose from modern templates, customize instantly, and download your perfect resume.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="/preview/#1" className="hover:text-indigo-400 transition">Templates</a></li>
            <li><a href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</a></li>
            {/* <li><a href="/contact" className="hover:text-indigo-400 transition">Contact</a></li> */}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">ReSuMeCraft</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;