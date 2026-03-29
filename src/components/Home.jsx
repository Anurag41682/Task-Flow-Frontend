import { useEffect } from "react";
import DataOfUser from "./DataOfUser";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import DataOfAdmin from "./DataOfAdmin";

const Home = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Navbar />
      {role == "ROLE_USER" ? <DataOfUser /> : <DataOfAdmin />}
    </>
  );
};

export default Home;
