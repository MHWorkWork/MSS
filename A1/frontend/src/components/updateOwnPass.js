import React, { useState } from "react";
import userService from "../services/service";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function UpdateOwnPass() {
  const [password, setPassword] = useState("");

  //get the username
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEdit = {
      username: localStorage.getItem("username"),
      password: password,
    };

    const validate = validatePassword(password);
    if (validate.result) {
      userService.updateOwnPass(userEdit).then((res) => {
        setPassword("");
        toast.success("Password updated!");
      });
    } else {
      toast.error(validate.message);
    }
  };

  const validatePassword = (value) => {
    var regularExpression = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[a-zA-Z]).{8,10}$/;

    if (!regularExpression.test(value)) {
      return {
        result: false,
        message:
          "Password needs to be at least 8 character and must not exceed  10 characters, must comprise of alphabets , numbers, and special character.",
      };
    } else
      return {
        result: true,
      };
  };

  const back = () => {
    window.history.back();
  };

  return (
    <div className="formPosition">
      <div className="flex-row">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="lf--forgot">Update Password</h1>
          <div className="flex-row">
            <label className="lf--label" htmlFor="password">
              <svg x="0px" y="0px" width="12px" height="13px">
                <path
                  fill="#B1B7C4"
                  d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                />
              </svg>
            </label>
            <input
              id="password"
              className="lf--input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input className="lf--submit" type="submit" value="Update"></input>
          <br />
          <input
            onClick={back}
            class="lf--submit"
            type="submit"
            value="Back"
          ></input>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
    </div>
  );
}

export default UpdateOwnPass;
