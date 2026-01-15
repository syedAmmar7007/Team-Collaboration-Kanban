import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfigure";
import { useAuth } from "../store/firebaseContext";
import { FaUsers } from "react-icons/fa";

const WorkspaceDashboard = () => {
  const { user, setActiveTeam, activeTeam } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "teams"),
      where("members", "array-contains", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const tms = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTeams(tms);

      if (tms.length > 0) setActiveTeam((prev) => prev || tms[0]);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {teams.map((team) => {
        const isActive = activeTeam?.id === team.id;

        return (
          <div
            key={team.id}
            onClick={() => setActiveTeam(team)}
            className={`relative cursor-pointer rounded-xl p-6 transition-transform duration-300
                        shadow-lg hover:scale-105
                        ${
                          isActive
                            ? "bg-linear-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-zinc-800 text-zinc-100"
                        }
                        `}
          >
            {isActive && (
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            )}
            <h3 className="text-xl font-extrabold mb-2">{team.name}</h3>
            <p className="flex items-center gap-2 text-sm text-zinc-300">
              <FaUsers /> {team.members?.length || 0} Members
            </p>

            {team.description && (
              <p className="mt-3 text-sm text-zinc-400 line-clamp-2">
                {team.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkspaceDashboard;
