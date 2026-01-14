import { useForm } from "react-hook-form";
import { useAuth } from "../store/firebaseContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.name);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-3">
      <h1 className="mb-4 text-center text-5xl font-semibold">Sign Up</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl shadow-md w-full max-w-md"
      >
        {/* NAME */}
        <label className="py-1 text-gray-700">Name</label>
        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="w-full px-3 py-3 mb-4 border rounded"
        />

        {/* EMAIL */}
        <label className="py-1 text-gray-700">Email</label>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full px-3 py-3 mb-4 border rounded"
        />

        {/* PASSWORD */}
        <label className="py-1 text-gray-700">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full px-3 py-3 mb-4 border rounded"
        />

        {/* CONFIRM */}
        <label className="py-1 text-gray-700">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (v) => v === password || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          className="w-full px-3 py-3 mb-4 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
