import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const a = JSON.parse(localStorage.getItem("user"));
  if (a) {
    return <Navigate to="/profile" />;
  }
  let nameRef = useRef();
  let surnameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let passwordConfirmationRef = useRef();
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [surNameErr, setSurNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfirmationErr, setPasswordConfirmationErr] = useState("");
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axios
      .post("http://localhost:8000/api/signup", payload)
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
          nameRef.current.value = "";
          surnameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordConfirmationRef.current.value = "";

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data.errors;
          setNameErr(errorData.name ? errorData.name[0] : "");
          setSurNameErr(errorData.surname ? errorData.surname[0] : "");
          setEmailErr(errorData.email ? errorData.email[0] : "");
          setPasswordErr(errorData.password ? errorData.password[0] : "");
          setPasswordConfirmationErr(
            errorData.password_confirmation
              ? errorData.password_confirmation[0]
              : ""
          );
        } else {
          setMessage("Xəta baş verdi");
          console.error(error);
        }
      });
  };
  return (
    <div>
      <h1 className="text-center my-6 text-[24px]">Register</h1>
      <form
        onSubmit={addUser}
        className="w-[40%] mx-auto text-center"
        method="POST"
        action=""
      >
        <div className=" text-green-500">{message}</div>
        <label className="block my-4">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Name
          </span>
          <input
            ref={nameRef}
            type="text"
            name="name"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Name"
          />
          <div className="text-red-500">{nameErr}</div>
        </label>
        <label className="block my-4">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Surname
          </span>
          <input
            ref={surnameRef}
            type="text"
            name="surname"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Surname"
          />
          <div className="text-red-500">{surNameErr}</div>
        </label>
        <label className="block my-4">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            ref={emailRef}
            type="email"
            name="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
          <div className="text-red-500">{emailErr}</div>
        </label>
        <label className="block my-4">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Password"
          />
          <div className="text-red-500">{passwordErr}</div>
        </label>
        <label className="block my-4">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password Verified
          </span>
          <input
            ref={passwordConfirmationRef}
            type="password"
            name="password_confirmation"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Password"
          />
          <div className="text-red-500">{passwordConfirmationErr}</div>
        </label>
        <button className="w-full rounded p-4 bg-blue-500 text-[#fff] transition-all hover:bg-green-500">
          Register
        </button>
      <Link className="text-blue-500 underline my-5 block text-[19px]" to="/login">Login</Link>
      </form>

     
    </div>
  );
};

export default Register;
