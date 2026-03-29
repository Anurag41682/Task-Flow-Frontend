import { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const TaskPopupForm = (prop) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const userId = prop.id;

  const handleSubmit = () => {
    axios
      .post(
        `${baseURL}/api/tasks`,
        {
          title,
          description,
          dueDate,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        console.log(res);
        prop.fetchTasks();
        prop.setPopup(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "description") {
      setDescription(e.target.value);
    } else {
      setDueDate(e.target.value);
    }
  };

  const handleClose = () => {
    prop.setPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Add Task
        </h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={title}
              className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={description}
              rows={3}
              className="border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={dueDate}
              className="cursor-pointer border border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     transition"
            />
          </div>
        </form>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 cursor-pointer py-2 rounded-md text-sm font-medium 
                   bg-gray-200 text-gray-700 
                   hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 cursor-pointer rounded-md text-sm font-medium 
                   bg-blue-500 text-white 
                   hover:bg-blue-600 transition shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopupForm;
