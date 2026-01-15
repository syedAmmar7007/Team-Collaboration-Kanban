import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebaseConfigure";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./firebaseContext";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { activeTeam } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!activeTeam) return;

    const ref = collection(db, "teams", activeTeam.id, "tasks");
    const unsub = onSnapshot(ref, (snap) => {
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [activeTeam]);

  const addTask = async (task) => {
    await addDoc(collection(db, "teams", activeTeam.id, "tasks"), {
      ...task,
      column: "todo",
      createdAt: Date.now(),
    });
  };

  const updateTask = async (taskId, data) => {
    await updateDoc(doc(db, "teams", activeTeam.id, "tasks", taskId), data);
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "teams", activeTeam.id, "tasks", taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
