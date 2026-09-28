import { useNavigate } from "react-router-dom";
import { LogoIcon, LogoutIcon } from "./Icons";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/60 backdrop-blur-xl animate-fade-in">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
              <LogoIcon className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              Task
              <span className="bg-linear-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                Flow
              </span>
            </h1>
          </div>
          <button onClick={handleLogout} className="btn-danger group py-2">
            <LogoutIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
