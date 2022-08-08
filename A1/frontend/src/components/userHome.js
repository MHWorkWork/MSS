import React, { useEffect, useState } from "react";
import userService from "../services/service";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  //get it from the localstorage from login.js
  const getinfo = localStorage.getItem("username");

  //component needs to do something after render
  useEffect(() => {
    userService.getAllUsers().then((res) => {
      setUserList(res.result);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("edituser");
    navigate("/");
  };

  const handleSubmit = (event) => {
    navigate("/createUser");
  };

  function handleSubmit2(user) {
    localStorage.setItem("edituser", user);
    navigate("/editProfile");
  }

  return (
    <div>
      <ul>
        <li>
          <a href="/welcomePage">Home</a>
        </li>
        <li>
          <a class="active" href="/userPage">
            User Management
          </a>
        </li>
        <li>
          <a href="/groupHome">Group Management</a>
        </li>

        <li>
          <a href="/adminProfile">View Profile</a>
        </li>

        <li>
          <a href="/createApplication">Application</a>
        </li>

        <li className="logout">
          <button className="editbtn editbtn3" type="Submit" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <br />
      <div className="barbar">
        <h1>User Management</h1>
        <h3>Welcome {getinfo}! </h3>
        <button
          className="editbtn editbtn2"
          type="Submit"
          onClick={handleSubmit}
        >
          Create New User
        </button>

        <br />
        <br />
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Group</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.groupName}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="editbtn editbtn1"
                    onClick={() => {
                      handleSubmit2(user.username);
                    }}
                  >
                    {" "}
                    Edit Profile
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default UserHome;
