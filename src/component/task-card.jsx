import { useState } from "react";
import { useTasks } from "../store/task-context";
import TaskModal from "./task-modal";

const COLUMN_COLORS = {
  todo: "bg-blue-500",
  inProgress: "bg-yellow-400",
  done: "bg-green-500",
};

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-800/70 backdrop-blur-md rounded-xl p-4 mb-3 shadow-lg transition-transform duration-200 hover:scale-[1.03] cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-white text-lg">{task.title}</h4>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              COLUMN_COLORS[task.column]
            }`}
          >
            {task.column === "todo"
              ? "To Do"
              : task.column === "inProgress"
              ? "In Progress"
              : "Done"}
          </span>
        </div>

        <p className="text-sm text-zinc-300 mb-3 line-clamp-3">
          {task.description || "No description"}
        </p>

        <select
          value={task.column}
          onChange={(e) => updateTask(task.id, { column: e.target.value })}
          className="mt-2 w-full bg-zinc-700/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={() => setOpen(true)}
          className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition"
        >
          Edit Task
        </button>
      </div>

      {open && (
        <TaskModal
          taskData={task}
          onSave={(data) => updateTask(task.id, data)}
          onDelete={deleteTask}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
