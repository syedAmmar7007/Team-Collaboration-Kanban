import { useAuth } from "../store/firebaseContext";
import CreateTeam from "./create-team";
import WorkspaceDashboard from "./work-space";
import InviteMember from "./invite-member";

const Dashboard = () => {
  const { user, logout, activeTeam } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4 md:mb-0">
          Your Workspaces
        </h1>

        <div className="flex items-center gap-4">
          <p className="text-gray-300">Hello, {user?.email}</p>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Workspace Creation */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Create New Workspace
        </h2>
        <CreateTeam />
      </div>

      {/* Workspace List */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Your Workspaces
        </h2>
        <WorkspaceDashboard />
      </div>

      {/* Active Workspace */}
      {activeTeam && (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Active Workspace: {activeTeam.name}
          </h2>

          {/* Invite Members */}
          <InviteMember />

          {/* Kanban Board Placeholder */}
          <div className="mt-6 border-2 border-zinc-700 rounded-lg p-4">
            <p className="text-gray-400 text-center">
              Kanban Board will appear here for this workspace.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
