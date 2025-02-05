import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  const axiosPublic = useAxiosPublic;
  const {
    createUser,
    updateUserProfile,
    signUpWithGmail,
    login,
    logout,
    loading,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const onsubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(user, data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.email,
            email: data.email,
          };
          axios
            .post("http://localhost:7781/users", userInfo)
            .then((response) => {
              alert("account created");
              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0 text-black">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onsubmit)}>
          <h3 className="font-bold text-lg">Create a Account!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-white text-gray-600"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-white"
              required
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link text-black link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2">
            Have an account?
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-red underline">
              Login
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </Link>
        </form>
        <div className="text-center space-x-3 border-white mb-2 text-black">
          <button className="btn btn-circle text-black hover:bg-white bg-white">
            <FaGoogle className=""></FaGoogle>
          </button>
          <button className="btn btn-circle text-black hover:bg-white bg-white">
            <FaFacebook className=""></FaFacebook>
          </button>
          <button className="btn btn-circle text-black hover:bg-white bg-white">
            <FaGithub className=""></FaGithub>
          </button>
        </div>
      </div>
      <Modal></Modal>
    </div>
  );
};

export default Signup;
