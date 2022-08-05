import React, { useEffect, useState } from "react";
import userService from "../services/service";
import * as yup from "yup";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroup] = useState([]);
  const [status, setStatus] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userService.findAllGroup().then((res) => {
      const options = res.result.map((val, index) => {
        return {
          value: val.groupName,
          label: val.groupName,
        };
      });
      setGroupList(options);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      groupName: groupName,
      status: status,
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
          toast.error("Email must comprise of @ and .", {});
        } else {
          setSuccess(true);
          if (password != "") {
            const validate = validatePassword(password);
            if (validate.result) {
              userService.createUsers(user).then((res) => {
                if (res.result == true) {
                  toast.success("User created!");
                  setUsername("");
                  setPassword("");
                  setEmail("");
                  setGroup("");
                  setStatus("");
                } else {
                  toast.error("Username already exists.");
                }
              });
            } else {
              toast.error(validate.message);
            }
          }
        }
      });
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

  const handleChange = (e) => {
    let temp = [];
    for (let i = 0; i < e.length; i++) {
      temp.push(e[i].value);
    }
    console.log(temp);
    setGroup(temp);
  };

  const back = () => {
    window.history.back();
  };

  return (
    <div className="formPosition">
      <div class="flex-row">
        <form class="login-form" onSubmit={handleSubmit}>
          <h1 class="lf--forgot">Create New User</h1>
          <div class="flex-row">
            <label class="lf--label">
              <svg x="0px" y="0px" width="12px" height="13px">
                <path
                  fill="#B1B7C4"
                  d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
                />
              </svg>
            </label>
            <input
              id="username"
              class="lf--input"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required="required"
            />
          </div>
          <div class="flex-row">
            <label class="lf--label">
              <svg x="0px" y="0px" width="15px" height="5px">
                <g>
                  <path
                    fill="#B1B7C4"
                    d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                  />
                </g>
              </svg>
            </label>
            <input
              id="password"
              class="lf--input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="flex-row">
            <label class="lf--label">
              <svg x="0px" y="0px" width="15px" height="5px">
                <g>
                  <path
                    fill="#B1B7C4"
                    d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                  />
                </g>
              </svg>
            </label>
            <input
              id="email"
              class="lf--input"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Select
            className="textsize"
            isMulti
            options={groupList}
            placeholder="Select Role"
            value={groupList.find((obj) => obj.value === groupName)}
            onChange={handleChange}
          />

          {/* <select
            class="space"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option option value="" disabled selected>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select> */}

          <br />
          <input class="lf--submit" type="submit" value="Create"></input>
          <br />
          <input
            onClick={back}
            class="lf--submit"
            type="submit"
            value="Back"
          ></input>
        </form>
      </div>
      {success ? (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreateUser;
