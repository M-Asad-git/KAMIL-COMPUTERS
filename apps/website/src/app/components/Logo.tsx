import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className={`${iconSizes[size]} bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300`}>
          <div className="w-3/4 h-3/4 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-1/2 h-1/2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400 rounded-xl blur-md opacity-20"></div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className={`font-extrabold ${sizeClasses[size]} tracking-tight leading-tight ${className.includes('text-white') ? 'text-white' : 'text-gray-800'}`}>
          Kamil
        </span>
        <span className={`font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"} tracking-wide leading-tight ${className.includes('text-white') ? 'text-blue-200' : 'text-blue-600'}`}>
          Computers
        </span>
      </div>
    </div>
  );
}
