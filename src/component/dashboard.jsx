import { useState } from "react";
import { useAuth } from "../store/firebaseContext";
import { useTasks } from "../store/task-context";
import CreateTeam from "./create-team";
import WorkspaceDashboard from "./work-space";
import InviteMember from "./invite-member";
import KanbanBoard from "./kanban-board";
import TaskModal from "./task-modal";

const Dashboard = () => {
  const { user, logout, activeTeam } = useAuth();
  const { addTask, updateTask, deleteTask } = useTasks();
  const [modalType, setModalType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = (task) => {
    addTask(task);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 w-full">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-extrabold  text-blue-400 tracking-wide">
          Your Workspaces
        </h1>
        <div className="flex items-center gap-4 bg-zinc-900/40 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-zinc-700">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white font-bold shadow-md">
            {user?.displayName
              ? user.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : user?.email[0].toUpperCase()}
          </div>

          <p className="text-white font-medium text-lg">
            {user?.displayName || user?.email}
          </p>

          <div className="flex-1"></div>

          <button
            onClick={logout}
            className="bg-transparent hover:bg-linear-to-r hover:from-red-500 hover:to-orange-400 text-red-500 hover:text-white transition px-5 py-2 rounded-lg shadow-lg border border-red-500 font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <CreateTeam />
        <WorkspaceDashboard />
      </div>

      {activeTeam && (
        <section className="bg-zinc-900/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 tracking-wide">
            Active Workspace: {activeTeam.name}
          </h2>

          <InviteMember />

          <div className="mt-4 mb-6">
            <button
              onClick={() => {
                setSelectedTask(null);
                setModalType("create");
              }}
              className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition text-white font-semibold px-5 py-3 rounded-xl shadow-lg"
            >
              + New Task
            </button>
          </div>

          <KanbanBoard
            onTaskClick={(task) => {
              setSelectedTask(task);
              setModalType("edit");
            }}
          />

          {modalType === "create" && (
            <TaskModal
              onClose={() => setModalType(null)}
              onSave={handleCreateTask}
            />
          )}
          {modalType === "edit" && selectedTask && (
            <TaskModal
              taskData={selectedTask}
              onClose={() => setModalType(null)}
              onSave={(updatedFields) =>
                updateTask(selectedTask.id, updatedFields)
              }
              onDelete={(id) => deleteTask(id)}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
