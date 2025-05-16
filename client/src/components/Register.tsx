import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SignUpInfo } from "../types";
import { handleError, handleSuccess } from "../helpers/util";
// type SignUpKeys = "name" | "email" | "password";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
  });

  const onhandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const copySignUpInfo = { ...signUpInfo };
    if (name === "name" || name === "email" || name === "password") {
      //   const key: SignUpKeys = name;
      copySignUpInfo[name] = value;
      setSignUpInfo(copySignUpInfo);
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };
  return (
    <div className="container">
      <h1>Register here</h1>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoFocus
            placeholder="Enter your name here..."
            autoComplete="name"
            onChange={onhandleChangeInput}
            name="name"
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email here..."
            autoComplete="email"
            onChange={onhandleChangeInput}
            name="email"
            value={signUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password here..."
            autoComplete="password"
            onChange={onhandleChangeInput}
            name="password"
            value={signUpInfo.password}
          />
        </div>
        <button type="submit">Register</button>
        <span>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
