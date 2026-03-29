import axios from "axios";
import { useEffect, useState } from "react";
import TaskPopupForm from "./TaskPopupForm";

const baseURL = import.meta.env.VITE_BASE_URL;

const DataOfUser = () => {
  const email = localStorage.getItem("email");
  const userName = email.split("@")[0];
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
      <div className="flex items-center gap-3 mt-2 mx-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {role}
          </span>
          <span className="text-sm text-gray-800 font-medium">{userName}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 py-6">
        {tasks &&
          tasks.map((val) => (
            <div
              key={val.id}
              className="w-full max-w-2xl bg-white shadow-md hover:shadow-lg transition rounded-xl border border-gray-200 p-5"
            >
              <div className="flex gap-2 mb-2">
                <span className="w-28 font-medium text-gray-600">Title:</span>
                <span className="flex-1 text-gray-900">{val.title}</span>
              </div>

              <div className="flex gap-2 mb-2">
                <span className="w-28 font-medium text-gray-600">
                  Description:
                </span>
                <span className="flex-1 text-gray-800">{val.description}</span>
              </div>

              <div className="flex gap-2 mb-2">
                <span className="w-28 font-medium text-gray-600">
                  Due Date:
                </span>
                <span className="flex-1 text-gray-800">{val.dueDate}</span>
              </div>

              <div className="flex gap-2 mb-4">
                <span className="w-28 font-medium text-gray-600">Status:</span>
                <span
                  className={`flex-1 font-medium ${
                    val.status === "DONE" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {val.status}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                {/* Toggle */}
                <button
                  onClick={() => handleToggle(val.id)}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
                >
                  {val.status === "DONE"
                    ? "Mark as Incomplete"
                    : "Mark as Complete"}
                </button>

                <button
                  onClick={() => handleDelete(val.id)}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center my-10">
        <button
          onClick={() => setPopup(true)}
          className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          +
        </button>
      </div>
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
