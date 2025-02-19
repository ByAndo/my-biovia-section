import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  background?: string;
  hoverBgColor?: string;
  fontColor?: string;  
}

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  background = "var(--color-second)",
  hoverBgColor = "var(--color-second-hover)",
  fontColor = "var(--color-font)",
  className = "",
  ...rest
  
}) => {
  return (
    <button
      
      className={`flex items-center justify-center gap-1 px-2 py-1 text-[13px] 
        font-semibold rounded transition
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}        
        style={{
            background : background,    
            color : fontColor                          
        }}        
        onMouseEnter={(e)=> e.currentTarget.style.background = hoverBgColor}
        onMouseLeave={(e)=> e.currentTarget.style.background = background}
        {...rest}
              
    >
      {icon && <span>{icon}</span>}
      {children} 
    </button>
  );
};

export default Button;
