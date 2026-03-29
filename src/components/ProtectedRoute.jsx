import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const isTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    // checks expiry
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login"></Navigate>;
};

export default ProtectedRoute;
