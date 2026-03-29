import axios from "axios";
import { useState } from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

const AddUser = ({ setAddUserPopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
  };

  const handleCloseUserPopup = () => {
    setAddUserPopup(false);
  };
  const handleCreateUser = () => {
    axios
      .post(
        `${baseURL}/api/users`,
        { name, email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setAddUserPopup(false);
        }, 2000);
        setError("");
        setSuccess("User Initialized");
      })
      .catch((err) => {
        console.log(err.response);
        const data = err.response?.data;
        setError(data);
      });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Create User
          </h2>

          <form className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Name</label>
              <input
                name="name"
                onChange={handleUserChange}
                value={name}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-green-400 
                     transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                onChange={handleUserChange}
                value={email}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-green-400 
                     transition"
              />
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-500">
              {typeof error === "string" ? (
                <p>{error}</p>
              ) : (
                Object.entries(error).map(([key, value], index) => (
                  <p key={index}>
                    <span className="font-medium">{key}</span>: {value}
                  </p>
                ))
              )}
            </div>
          )}
          {/* Success Message  */}
          {success && (
            <p className="text-sm text-green-600 w-full text-left">{success}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            {/* Cancel */}
            <button
              onClick={handleCloseUserPopup}
              className="px-4 cursor-pointer py-2 rounded-md text-sm font-medium 
                   bg-gray-200 text-gray-700 
                   hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            {/* Create */}
            <button
              onClick={handleCreateUser}
              className="px-4 cursor-pointer py-2 rounded-md text-sm font-medium 
                   bg-green-500 text-white 
                   hover:bg-green-600 transition shadow-sm"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
