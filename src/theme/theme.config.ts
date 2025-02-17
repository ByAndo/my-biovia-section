type themeProps = {
    code : string,
    label : string,    
    color : string,
} 

export const themeOptions  : Array<themeProps> = [
    {code: "white-mode", label: "White Mode", color: "bg-white" },
    {code: "dark-mode", label: "Dark Mode", color: "bg-gray-800" },
]

export function getTheme(label : string) : themeProps | undefined {
    return themeOptions.find(theme => theme.label === label)
};
