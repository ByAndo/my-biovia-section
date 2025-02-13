import { cn } from "@/utils/helpers";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  className?: string; // 🔥 className을 명확히 string으로 정의
}

const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg text-white font-semibold";
  const variantStyles = {
    primary: "bg-blue-900 hover:bg-blue-800",
    secondary: "bg-gray-900 hover:bg-gray-800",
    danger: "bg-red-900 hover:bg-red-800",
  };  

  return (       
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props} />        
  );
};

export default Button;
