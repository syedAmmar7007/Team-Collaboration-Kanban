import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig/firebaseConfigure";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const createTeam = async (name) => {
    if (!user || !name.trim()) return;

    await addDoc(collection(db, "teams"), {
      name,
      ownerId: user.uid,
      members: [user.uid],
      createdAt: Date.now(),
    });

    fetchTeams();
  };

  const fetchTeams = async () => {
    if (!user) return;

    const q = query(
      collection(db, "teams"),
      where("members", "array-contains", user.uid)
    );

    const snapshot = await getDocs(q);
    setTeams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTeams();
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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
