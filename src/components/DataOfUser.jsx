import axios from "axios";
import { useEffect, useState } from "react";
import TaskPopupForm from "./TaskPopupForm";
import {
  CalendarIcon,
  CheckIcon,
  InboxIcon,
  PlusIcon,
  TrashIcon,
  UndoIcon,
} from "./Icons";

const baseURL = import.meta.env.VITE_BASE_URL;

const DataOfUser = () => {
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("name") || email.split("@")[0];
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [tasks, setTasks] = useState("");
  const [popup, setPopup] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get(`${baseURL}/api/tasks/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = (id) => {
    axios
      .patch(`${baseURL}/api/tasks/${id}/status`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchTasks();
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 py-1 pl-1 pr-3 shadow-sm backdrop-blur">
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-indigo-600">
              {role}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {userName}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Hey {userName},{" "}
            <span className="bg-linear-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              let's get things done
            </span>
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here's everything on your plate right now.
          </p>
        </div>
        <button
          onClick={() => setPopup(true)}
          className="btn-primary self-start sm:self-auto"
        >
          <PlusIcon className="h-4 w-4" />
          New Task
        </button>
      </div>

      {/* Stats */}
      {tasks && tasks.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              label: "Total",
              value: tasks.length,
              tone: "from-indigo-500 to-violet-500",
            },
            {
              label: "Done",
              value: tasks.filter((t) => t.status === "DONE").length,
              tone: "from-emerald-500 to-teal-500",
            },
            {
              label: "Pending",
              value: tasks.filter((t) => t.status !== "DONE").length,
              tone: "from-amber-500 to-orange-500",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-4 animate-fade-up"
              style={{ animationDelay: `${80 + i * 60}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p
                className={`mt-1 bg-linear-to-r ${stat.tone} bg-clip-text text-3xl font-extrabold text-transparent`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {tasks && tasks.length === 0 && (
        <div className="glass-card mt-8 flex flex-col items-center px-6 py-16 text-center animate-fade-up">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <InboxIcon className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No tasks yet</h3>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Create your first task to start tracking your progress.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {tasks &&
          tasks.map((val, i) => (
            <div
              key={val.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 animate-fade-up ${
                val.status === "DONE" ? "border-emerald-100" : "border-white/70"
              }`}
              style={{ animationDelay: `${150 + i * 60}ms` }}
            >
              {/* Accent bar */}
              <span
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r transition-all duration-500 ${
                  val.status === "DONE"
                    ? "from-emerald-400 to-teal-400"
                    : "from-indigo-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`text-lg font-semibold leading-snug transition-colors ${
                    val.status === "DONE"
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {val.title}
                </h3>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    val.status === "DONE"
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                      : "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      val.status === "DONE"
                        ? "bg-emerald-500"
                        : "animate-pulse bg-amber-500"
                    }`}
                  />
                  {val.status}
                </span>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {val.description}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CalendarIcon className="h-3.5 w-3.5" />
                {val.dueDate}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                {/* Toggle */}
                <button
                  onClick={() => handleToggle(val.id)}
                  className={
                    val.status === "DONE"
                      ? "btn-ghost py-2"
                      : "btn-success py-2"
                  }
                >
                  {val.status === "DONE" ? (
                    <UndoIcon className="h-4 w-4" />
                  ) : (
                    <CheckIcon className="h-4 w-4" />
                  )}
                  {val.status === "DONE"
                    ? "Mark as Incomplete"
                    : "Mark as Complete"}
                </button>

                <button
                  onClick={() => handleDelete(val.id)}
                  className="btn-danger py-2"
                  title="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Floating add button */}
      <button
        onClick={() => setPopup(true)}
        aria-label="Add task"
        className="fixed bottom-6 right-6 z-30 flex sm:hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-2xl shadow-indigo-500/40 transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95 animate-scale-in"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {popup && (
        <TaskPopupForm
          fetchTasks={fetchTasks}
          id={userId}
          setPopup={setPopup}
        />
      )}
    </>
  );
};

export default DataOfUser;
