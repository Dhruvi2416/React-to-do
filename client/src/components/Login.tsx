import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInfo } from "../types";
import { handleError, handleSuccess } from "../helpers/util";
import { useUserContext } from "../providers/UserProvider";
// type loginKeys = "name" | "email" | "password";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const onhandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    if (name === "email" || name === "password") {
      //   const key: loginKeys = name;
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }
    
    try {
      const url = `${import.meta.env.VITE_LINK}auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, error, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setUser(name);
        setTimeout(() => {
          navigate("/todos");
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
      <h1>Login here</h1>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email here..."
            autoComplete="email"
            onChange={onhandleChangeInput}
            name="email"
            value={loginInfo.email}
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
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account?
          <Link to="/register" className="link">
            Register
          </Link>
        </span>
      </form>

    </div>
  );
};

export default Login;
