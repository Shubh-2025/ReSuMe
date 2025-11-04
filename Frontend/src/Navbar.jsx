import { useEffect, useState } from "react";
import Button from "./DownloadButton";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText} from "lucide-react";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedIn(true);
      // console.log("User is logged in");
    }
  }, []);

  return (
    <nav className="flex h-25 items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link
              to="/"
              className="flex items-center space-x-2 text-slate-900 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-semibold">
                ReSuMe<span className="text-indigo-600">Craft</span>
              </span>
            </Link>

      {/* Desktop Menu */}
      {isLoggedIn ? (
        <div className="flex items-center justify-center gap-8">
          <Link to={`/dashboard`}>
            <Button name={"Dashboard"} />
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-8">
          <Link to={`/auth`}>
            <Button name={"Login"} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
