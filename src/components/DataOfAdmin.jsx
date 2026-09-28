import { useEffect, useState } from "react";
import axios from "axios";
import AddUserPopup from "./AddUserPopup";
import AddTaskAdminPopup from "./AddTasksAdminPopup";
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  InboxIcon,
  PlusIcon,
  TrashIcon,
  UndoIcon,
  UserIcon,
} from "./Icons";
const baseURL = import.meta.env.VITE_BASE_URL;

const DataOfAdmin = () => {
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("name") || email.split("@")[0];
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [tasks, setTasks] = useState("");
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [addTaskPopup, setAddTaskPopup] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [taskUserId, setTaskUserId] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/tasks?page=${page}&size=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data);
      setTasks(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`${baseURL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res);
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggle = (taskId) => {
    axios
      .patch(`${baseURL}/api/tasks/${taskId}/status`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleAddTask = () => {
    setAddTaskPopup(true);
    setIsEdit(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    fetchUsers();
  };

  const handleAddUser = () => {
    setAddUserPopup(true);
  };

  const handleEditTask = (task) => {
    setIsEdit(true);
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setTaskUserId(task.taskUserId);
    setAddTaskPopup(true);
    fetchUsers();
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up">
        <div>
          {/* Role + Username */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 py-1 pl-1 pr-3 shadow-sm backdrop-blur">
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-violet-600">
              {role}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {userName}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin{" "}
            <span className="bg-linear-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your team and keep every task on track.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleAddUser} className="btn-success">
            <UserIcon className="h-4 w-4" />
            Add User
          </button>

          <button onClick={handleAddTask} className="btn-primary">
            <PlusIcon className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      <div
        className="glass-card mt-8 overflow-hidden animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5 text-left font-semibold">Task</th>
                <th className="px-5 py-3.5 text-left font-semibold">User</th>
                <th className="px-5 py-3.5 text-left font-semibold">
                  Due Date
                </th>
                <th className="px-5 py-3.5 text-left font-semibold">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {tasks.length > 0 &&
                tasks.map((task, i) => (
                  <tr
                    key={task.id}
                    className="group transition-colors duration-200 hover:bg-indigo-50/40 animate-fade-up"
                    style={{ animationDelay: `${150 + i * 40}ms` }}
                  >
                    <td className="px-5 py-4 text-left">
                      <span
                        className={`font-semibold ${
                          task.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {task.title}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-left">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-fuchsia-400 text-xs font-bold uppercase text-white shadow-sm">
                          {task.userName ? task.userName.charAt(0) : "?"}
                        </span>
                        <span className="whitespace-nowrap text-slate-700">
                          {task.userName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-left">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-500">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {task.dueDate ? task.dueDate : "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-left">
                      {task.completed ? (
                        <span className="inline-flex min-w-22 items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Done
                        </span>
                      ) : (
                        <span className="inline-flex min-w-22 items-center justify-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-200">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle */}
                        <button
                          onClick={() => handleToggle(task.id)}
                          className={`inline-flex min-w-26 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                            task.completed
                              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 hover:bg-emerald-500 hover:text-white hover:ring-emerald-500"
                          }`}
                        >
                          {task.completed ? (
                            <UndoIcon className="h-3.5 w-3.5" />
                          ) : (
                            <CheckIcon className="h-3.5 w-3.5" />
                          )}
                          {task.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                          onClick={() => handleEditTask(task)}
                          title="Edit"
                          className="icon-btn text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <EditIcon className="h-4 w-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(task.id)}
                          title="Delete"
                          className="icon-btn text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {Array.isArray(tasks) && tasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                        <InboxIcon className="h-6 w-6" />
                      </div>
                      <p className="font-semibold text-slate-700">
                        No tasks yet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Assign a task to get started.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="btn-ghost py-2"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Prev
        </button>

        {/* Page Info */}
        <span className="rounded-xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
          Page <span className="font-bold text-slate-900">{page + 1}</span>
          <span className="text-slate-400"> / {totalPages || 1}</span>
        </span>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="btn-ghost py-2"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      {addUserPopup && <AddUserPopup setAddUserPopup={setAddUserPopup} />}
      {addTaskPopup && (
        <AddTaskAdminPopup
          fetchTasks={fetchTasks}
          title={title}
          description={description}
          dueDate={dueDate}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
          setAddTaskPopup={setAddTaskPopup}
          taskUserId={taskUserId}
          setTaskUserId={setTaskUserId}
          users={users}
          setTitle={setTitle}
          setDescription={setDescription}
          setDueDate={setDueDate}
        />
      )}
    </>
  );
};

export default DataOfAdmin;
