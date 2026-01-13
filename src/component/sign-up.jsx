// import { useState } from "react";
// import { useAuth } from "../store/firebaseContext";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const { signup } = useAuth();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(form.email, form.password, form.name);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-800 p-8 rounded-lg w-96 space-y-4"
//       >
//         <h2 className="text-white text-2xl font-bold">Signup</h2>

//         <input
//           placeholder="Name"
//           className="w-full p-3 bg-zinc-700 text-white"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           placeholder="Email"
//           className="w-full p-3 bg-zinc-700 text-white"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 bg-zinc-700 text-white"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="w-full bg-blue-600 p-3 text-white rounded">
//           Create Account
//         </button>
//       </form>
//       <h3>
//         if you have an account ? <Link to="/Login">Log In</Link>
//       </h3>
//     </div>
//   );
// };

// export default Signup;
import { useForm } from "react-hook-form";
import { useAuth } from "../store/firebaseContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  // const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password);
      // navigate("/user-profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
              <div className="w-full flex justify-center items-center flex-col gap-3">

      <h1 className="mb-4 text-center text-5xl font-semibold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <label className="font-normal py-1 text-gray-700">Email</label>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full px-3 py-3 mb-4 border rounded "
        />
        <label className="font-normal py-1 text-gray-700">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full px-3 py-3 mb-4 border rounded"
        />
        <label className="font-normal py-1 text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (v) => v === password || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          className="w-full px-3 py-3 mb-4 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 mt-1 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login">Log in</Link>
        </p>
        </div>
    </>
  );
};

export default SignUp;
