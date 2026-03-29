import { useEffect, useState } from "react";
import axios from "axios";
import AddUserPopup from "./AddUserPopup";
import AddTaskAdminPopup from "./AddTasksAdminPopup";
const baseURL = import.meta.env.VITE_BASE_URL;

const DataOfAdmin = () => {
  const email = localStorage.getItem("email");
  const userName = email.split("@")[0];
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
      <div className="flex items-center gap-3 mt-2 mx-4">
        {/* Role + Username */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {role}
          </span>
          <span className="text-sm text-gray-800 font-medium">{userName}</span>
        </div>

        <button
          onClick={handleAddUser}
          className="px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md 
               bg-green-500 text-white 
               hover:bg-green-600 transition shadow-sm"
        >
          + User
        </button>

        <button
          onClick={handleAddTask}
          className="px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md 
               bg-blue-500 text-white 
               hover:bg-blue-600 transition shadow-sm"
        >
          + Task
        </button>
      </div>
      <div className="text-center m-10 text-slate-800 text-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-left">{task.title}</td>

                    <td className="p-3 text-left">{task.userName}</td>

                    <td className="p-3 text-left text-gray-600">
                      {task.dueDate ? task.dueDate : "—"}
                    </td>

                    <td className="p-3 text-left">
                      {task.completed ? (
                        <span className="text-green-600 font-medium">Done</span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-left flex justify-center gap-2">
                      {/* Toggle */}
                      <button
                        onClick={() => handleToggle(task.id)}
                        className="cursor-pointer px-2 py-1 flex-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>

                      <button
                        onClick={() => handleEditTask(task)}
                        className="cursor-pointer px-2 py-1 flex-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(task.id)}
                        className=" cursor-pointer px-2 py-1 flex-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 m-6">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition
      ${
        page === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
      }
    `}
        >
          Prev
        </button>

        {/* Page Info */}
        <span className="text-sm text-gray-600">Page {page + 1}</span>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className={`px-4 py-1.5  rounded-md cursor-pointer text-sm font-medium transition
      ${
        page >= totalPages - 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
      }
    `}
        >
          Next
        </button>
      </div>
      {addUserPopup && <AddUserPopup setAddUserPopup={setAddUserPopup} />}
      {addTaskPopup && (
        <AddTaskAdminPopup
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
