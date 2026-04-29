import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);
      navigate("/home");
    } catch (err) {
      console.log(err);
      console.log(err?.response);
      setError(err?.response?.data?.message);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@taskflow.com");
      setPassword("admin123");
    } else {
      setEmail("user@taskflow.com");
      setPassword("user123");
    }
    setError("");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Welcome to TaskFlow
          </h1>
          <form>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         transition"
                  value={email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  className="border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         transition"
                  value={password}
                  onChange={handleChange}
                  name="password"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {/* Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer mt-2 bg-blue-500 text-white py-2 rounded-md 
                       hover:bg-blue-600 transition duration-200 
                       shadow-sm hover:shadow-md"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
              Try Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className="cursor-pointer px-3 py-2 bg-purple-50 border border-purple-200 
                       rounded-md hover:bg-purple-100 transition text-sm"
              >
                <div className="font-medium text-purple-700">Admin</div>
                <div className="text-xs text-gray-500 mt-1">Full access</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("user")}
                className="cursor-pointer px-3 py-2 bg-green-50 border border-green-200 
                       rounded-md hover:bg-green-100 transition text-sm"
              >
                <div className="font-medium text-green-700">User</div>
                <div className="text-xs text-gray-500 mt-1">Limited access</div>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Click to auto-fill credentials, then submit
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
