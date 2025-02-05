import React, { useContext, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [errormessage, seterrormessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  const { login, signUpWithGmail } = useContext(AuthContext);
  const [isAdmin, isAdminLoading, refetch] = useAdmin();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then(() => {
        alert("Login successful");
        navigate(from, { replace: true });
        refetch();
      })
      .catch(() => {
        seterrormessage("Incorrect password or email");
      });
  };

  const handleGoogleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
        };
        axios.post("http://localhost:7781/users", userInfo).then(() => {});
        alert("Account login");
        navigate(from, { replace: true });
        refetch();
      })
      .catch(console.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
              {...register("email")}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
              {...register("password")}
            />
          </div>
          {errormessage && (
            <p className="text-red-500 text-sm">{errormessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green text-white rounded-lg">
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="p-2 bg-white border rounded-full"
            onClick={handleGoogleLogin}>
            <FaGoogle />
          </button>
          <button className="p-2 bg-white border rounded-full">
            <FaFacebook />
          </button>
          <button className="p-2 bg-white border rounded-full">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
