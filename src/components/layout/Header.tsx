import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setTheme } from "@/redux/slices/themeSlice";
import { themeOptions } from "@/theme/theme.config";
import UtilityBar from "./UtilityBar"; // ✅ 추가
import DropDown from "../common/dropdown/DropDown";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark-mode") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <header className="shadow-md p-3 flex justify-between items-center bg-[var(--color-header)] text-[var(--color-text)]">
      <button onClick={toggleSidebar} className="p-1 rounded-md text-sm bg-[var(--color-button)]">
        ☰
      </button>
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <DropDown options={themeOptions} selected={theme} onChange={handleThemeChange} />
        <UtilityBar /> {/* ✅ 유저 메뉴 추가 */}
      </div>
    </header>
  );
};

export default Header;
