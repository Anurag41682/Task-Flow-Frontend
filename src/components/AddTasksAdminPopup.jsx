import axios from "axios";
import { useState } from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

const AddTaskAdminPopup = ({
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
        await axios.patch(`${baseURL}/api/tasks/${editTaskId}`, {
          title,
          description,
          dueDate,
          userId: taskUserId,
        });
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          {/* Dynamic Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            {isEdit ? "Edit Task" : "Assign Task"}
          </h2>

          <form className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Title</label>
              <input
                name="title"
                value={title}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Due Date (already good 👍) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* User Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Assign To</label>
              <select
                name="userId"
                value={taskUserId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Messages */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-md text-sm font-medium 
                   bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={success}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white
        ${
          success
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-600"
        }`}
            >
              {success ? "Saved" : isEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskAdminPopup;
