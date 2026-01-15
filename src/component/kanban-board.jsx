import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../store/task-context";
import TaskCard from "./task-card";

const columns = [
  { id: "todo", title: "To Do", color: "from-blue-500 to-blue-400" },
  {
    id: "inProgress",
    title: "In Progress",
    color: "from-yellow-500 to-yellow-400",
  },
  { id: "done", title: "Done", color: "from-green-500 to-green-400" },
];

const KanbanBoard = () => {
  const { tasks, updateTask } = useTasks();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    updateTask(result.draggableId, {
      column: result.destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-zinc-900 rounded-2xl p-4 min-h-96 flex flex-col"
              >
                <h3
                  className={`font-bold text-white text-lg mb-4 py-2 px-3 rounded-lg bg-linear-to-r ${col.color} shadow-md`}
                >
                  {col.title}
                </h3>

                <div className="flex flex-col gap-3 flex-1">
                  {tasks
                    .filter((t) => t.column === col.id)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(p, snapshot) => (
                          <div
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            className={`transition-transform duration-200 ${
                              snapshot.isDragging ? "scale-105 shadow-2xl" : ""
                            }`}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
