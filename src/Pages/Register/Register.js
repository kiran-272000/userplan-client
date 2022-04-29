import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import Card from "../../Components/UI/Card";

import classes from "./Register.module.scss";

const isEmail = (value) => validator.isEmail(value);
const isPassword = (value) => value.trim().length >= 8;
const isPhone = (value) => value.trim().length === 10;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    phone: true,
    password: true,
  });

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    const nameisValid = name.length > 4;
    const mailisValid = isEmail(email);
    const phoneisValid = isPhone(phone);
    const passwordisValid = isPassword(password);

    setFormValidity({
      name: nameisValid,
      email: mailisValid,
      phone: phoneisValid,
      password: passwordisValid,
    });

    const formIsValid =
      nameisValid && mailisValid && phoneisValid && passwordisValid;

    if (!formIsValid) return;
    const userData = {
      name,
      email,
      phone,
      password,
    };

    try {
      const response = await fetch("http://localhost:3500/api/user/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.status === 403) {
        alert("Email id Already Exists");
      }

      if (response.status === 200) {
        alert("Successfully Registered");
        navigate("/");
      }
    } catch (err) {
      alert("Registration Failed");
    }
  };

  const isNumber = async (event) => {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={registerHandler}>
        <div
          className={`${classes.control} ${
            formValidity.name ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={nameHandler} />
          {!formValidity.name && <p>Please Enter A Valid Name!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.email ? "" : classes.invalid
          }`}
        >
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={emailHandler} />
          {!formValidity.email && <p>Please Enter A Valid emailID!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.phone ? "" : classes.invalid
          }`}
        >
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            onChange={phoneHandler}
            onKeyPress={isNumber}
          />
          {!formValidity.phone && <p>Please Enter A Valid Phone Number!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.password ? "" : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={passwordHandler} />
          {!formValidity.password && <p>Please Enter A Valid Password!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={() => navigate("/")}>
            Login
          </button>
          <button className={classes.submit}>Register</button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
