import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/firebaseContext";
import Login from "./component/login";
import SignUp from "./component/sign-up";
import Dashboard from "./component/dashboard";
import ProtectedRoute from "./component/protected-routes";
import "./App.css"
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="flex justify-center items-center w-70%">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Container>
  );
}

export default App;
