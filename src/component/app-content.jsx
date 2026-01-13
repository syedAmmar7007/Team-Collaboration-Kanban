import { useAuth } from "../store/firebaseContext";
import SignUp from "./sign-up";

const AppContent = () => {
  const { user, logout } = useAuth();

  if (!user) return <SignUp />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl">Welcome 🎉</h1>
      <button onClick={logout} className="mt-4 bg-red-600 px-4 py-2">
        Logout
      </button>
    </div>
  );
};

export default AppContent;
