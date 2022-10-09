import React, { useState } from "react";
import Auth from "../utils/auth";
import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (username, email, password, confirmPassword) => {
    fetch("http://localhost:5000/api/user/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Auth.login(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    registerUser(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
  };
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] flex justify-center md:items-start items-center w-full">
      <form onSubmit={onSubmit} className="md:mt-[5%] h-full">
        <div className="bg-[#797979] px-10 py-8 md:rounded-xl w-screen shadow-md md:max-w-md text-xl h-full md:h-auto">
          <div className="space-y-4">
            <h1 className="text-center text-2xl md:text-3xl md:mb-8 font-semibold text-white">
              Sign Up
            </h1>
            <div className="relative">
              <label
                htmlFor="username"
                className="block mb-1 text-white font-semibold"
              >
                Username
              </label>
              <input
                onChange={onChange}
                name="username"
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full pl-10"
                required
              />
              <AiOutlineUserAdd className="absolute left-2 md:top-12 top-10" />
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block mb-1 text-white font-semibold"
              >
                Email
              </label>
              <input
                onChange={onChange}
                name="email"
                type="email"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full pl-10"
                required
              />
              <AiOutlineMail className="absolute left-2 md:top-12 top-10" />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-1 text-white font-semibold"
              >
                Password
              </label>
              <input
                onChange={onChange}
                name="password"
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full pl-10"
                required
              />
              <AiFillLock className="absolute left-2 md:top-12 top-10" />
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-white font-semibold"
              >
                Confirm Password
              </label>
              <input
                onChange={onChange}
                name="confirmPassword"
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full pl-10"
                required
              />
              <AiFillLock className="absolute left-2 md:top-12 top-10" />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full font-semibold bg-[#737B6C] text-indigo-100 hover:bg-[#989b95] py-2 border-2 border-[#5b6454] rounded-md text-lg tracking-wide hover:shadow-lg duration-75 md:text-2xl"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
