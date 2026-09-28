import axios from "axios";
import { useState } from "react";
import { CheckIcon, UserIcon } from "./Icons";

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
      <div className="modal-backdrop">
        <div className="modal-panel">
          {/* Title */}
          <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500" />
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Create User</h2>
              <p className="text-xs text-slate-500">
                Invite a teammate to TaskFlow
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Name</label>
              <input
                name="name"
                placeholder="Jane Doe"
                onChange={handleUserChange}
                value={name}
                className="field focus:border-emerald-400 focus:ring-emerald-500/15"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Email</label>
              <input
                name="email"
                placeholder="jane@company.com"
                onChange={handleUserChange}
                value={email}
                className="field focus:border-emerald-400 focus:ring-emerald-500/15"
              />
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="alert-error mt-4 flex-col gap-1">
              {typeof error === "string" ? (
                <p>{error}</p>
              ) : (
                Object.entries(error).map(([key, value], index) => (
                  <p key={index}>
                    <span className="font-semibold capitalize">{key}</span>:{" "}
                    {value}
                  </p>
                ))
              )}
            </div>
          )}
          {/* Success Message  */}
          {success && (
            <p className="alert-success mt-4">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {success}
            </p>
          )}

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">
            {/* Cancel */}
            <button onClick={handleCloseUserPopup} className="btn-ghost">
              Cancel
            </button>

            {/* Create */}
            <button onClick={handleCreateUser} className="btn-success">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
