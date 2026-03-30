import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    axios
      .post(`${baseURL}/api/auth/set-password?token=${token}`, {
        newPassword: password,
      })
      .then((res) => {
        console.log(res);
        setError("");
        setSuccess("Password created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
          {/* Title */}
          <h1 className="text-xl font-semibold text-center text-gray-800 mb-2">
            Set Your Password
          </h1>

          <p className="text-sm text-gray-500 text-center mb-6">
            Create a secure password to activate your account
          </p>
          <form className="flex flex-col gap-4">
            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={`border rounded-md px-3 py-2 outline-none
        ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-400"
            : "border-gray-300 focus:ring-2 focus:ring-blue-400"
        }`}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Success Message  */}
            {success && (
              <p className="text-sm text-green-600 w-full text-left">
                {success}
              </p>
            )}

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-2 bg-blue-500 text-white py-2 rounded-md 
               hover:bg-blue-600 transition"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
