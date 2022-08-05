import React, { useEffect, useState } from "react";
import userService from "../services/service";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroup] = useState("");
  const navigate = useNavigate();

  const getinfo = localStorage.getItem("username");

  function handleSubmit() {
    navigate("/updateOwnEmail");
  }

  function handleSubmit2() {
    navigate("/updateOwnPass");
  }

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("edituser");
    navigate("/");
  };

  //component needs to do something after render
  useEffect(() => {
    userService.getUserProfile({ username: getinfo }).then((res) => {
      setUsername(res.result[0].username);
      setEmail(res.result[0].email);
      setGroup(res.result[0].groupName);
    });
  }, []);

  return (
    <>
      <div>
        <ul>
          <li>
            <a class="active" href="/userProfile">
              View Profile
            </a>
          </li>
          <li className="logout">
            <button className="editbtn editbtn3" type="Submit" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
        <br />
        <br />
        <div className="barbar">
          <h3>Welcome {getinfo}! </h3>
        </div>
        <div className="movecard">
          <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div class="card p-4">
              <div class=" image d-flex flex-column justify-content-center align-items-center">
                <button class="btn btn-secondary">
                  {" "}
                  <img
                    src="https://i.imgur.com/wvxPV9S.png"
                    height="100"
                    width="100"
                  />
                </button>{" "}
                <br />
                <h5>Username: {username}</h5>
                <h5>Email: {email}</h5>
                <h5>User Group: {groupName}</h5>
                <input
                  onClick={() => {
                    handleSubmit(username);
                  }}
                  className="lf--submit"
                  type="submit"
                  value="Edit Email"
                ></input>
                <br />
                <input
                  onClick={() => {
                    handleSubmit2(username);
                  }}
                  className="lf--submit"
                  type="submit"
                  value="Edit Password"
                ></input>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
