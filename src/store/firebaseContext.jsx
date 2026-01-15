import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig/firebaseConfigure";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);

  const signup = async (email, password, name = "") => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(res.user, { displayName: name });
    }
    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      email: res.user.email,
      name,
      createdAt: Date.now(),
    });

    return res;
  };
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const createTeam = async (name) => {
    if (!user || !name.trim()) return;

    const docRef = await addDoc(collection(db, "teams"), {
      name,
      ownerId: user.uid,
      members: [user.uid],
      createdAt: Date.now(),
    });
    useEffect(() => {
      if (user && activeTeam) {
        const role = activeTeam.members?.[user.uid];
        setUserRole(role);
      }
    }, [user, activeTeam]);
    fetchTeams();
    setActiveTeam({
      id: docRef.id,
      name,
      ownerId: user.uid,
      members: [user.uid],
    });
  };

  const fetchTeams = async () => {
    if (!user) return;
    const q = query(
      collection(db, "teams"),
      where("members", "array-contains", user.uid)
    );
    const snap = await getDocs(q);
    const tms = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTeams(tms);
    if (!activeTeam && tms.length) setActiveTeam(tms[0]);
  };

  const inviteMember = async (teamId, email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("User not found");

    const userId = snap.docs[0].id;
    const teamRef = doc(db, "teams", teamId);
    const teamData = teams.find((t) => t.id === teamId);
    if (teamData.members.includes(userId))
      throw new Error("User already a member");

    await updateDoc(teamRef, { members: [...teamData.members, userId] });
    fetchTeams();
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) fetchTeams();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        teams,
        activeTeam,
        setActiveTeam,
        createTeam,
        inviteMember,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
