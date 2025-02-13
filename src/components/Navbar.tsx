import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link to="/">홈</Link>
      <Link to="/dashboard">대시보드</Link>
      <Link to="/experiments">실험 관리</Link>
      <Link to="/login">로그인</Link>
    </nav>
  );
};

export default Navbar;
