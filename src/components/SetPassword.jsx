import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "./Background";
import { AlertIcon, CheckIcon, LockIcon } from "./Icons";

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
      <Background />
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="glass-card p-6 sm:p-8 animate-fade-up">
            {/* Title */}
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
                <LockIcon className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Set Your Password
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Create a secure password to activate your account
              </p>
            </div>

            <form className="flex flex-col gap-5">
              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handleChange}
                  className="field"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleChange}
                  className={`field ${
                    error
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/15"
                      : ""
                  }`}
                />
              </div>

              {/* Error Message */}
              {error && (
                <p key={error} className="alert-error">
                  <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </p>
              )}
              {/* Success Message  */}
              {success && (
                <p className="alert-success">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {success}
                </p>
              )}

              {/* Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary mt-1 w-full py-3"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
