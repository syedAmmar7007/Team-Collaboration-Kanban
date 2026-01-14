// import { useState } from "react";
// import {
//   doc,
//   getDocs,
//   updateDoc,
//   query,
//   where,
//   collection,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig/firebaseConfigure";
// import { useAuth } from "../store/firebaseContext";

// const InviteMember = () => {
//   const { activeTeam } = useAuth();
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const inviteUser = async () => {
//     if (!email.trim()) return;
//     setLoading(true);
//     setMsg("");

//     try {
//       // Check if user exists
//       const q = query(collection(db, "users"), where("email", "==", email));
//       const snap = await getDocs(q);

//       if (snap.empty) {
//         setMsg("User not found");
//         setLoading(false);
//         return;
//       }

//       const userId = snap.docs[0].id;

//       // Prevent duplicate invites
//       if (activeTeam.members.includes(userId)) {
//         setMsg("User is already a member");
//         setLoading(false);
//         return;
//       }

//       // Update team members
//       await updateDoc(doc(db, "teams", activeTeam.id), {
//         members: [...activeTeam.members, userId],
//       });

//       setMsg("Member added successfully ✅");
//       setEmail("");
//     } catch (error) {
//       console.error(error);
//       setMsg("Failed to add member ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-zinc-800 p-4 rounded mt-6">
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Invite by email"
//         className="p-2 bg-zinc-700 text-white w-full rounded outline-none"
//       />
//       <button
//         onClick={inviteUser}
//         disabled={loading}
//         className={`mt-3 w-full py-2 rounded ${
//           loading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Inviting..." : "Invite"}
//       </button>

//       {msg && (
//         <p
//           className={`text-sm mt-2 ${
//             msg.includes("success") ? "text-green-400" : "text-red-400"
//           }`}
//         >
//           {msg}
//         </p>
//       )}
//     </div>
//   );
// };

// export default InviteMember;
import { useState } from "react";
import { useAuth } from "../store/firebaseContext";

const InviteMember = () => {
  const { activeTeam, inviteMember } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleInvite = async () => {
    try {
      await inviteMember(activeTeam.id, email);
      setMsg("Member added successfully!");
      setEmail("");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded mt-6">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Invite by email"
        className="p-2 bg-zinc-700 text-white w-full"
      />
      <button onClick={handleInvite} className="mt-3 w-full bg-blue-600 py-2">
        Invite
      </button>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
};

export default InviteMember;
