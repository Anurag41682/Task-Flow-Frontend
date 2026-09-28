import { useEffect } from "react";
import DataOfUser from "./DataOfUser";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import DataOfAdmin from "./DataOfAdmin";
import Background from "./Background";

const Home = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        {role == "ROLE_USER" ? <DataOfUser /> : <DataOfAdmin />}
      </main>
    </>
  );
};

export default Home;
