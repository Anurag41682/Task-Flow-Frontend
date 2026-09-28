import axios from "axios";
import { useState } from "react";
import { AlertIcon, CheckIcon, EditIcon, PlusIcon } from "./Icons";

const baseURL = import.meta.env.VITE_BASE_URL;

const AddTaskAdminPopup = ({
  fetchTasks,
  setAddTaskPopup,
  users,
  taskUserId,
  setTaskUserId,
  isEdit,
  title,
  description,
  dueDate,
  setIsEdit,
  editTaskId,
  setEditTaskId,
  setTitle,
  setDescription,
  setDueDate,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "dueDate") setDueDate(value);
    if (name === "userId") setTaskUserId(value);
  };

  const handleClose = () => {
    setAddTaskPopup(false);
  };
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.patch(
          `${baseURL}/api/tasks/${editTaskId}`,
          {
            title,
            description,
            dueDate,
            userId: taskUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        fetchTasks();
        setSuccess("Task updated!");
        setError("");
        setTimeout(() => {
          setAddTaskPopup(false);
        }, 1500);
      } else {
        await axios.post(
          `${baseURL}/api/tasks`,
          {
            title,
            description,
            dueDate,
            userId: taskUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        fetchTasks();
        setSuccess("Task created!");
        setError("");
        setTimeout(() => {
          setAddTaskPopup(false);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-panel">
          {/* Dynamic Title */}
          <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg">
              {isEdit ? (
                <EditIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isEdit ? "Edit Task" : "Assign Task"}
              </h2>
              <p className="text-xs text-slate-500">
                {isEdit
                  ? "Update the task details"
                  : "Create and assign a task to a teammate"}
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Title</label>
              <input
                name="title"
                placeholder="What needs to be done?"
                value={title}
                onChange={handleChange}
                className="field"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Description</label>
              <textarea
                name="description"
                placeholder="Add a few details..."
                value={description}
                onChange={handleChange}
                rows={3}
                className="field resize-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Due Date */}
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleChange}
                  className="field cursor-pointer"
                />
              </div>

              {/* User Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Assign To</label>
                <select
                  name="userId"
                  value={taskUserId}
                  onChange={handleChange}
                  className="field cursor-pointer"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          {/* Messages */}
          {error && (
            <p className="alert-error mt-4">
              <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}
          {success && (
            <p className="alert-success mt-4">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {success}
            </p>
          )}

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">
            <button onClick={handleClose} className="btn-ghost">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={success}
              className="btn-primary min-w-32"
            >
              {success && <CheckIcon className="h-4 w-4" />}
              {success ? "Saved" : isEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskAdminPopup;
