import React, { useEffect, useState } from "react";
import userService from "../services/service";
import { useNavigate } from "react-router-dom";

function GroupHome() {
  const [groupList, setGroupList] = useState([]);
  const navigate = useNavigate();

  //get it from the localstorage from login.js
  const getinfo = localStorage.getItem("username");

  //component needs to do something after render
  useEffect(() => {
    userService.findAllGroup().then((res) => {
      setGroupList(res.result);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("edituser");
    navigate("/");
  };

  function handleSubmit4(user) {
    navigate("/createGroup");
  }

  function handleSubmit5(user) {
    localStorage.setItem("editgroup", user);
    navigate("/updateGroupStatus");
  }

  return (
    <div>
      <ul>
        <li>
          <a href="/welcomePage">Home</a>
        </li>
        <li>
          <a href="/userPage">User Management</a>
        </li>
        <li>
          <a class="active" href="/groupHome">
            Group Management
          </a>
        </li>

        <li>
          <a href="/adminProfile">View Profile</a>
        </li>
        <li className="logout">
          <button className="editbtn editbtn3" type="Submit" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <br />
      <div className="barbar">
        <h1>Group Management</h1>
        <h3>Welcome {getinfo}! </h3>

        <button
          className="editbtn editbtn2"
          type="Submit"
          onClick={handleSubmit4}
        >
          Create Group
        </button>
        <br />
        <br />
        <table>
          <tr>
            <th>User Group</th>
            {/* <th>Status</th>
            <th>Action</th> */}
          </tr>
          {groupList.map((group, index) => {
            return (
              <tr key={index}>
                <td>{group.groupName}</td>
                {/* <td>{group.groupStatus}</td>
                <td>
                  <button
                    className="editbtn editbtn1"
                    onClick={() => {
                      handleSubmit5(group.groupName);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                </td> */}
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default GroupHome;
