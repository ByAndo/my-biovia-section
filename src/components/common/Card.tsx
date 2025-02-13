import { cn } from "@/utils/helpers";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  actions?: ReactNode; // 버튼 같은 액션 요소 추가 가능
  variant?: "default" | "outlined" | "elevated";
  className?: string;
}

const Card = ({ title, description, image, actions, variant = "default", className }: CardProps) => {
  const baseStyles = "p-4 rounded-lg transition-shadow";
  const variantStyles = {
    default: "bg-white shadow-md border border-gray-200",
    outlined: "bg-white border border-gray-400",
    elevated: "bg-white shadow-lg border border-gray-100",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg" />}
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
