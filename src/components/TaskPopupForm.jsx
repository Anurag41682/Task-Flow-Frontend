import { useState } from "react";
import axios from "axios";
import { PlusIcon } from "./Icons";

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
    <div className="modal-backdrop">
      <div className="modal-panel">
        <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg">
            <PlusIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add Task</h2>
            <p className="text-xs text-slate-500">
              Plan something new for yourself
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="field-label">Title</label>
            <input
              name="title"
              placeholder="What needs to be done?"
              onChange={handleChange}
              value={title}
              className="field"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="field-label">Description</label>
            <textarea
              name="description"
              placeholder="Add a few details..."
              onChange={handleChange}
              value={description}
              rows={3}
              className="field resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="field-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={dueDate}
              className="field cursor-pointer"
            />
          </div>
        </form>

        <div className="mt-7 flex justify-end gap-3">
          <button onClick={handleClose} className="btn-ghost">
            Cancel
          </button>

          <button onClick={handleSubmit} className="btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopupForm;
