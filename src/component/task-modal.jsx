import { useState, useEffect } from "react";

const TaskModal = ({ taskData, onSave, onDelete, onClose }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "low",
    deadline: "",
  });

  useEffect(() => {
    if (taskData) {
      setTask({
        title: taskData.title || "",
        description: taskData.description || "",
        assignee: taskData.assignee || "",
        priority: taskData.priority || "low",
        deadline: taskData.deadline || "",
      });
    }
  }, [taskData]);

  const save = () => {
    if (!task.title.trim()) return;

    onSave({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      priority: task.priority,
      deadline: task.deadline,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          {taskData ? "Edit Task" : "Create Task"}
        </h2>

        <input
          className="w-full mb-2 p-2 bg-zinc-700 text-white"
          value={task.title}
          placeholder="Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <textarea
          className="w-full mb-2 p-2 bg-zinc-700 text-white"
          value={task.description}
          placeholder="Description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <input
          className="w-full mb-2 p-2 bg-zinc-700 text-white"
          value={task.assignee}
          placeholder="Assignee"
          onChange={(e) => setTask({ ...task, assignee: e.target.value })}
        />

        <select
          className="w-full mb-2 p-2 bg-zinc-700 text-white"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="w-full mb-4 p-2 bg-zinc-700 text-white"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        <div className="flex justify-between items-center gap-2">
          {taskData && (
            <button
              onClick={() => {
                onDelete(taskData.id);
                onClose();
              }}
              className="bg-red-600 px-3 py-1 rounded text-white"
            >
              Delete
            </button>
          )}

          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded border border-zinc-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="bg-blue-600 px-3 py-1 rounded text-white"
            >
              {taskData ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
