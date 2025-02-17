export interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode; 
}

const RoundIconButton : React.FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button 
            {...props}        
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{             
                ...props.style,
                color: "var(--color-font)"
            }}
            onMouseEnter={(e) => 
                e.currentTarget.style.color = "var(--color-active)"
            }
            onMouseLeave={(e) => 
                e.currentTarget.style.color = "var(--color-font)"
            }
        >
            {children}
        </button>
    );
  };
  
  export default RoundIconButton;
  