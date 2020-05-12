import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AuthContext from "./AuthContext.js";

const errorMessages = {
  username: "You must enter a username!",
  password: "You must enter a password!",
};

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });

  const [isSuccessfull, setSuccessfull] = useState(false);
  const [globalErrorMessage, setGlobalError] = useState("");
  const [isDirty, setDirty] = useState(false);

  const { setUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError("");

    setSuccessfull(false);

    const isInvalid = validateFormData();

    if (!isInvalid) {
      setDirty(false);
      try {
        const res = await axios(
          "http://localhost:4000/users?username=" +
            formData.username +
            "&password=" +
            formData.password
        );

        console.log(res);

        if (res.data.length) {
          setUser(res.data[0]);
          localStorage.setItem("user", JSON.stringify(res.data[0]));
          setSuccessfull(true);
        } else {
          setGlobalError("Invalid Username or Password");
          isInvalid(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  function validateFormData() {
    const inputs = ["username", "password"];
    const newError = { ...formError };
    let isInvalid = false;

    for (const input of inputs) {
      if (!formData[input]) {
        newError[input] = errorMessages[input];
        isInvalid = true;
      }
    }

    setFormError(newError);
    return isInvalid;
  }

  function handleInputChange(e) {
    setDirty(true);

    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });

    const newError = {
      ...formError,
      [e.currentTarget.id]: "",
    };

    if (
      e.currentTarget.id === "password" ||
      e.currentTarget.id === "retype-password"
    ) {
      newError["different-passwords"] = "";
    }

    setFormError(newError);
  }

  return (
    <>
      {globalErrorMessage ? (
        <div className="alert-danger" role="alert">
          Wrong username or password!
        </div>
      ) : null}

      {isSuccessfull ? <Redirect to="/" /> : null}

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleInputChange}
            value={formData.username}
            type="text"
            className={
              "form-control" + (formError.username ? " is-invalid" : "")
            }
            id="username"
            placeholder="Enter username"
          />

          <div className="invalid-feedback">{formError.username}</div>
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange}
            value={formData.password}
            type="password"
            className={
              "form-control" + (formError.password ? " is-invalid" : "")
            }
            id="password"
            placeholder="Password"
          />
          <div className="invalid-feedback">{formError.password}</div>
        </div>
        <button type="submit" className="btn" disabled={!isDirty}>
          Login
        </button>
      </form>
    </>
  );
}
