import { AuthProvider } from "./store/firebaseContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/sign-up";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import "./App.css";
import { TaskProvider } from "./store/task-context";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
