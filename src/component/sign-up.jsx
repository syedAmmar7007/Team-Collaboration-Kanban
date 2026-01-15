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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-black px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (v) => v === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
