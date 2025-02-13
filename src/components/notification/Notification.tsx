import { FaBell } from "react-icons/fa";

const Notification = () => {
  return (
    <button className="relative">
      {/* 🔥 CSS 변수 활용하여 색상 적용 */}
      <FaBell className="text-xl" style={{ color: "var(--color-notification-icon)" }} />
      <span
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: "var(--color-notification-badge)" }}
      ></span>
    </button>
  );
};

export default Notification;
