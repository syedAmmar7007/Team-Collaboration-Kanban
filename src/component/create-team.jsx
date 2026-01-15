import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfigure";
import { useAuth } from "../store/firebaseContext";

const CreateTeam = () => {
  const { user } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const createTeam = async () => {
    if (!teamName.trim()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "teams"), {
        name: teamName,
        ownerId: user.uid,
        members: [user.uid],
        createdAt: serverTimestamp(),
      });
      setTeamName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/70 backdrop-blur-md rounded-2xl p-5 shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Create New Workspace
      </h2>

      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Workspace name"
        className="w-full p-3 mb-4 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
      />

      <button
        onClick={createTeam}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300
          ${
            loading
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500"
          }`}
      >
        {loading ? "Creating..." : "Create Workspace"}
      </button>
    </div>
  );
};

export default CreateTeam;
