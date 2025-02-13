type themeProps = {
    label : string,
    value : string,
    color : string,
} 

export const themeOptions  : Array<themeProps> = [
    { label: "White Mode", value: "white-mode", color: "bg-white" },
    { label: "Dark Mode", value: "dark-mode", color: "bg-gray-800" },
]

export function getTheme(label : string) : themeProps | undefined {
    return themeOptions.find(theme => theme.label === label)
};
