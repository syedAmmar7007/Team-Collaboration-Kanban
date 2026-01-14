import { useState } from "react";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Market research" },
      { id: "2", content: "Build project" },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [{ id: "3", content: "Practice" }],
  },
  done: {
    name: "Done",
    items: [
      { id: "4", content: "Complete project" },
      { id: "5", content: "Home stuff" },
    ],
  },
};

const columnStyles = {
  todo: {
    header: "bg-gradient-to-r from-blue-600 to-blue-400",
    border: "border-blue-400",
  },
  inProgress: {
    header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    border: "border-yellow-400",
  },
  done: {
    header: "bg-gradient-to-r from-green-600 to-green-400",
    border: "border-green-400",
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [dragItem, setDragItem] = useState(null);

  /* ---------------- ADD TASK ---------------- */
  const addNewTask = () => {
    if (!newTask.trim()) return;

    setColumns((prev) => ({
      ...prev,
      [activeColumn]: {
        ...prev[activeColumn],
        items: [
          ...prev[activeColumn].items,
          { id: Date.now().toString(), content: newTask },
        ],
      },
    }));

    setNewTask("");
  };

  /* ---------------- REMOVE TASK ---------------- */
  const removeTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  /* ---------------- DRAG & DROP ---------------- */
  const handleDragStart = (columnId, item) => {
    setDragItem({ sourceColumnId: columnId, item });
  };

  const handleDrop = (event, targetColumnId) => {
    event.preventDefault();
    if (!dragItem) return;

    const { sourceColumnId, item } = dragItem;
    if (sourceColumnId === targetColumnId) return;

    setColumns((prev) => {
      const sourceItems = prev[sourceColumnId].items.filter(
        (i) => i.id !== item.id
      );
      const targetItems = [...prev[targetColumnId].items, item];

      return {
        ...prev,
        [sourceColumnId]: {
          ...prev[sourceColumnId],
          items: sourceItems,
        },
        [targetColumnId]: {
          ...prev[targetColumnId],
          items: targetItems,
        },
      };
    });

    setDragItem(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-900 to-zinc-800 px-3 sm:px-6 py-6 flex">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-10 sm:gap-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-rose-400 text-center">
          Team Collaboration Board
        </h1>

        {/* INPUT */}
        <div className="flex flex-col sm:flex-row w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
            placeholder="Add new task..."
            className="flex-1 p-3 bg-zinc-700 text-white outline-none"
          />

          <select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            className="p-3 bg-zinc-700 text-white sm:border-l border-zinc-600"
          >
            {Object.keys(columns).map((id) => (
              <option key={id} value={id}>
                {columns[id].name}
              </option>
            ))}
          </select>

          <button
            onClick={addNewTask}
            className="px-6 bg-linear-to-r from-yellow-600 to-amber-500 text-white"
          >
            Add
          </button>
        </div>

        {/* COLUMNS */}
        <div className="flex gap-6 w-full overflow-x-auto">
          {Object.keys(columns).map((columnId) => (
            <div
              key={columnId}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, columnId)}
              className={`min-w-70 sm:min-w-[320px] lg:min-w-90 shrink-0 bg-zinc-800 rounded-lg border-t-4 ${columnStyles[columnId].border}`}
            >
              <div
                className={`p-4 font-bold text-white flex justify-between ${columnStyles[columnId].header}`}
              >
                {columns[columnId].name}
                <span className="bg-zinc-800 px-2 rounded-full text-sm">
                  {columns[columnId].items.length}
                </span>
              </div>

              <div className="p-3 min-h-50">
                {columns[columnId].items.length === 0 ? (
                  <p className="text-center text-zinc-500 py-10">
                    Drop task here
                  </p>
                ) : (
                  columns[columnId].items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(columnId, item)}
                      className="bg-zinc-700 text-white p-4 mb-3 rounded-lg flex justify-between cursor-move touch-manipulation"
                    >
                      {item.content}
                      <button
                        onClick={() => removeTask(columnId, item.id)}
                        className="text-red-400 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
