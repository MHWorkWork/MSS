import React, { useEffect, useState } from "react";
import userService from "../services/service";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [success, setSuccess] = useState(false);
  const usereditname = localStorage.getItem("edituser");

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

    userService.getUserProfile({ username: usereditname }).then((res) => {
      setUsername(res.result[0].username);
      setEmail(res.result[0].email);
      setGroup(res.result[0].groupName);
    });
  }, []);

  const handleChange = (e) => {
    let temp = [];
    for (let i = 0; i < e.length; i++) {
      temp.push(e[i].value);
    }
    setGroup(temp.join(","));
  };

  const back = () => {
    window.history.back();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: usereditname,
      password: password,
      email: email,
      groupName: groupName,
      status: status,
    };

    localStorage.setItem("groupName", groupName);

    // let schema = yup.object().shape({
    //   email: yup.string().email(),
    // });

    // schema
    //   .isValid({
    //     email: email,
    //   })
    //   .then(function (valid) {
    //     if (valid === false) {
    //       toast.error("Email must comprise of @ and .", {});
    //     }
    if (password.length > 0) {
      const validate = validatePassword(password);
      if (validate.result === false) {
        toast.error(validate.message);
        return;
      }
    } else {
      setSuccess(true);
      userService.EditUserProfile(user).then((res) => {
        if (res.res === true) {
          toast.success("User Updated!", {
            toastId: "success1",
          });
          setPassword("");
          setEmail("");
          setGroup("");
          setStatus("");
        } else {
          toast.error("Invalid fields", {});
        }
      });
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

  return (
    <>
      <div className="formPosition">
        <div class="flex-row">
          <form class="login-form" onSubmit={handleSubmit}>
            <h1 class="lf--forgot">Edit Profile</h1>

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
              value={groupList.map((obj) => {
                let a = groupName.split(",");
                if (a.includes(obj.value)) {
                  return obj;
                }
              })}
              // value={groupName}
              onChange={handleChange}
            />
            <br />
            <select
              class="space"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option option value="" disabled selected>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
            <br />
            <br />
            <input class="lf--submit" type="submit" value="Update"></input>
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
    </>
  );
}

export default EditProfile;
