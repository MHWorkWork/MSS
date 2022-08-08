import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  //get it from the localstorage from login.js
  const getinfo = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("edituser");
    navigate("/");
  };

  return (
    <div>
      <ul>
        <li>
          <a class="active" href="/welcomePage">
            Home
          </a>
        </li>
        <li>
          <a href="/userPage">User Management</a>
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
        <h3>Welcome {getinfo}! </h3>
      </div>
    </div>
  );
}

export default WelcomePage;
