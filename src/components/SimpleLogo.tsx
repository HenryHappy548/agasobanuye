import { Link } from "react-router-dom";
import SITE_CONFIG from "@/config/site";

const SimpleLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
      <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
        <span className="text-white font-bold text-sm">S</span>
      </div>
      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {SITE_CONFIG.NAME}
      </span>
    </Link>
  );
};

export default SimpleLogo;