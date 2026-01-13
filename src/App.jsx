import { AuthProvider, useAuth } from "./store/firebaseContext";
import Login from "./component/login";
import SignUp from "./component/sign-up";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css"



function App() {
  return (
    <AuthProvider>
      <Container className=" flex justify-center items-center">
        <div className="w-200">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
