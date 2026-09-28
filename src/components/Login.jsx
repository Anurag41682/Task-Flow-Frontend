import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "./Background";
import {
  AlertIcon,
  LockIcon,
  LogoIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
} from "./Icons";

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
      localStorage.setItem("name", res.data.name ?? "");
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
      <Background />
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 flex flex-col items-center text-center animate-fade-up">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-xl shadow-indigo-500/30">
              <LogoIcon className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome to{" "}
              <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient">
                TaskFlow
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to organize, assign and ship your tasks.
            </p>
          </div>

          <div
            className="glass-card p-6 sm:p-8 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <form>
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="field-label">Email</label>
                  <div className="relative">
                    <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      className="field pl-10"
                      placeholder="you@company.com"
                      value={email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="field-label">Password</label>
                  <div className="relative">
                    <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      className="field pl-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                </div>
                {error && (
                  <p key={error} className="alert-error">
                    <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    {error}
                  </p>
                )}
                {/* Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary mt-1 w-full py-3"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* Demo Credentials Section */}
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Try Demo Accounts
                </p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("admin")}
                  className="group cursor-pointer rounded-xl border border-violet-200 bg-violet-50/70 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <ShieldIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-violet-700">
                      Admin
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-slate-500">
                    Full access
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("user")}
                  className="group cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <UserIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-emerald-700">
                      User
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-slate-500">
                    Limited access
                  </div>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">
                Click to auto-fill credentials, then sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
