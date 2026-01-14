// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig/firebaseConfigure";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [teams, setTeams] = useState([]);
//   const [activeTeam, setActiveTeam] = useState(null);

//   const signup = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);

//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const logout = () => signOut(auth);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const createTeam = async (name) => {
//     if (!user || !name.trim()) return;

//     await addDoc(collection(db, "teams"), {
//       name,
//       ownerId: user.uid,
//       members: [user.uid],
//       createdAt: Date.now(),
//     });

//     fetchTeams();
//   };

//   const fetchTeams = async () => {
//     if (!user) return;

//     const q = query(
//       collection(db, "teams"),
//       where("members", "array-contains", user.uid)
//     );

//     const snapshot = await getDocs(q);
//     setTeams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, [user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signup,
//         login,
//         logout,
//         teams,
//         activeTeam,
//         setActiveTeam,
//         createTeam,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig/firebaseConfigure";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

  // Auth functions

const signup = async (email, password, name = "") => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // 🔥 Create user in Firestore (VERY IMPORTANT)
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

  // Team functions
  const createTeam = async (name) => {
    if (!user || !name.trim()) return;

    const docRef = await addDoc(collection(db, "teams"), {
      name,
      ownerId: user.uid,
      members: [user.uid],
      createdAt: Date.now(),
    });

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
