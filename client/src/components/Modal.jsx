import React, { useContext, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  const [errormessage, seterrormessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        alert("login successful");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        seterrormessage("Incorrect password or email");
      });
  };

  const {
    createUser,
    updateUserProfile,
    signUpWithGmail,
    login,
    logout,
    loading,
  } = useContext(AuthContext);
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios.post("http://localhost:6001/users", userInfo).then((response) => {
          alert("account created");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white text-black">
        <div className="modal-action flex flex-col justify-center mt-0 text-black">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Login!</h3>
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
                <a
                  href="#"
                  className="label-text-alt link text-black link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {errormessage ? (
              <p className="text-red text-xs italic">{errormessage}</p>
            ) : (
              ""
            )}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="text-red underline">
                Signup
              </Link>
            </p>
            <button
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center space-x-3 border-white mb-2 text-black">
            <button
              className="btn btn-circle text-black hover:bg-white bg-white"
              onClick={handleLogin}>
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
      </div>
    </dialog>
  );
};

export default Modal;
