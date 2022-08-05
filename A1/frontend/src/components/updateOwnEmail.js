import React, { useState } from "react";
import userService from "../services/service";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function UpdateOwnEmail() {
  const [email, setEmail] = useState("");

  //get the username
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEdit = {
      username: localStorage.getItem("username"),
      email: email,
    };
    let schema = yup.object().shape({
      email: yup.string().email(),
    });

    schema
      .isValid({
        email: email,
      })
      .then(function (valid) {
        if (valid === false) {
          toast.error("Email must comprise of @ and .");
        } else {
          userService.updateOwnEmail(userEdit).then((res) => {
            setEmail("");
            toast.success("Email updated!");
          });
        }
      });
  };

  const back = () => {
    window.history.back();
  };

  return (
    <div className="formPosition">
      <div className="flex-row">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="lf--forgot">Update Email</h1>
          <div className="flex-row">
            <label className="lf--label" htmlFor="email">
              <svg x="0px" y="0px" width="12px" height="13px">
                <path
                  fill="#B1B7C4"
                  d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
                />
              </svg>
            </label>
            <input
              id="email"
              className="lf--input"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
export default UpdateOwnEmail;
