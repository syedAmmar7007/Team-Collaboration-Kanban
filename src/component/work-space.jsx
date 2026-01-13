import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfigure";
import { useAuth } from "../store/firebaseContext";

const WorkspaceDashboard = () => {
  const { user, setActiveTeam } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "teams"),
      where("members", "array-contains", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setTeams(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => setActiveTeam(team)}
          className="cursor-pointer bg-zinc-800 p-4 rounded hover:bg-zinc-700"
        >
          <h3 className="text-lg font-bold">{team.name}</h3>
          <p className="text-sm text-zinc-400">
            Members: {team.members.length}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceDashboard;
