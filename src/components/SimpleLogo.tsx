import { Link } from "react-router-dom";
import logoRwaflix from "@/assets/logo-rwaflix.png";

const SimpleLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
      <img 
        src={logoRwaflix} 
        alt="Rwaflix Logo" 
        className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" 
      />
      <span className="text-xl sm:text-2xl font-bold text-primary">
        Rwaflix
      </span>
    </Link>
  );
};

export default SimpleLogo;
