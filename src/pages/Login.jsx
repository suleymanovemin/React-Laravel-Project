import axios from "axios";
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MainContext, useContext } from "../Context";

const Login = () => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let { user, setUser } = useContext(MainContext);

  const checkUser = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios.post("http://localhost:8000/api/login", payload).then((response) => {
      setMessage(response.data.message + "Yönləndirilirsiz...");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser({
        id: response.data.user.id,
        name: response.data.user.name,
        surname: response.data.user.surname,
        email: response.data.user.email,
        profile_image: response.data.user.profile,
      });
      setTimeout(() => {
        navigate("/profile");
      }, 100);
    });
  };
  const a = JSON.parse(localStorage.getItem("user"));
  if (a) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-center my-5 text-[22px]">LOGIN</h1>
      <form className="text-center" onSubmit={checkUser}>
        <div className="text-green-500">{message}</div>
        <label className="block my-4">
          <span className="my-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            ref={emailRef}
            type="text"
            name="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Email"
          />
          {/* <div>{nameErr}</div> */}
        </label>
        <label className="block my-4">
          <span className=" my-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Password"
          />
          {/* <div>{nameErr}</div> */}
        </label>
        <button className="w-full rounded p-4 bg-blue-500 text-[#fff] transition-all hover:bg-green-500">
          Login
        </button>
      </form>
      <Link
        className="text-blue-500 underline my-5 block text-[19px]"
        to="/register"
      >
        Register...
      </Link>
    </div>
  );
};

export default Login;
