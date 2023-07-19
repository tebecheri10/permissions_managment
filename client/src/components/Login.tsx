import React, { useState } from "react";
import { apiData } from "../api/apiData";
import { NewUser } from "../models/newUser";
import { setToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const login = (_credentials: NewUser) => {
    apiData
      .login(_credentials)
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginCredentials: NewUser = {
      username: username || "",
      password: password || "",
    };

    if (!username || !password) {
      throw new Error("Please fill all the fields");
    }

    login(loginCredentials);
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} className="login-form_container">
        <div className="login-form_row">
          <label htmlFor="username" className="login-form_label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-form_input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form_row">
          <label htmlFor="password" className="login-form_label">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="login-form_input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-form_submit">
          Login
        </button>
      </form>
    </div>
  );
};
