import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      <div className=" flex  items-center justify-between bg-sky-200 p-3 border-b-1 border-sky-400">
        <h1 className="text-xl text-zinc-700">TaskFlow</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md text-sm font-medium 
             text-white bg-red-500 
             hover:bg-red-600 
             transition-all duration-200 ease-in-out 
             shadow-sm hover:shadow-md cursor-pointer"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
