import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfigure";
import { useAuth } from "../store/firebaseContext";

const CreateTeam = () => {
  const { user } = useAuth();
  const [teamName, setTeamName] = useState("");

  const createTeam = async () => {
    if (!teamName.trim()) return;

    await addDoc(collection(db, "teams"), {
      name: teamName,
      ownerId: user.uid,
      members: [user.uid],
      createdAt: Date.now(),
    });

    setTeamName("");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded">
      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Workspace name"
        className="p-2 bg-zinc-700 text-white w-full"
      />
      <button onClick={createTeam} className="mt-3 w-full bg-emerald-600 py-2">
        Create Workspace
      </button>
    </div>
  );
};

export default CreateTeam;
