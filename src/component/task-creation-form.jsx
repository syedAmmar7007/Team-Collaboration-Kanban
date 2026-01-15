import { useState } from "react";

const CreateTaskModal = ({ onClose, onCreate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "low",
    deadline: "",
  });

  const handleSubmit = () => {
    if (!task.title.trim()) return;
    onCreate(task);
    onClose();
  };

  const PRIORITY_COLORS = {
    low: "bg-green-500",
    medium: "bg-yellow-400",
    high: "bg-red-500",
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 w-full max-w-md shadow-2xl border border-zinc-700">
        <h2 className="text-2xl font-bold mb-4 text-white text-center bg-linear-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg shadow-md">
          Create Task
        </h2>

        <input
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-3 mb-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-3 mb-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <input
          placeholder="Assignee Email"
          value={task.assignee}
          onChange={(e) => setTask({ ...task, assignee: e.target.value })}
          className="w-full p-3 mb-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="flex gap-3 mb-4">
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={task.deadline}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white bg-zinc-700 hover:bg-zinc-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-white bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
