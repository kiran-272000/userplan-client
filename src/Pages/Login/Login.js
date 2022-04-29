import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.scss";
import Card from "../../Components/UI/Card";

const isEmail = (value) => validator.isEmail(value);
const isPassword = (value) => value.trim().length >= 8;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formValidity, setFormValidity] = useState({
    email: true,
    password: true,
  });

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const emailisValid = isEmail(email);
    const passwordisValid = isPassword(password);

    setFormValidity({
      email: emailisValid,
      password: passwordisValid,
    });

    const formisValid = emailisValid && passwordisValid;

    if (!formisValid) return;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3500/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 401) {
        alert("Invalid Email or Password");
      }

      if (response.status === 200) {
        const data = await response.json();

        window.sessionStorage.setItem("accessToken", data.token);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={loginHandler}>
        <div
          className={`${classes.control} ${
            formValidity.email ? "" : classes.invalid
          }`}
        >
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={emailHandler} />
          {!formValidity.email && <p>Please enter your email!!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.password ? "" : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={passwordHandler} />
          {!formValidity.password && <p>Please enter valid password!! </p>}
        </div>
        <div className={classes.actions}>
          <button type="botton" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className={classes.submit}>Login</button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
