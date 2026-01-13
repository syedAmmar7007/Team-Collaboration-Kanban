import { useState } from "react";
import {
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfigure";
import { useAuth } from "../store/firebaseContext";

const InviteMember = () => {
  const { activeTeam } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const inviteUser = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      setMsg("User not found");
      return;
    }

    const userId = snap.docs[0].id;

    await updateDoc(doc(db, "teams", activeTeam.id), {
      members: [...activeTeam.members, userId],
    });

    setMsg("Member added");
    setEmail("");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded mt-6">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Invite by email"
        className="p-2 bg-zinc-700 text-white w-full"
      />
      <button onClick={inviteUser} className="mt-3 w-full bg-blue-600 py-2">
        Invite
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
};

export default InviteMember;
