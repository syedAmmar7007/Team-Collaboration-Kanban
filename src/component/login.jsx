// import { useState } from "react";
// import { useAuth } from "../store/firebaseContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-800 p-8 rounded-lg w-96 space-y-4"
//       >
//         <h2 className="text-white text-2xl font-bold">Login</h2>

//         <input
//           placeholder="Email"
//           className="w-full p-3 bg-zinc-700 text-white"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 bg-zinc-700 text-white"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-green-600 p-3 text-white rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useForm } from "react-hook-form";
import { useAuth } from "../store/firebaseContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppContent from "./app-content";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.code, error.message);

      let message = "Login failed. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Try again.";
          break;
        case "auth/invalid-email":
          message = "Email format is invalid.";
          break;
        case "auth/too-many-requests":
          message = "Too many login attempts. Try again later.";
          break;
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-md rounded-lg bg-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-700">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <AppContent />
    </div>
  );
};

export default Login;
