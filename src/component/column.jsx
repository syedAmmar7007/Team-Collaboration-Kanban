import { Draggable } from "@hello-pangea/dnd";
import ColumnHeader from "./column-header";
import TaskCard from "./task-card";

const COLUMN_TITLES = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

const COLUMN_COLORS = {
  todo: "from-blue-500 to-blue-400",
  inProgress: "from-yellow-500 to-yellow-400",
  done: "from-green-500 to-green-400",
};

const Column = ({ columnId, tasks = [], onTaskClick }) => {
  return (
    <div className="bg-zinc-900/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4 shadow-xl min-h-112">
      <ColumnHeader
        title={COLUMN_TITLES[columnId]}
        count={tasks.length}
        gradient={COLUMN_COLORS[columnId]}
      />

      {tasks.length === 0 ? (
        <p className="text-zinc-500 text-center py-10 animate-pulse">
          No tasks
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`transition-transform duration-200 ${
                    snapshot.isDragging ? "scale-105 shadow-2xl" : ""
                  }`}
                >
                  <TaskCard
                    task={task}
                    onClick={() => onTaskClick(task)}
                    className="hover:scale-[1.02] transition-transform duration-200"
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </div>
  );
};

export default Column;
