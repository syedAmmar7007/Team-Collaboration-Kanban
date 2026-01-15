import { useState } from "react";
import { useAuth } from "../store/firebaseContext";
import { FaEnvelope } from "react-icons/fa";

const InviteMember = () => {
  const { activeTeam, inviteMember } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      setMsg("Please enter an email!");
      return;
    }

    setLoading(true);
    try {
      await inviteMember(activeTeam.id, email);
      setMsg("✅ Member added successfully!");
      setEmail("");
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 rounded-2xl bg-zinc-900/70 backdrop-blur-md shadow-xl border border-zinc-700 mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Invite Team Member</h2>

      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="w-full pl-10 p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        onClick={handleInvite}
        disabled={loading}
        className={`mt-4 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300
          ${
            loading
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
          }`}
      >
        {loading ? "Inviting..." : "Invite"}
      </button>

      {msg && (
        <p
          className={`mt-3 text-sm transition-opacity duration-500 ${
            msg.includes("❌") ? "text-red-400" : "text-green-400"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
};

export default InviteMember;
