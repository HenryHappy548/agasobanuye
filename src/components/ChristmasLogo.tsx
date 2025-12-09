import { Link } from "react-router-dom";
import logoRwaflix from "@/assets/logo-rwaflix.png";

const ChristmasLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 sm:space-x-3 relative group">
      {/* Logo with Santa hat */}
      <div className="relative">
        <img 
          src={logoRwaflix} 
          alt="Rwaflix Logo" 
          className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" 
        />
        {/* Santa Hat */}
        <div className="absolute -top-3 -right-1 animate-bounce" style={{ animationDuration: '2s' }}>
          <svg 
            width="20" 
            height="18" 
            viewBox="0 0 24 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Hat body */}
            <path 
              d="M2 18 C2 18 4 10 12 8 C20 10 22 18 22 18" 
              fill="#dc2626" 
              stroke="#b91c1c" 
              strokeWidth="0.5"
            />
            {/* Hat tip */}
            <path 
              d="M12 8 C12 8 14 2 18 1" 
              stroke="#dc2626" 
              strokeWidth="4" 
              strokeLinecap="round"
              fill="none"
            />
            {/* Pompom */}
            <circle cx="18" cy="1" r="2.5" fill="white" />
            {/* White trim */}
            <ellipse cx="12" cy="18" rx="11" ry="2.5" fill="white" />
          </svg>
        </div>
        {/* Snow particles */}
        <div className="absolute -top-1 left-0 pointer-events-none">
          <div className="w-1 h-1 bg-white rounded-full absolute animate-ping opacity-75" style={{ left: '-5px', top: '-2px', animationDuration: '1.5s' }}></div>
          <div className="w-0.5 h-0.5 bg-white rounded-full absolute animate-ping opacity-60" style={{ left: '3px', top: '-5px', animationDuration: '2s', animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Brand name with Christmas colors */}
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 via-primary to-green-500 bg-clip-text text-transparent">
        Rwaflix
      </h1>
      
      {/* Christmas decoration - small ornament */}
      <div className="hidden sm:block absolute -right-4 top-0">
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className="animate-pulse">
          <rect x="5" y="0" width="2" height="3" fill="#facc15" rx="0.5" />
          <circle cx="6" cy="10" r="5" fill="#dc2626" />
          <ellipse cx="6" cy="8" rx="2" ry="1" fill="white" opacity="0.3" />
        </svg>
      </div>
    </Link>
  );
};

export default ChristmasLogo;
