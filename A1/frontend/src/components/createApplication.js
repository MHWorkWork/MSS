import React, { useEffect, useState } from "react";
import userService from "../services/service";
import { useNavigate } from "react-router-dom";

function CreateApplication() {
  const [appList, setAppList] = useState([]);
  const navigate = useNavigate();

  const getinfo = localStorage.getItem("username");

  useEffect(() => {
    userService.getallApplication().then((res) => {
      setAppList(res.result);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("edituser");
    navigate("/");
  };

  const handleSubmit = (event) => {
    navigate("/createApplication");
  };

  function handleSubmit2(app) {
    // localStorage.setItem("edituser", user);
    navigate("/createApplication");
  }

  return (
    <>
      <div>
        <ul>
          <li>
            <a href="/welcomePage">Home</a>
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
            <a class="active" href="/createApplication">
              Application
            </a>
          </li>
          <li className="logout">
            <button className="editbtn editbtn3" type="Submit" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
        <br />
        <div className="barbar">
          <h1>Application</h1>
          <h3>Welcome {getinfo}! </h3>
          <button
            className="editbtn editbtn2"
            type="Submit"
            onClick={handleSubmit}
          >
            Create New Application
          </button>

          <br />
          <br />
          <table>
            <tr>
              <th>app_acronym</th>
              <th>app_description</th>
              <th>app_rnumber</th>
              <th>app_startDate</th>
              <th>app_endDate</th>
              <th>app_permit_Open</th>
              <th>app_permit_todolist</th>
              <th>app_permit_doing</th>
              <th>app_permit_done</th>
            </tr>
            {appList.map((app, index) => {
              return (
                <tr key={index}>
                  <td>{app.app_acronym}</td>
                  <td>{app.app_description}</td>
                  <td>{app.app_rnumber}</td>
                  <td>{app.app_startDate}</td>
                  <td>{app.app_endDate}</td>
                  <td>{app.app_permit_Open}</td>
                  <td>{app.app_permit_todolist}</td>
                  <td>{app.app_permit_doing}</td>
                  <td>{app.app_permit_done}</td>
                  <td>
                    <button
                      className="editbtn editbtn1"
                      onClick={() => {
                        handleSubmit2(app.app_acronym);
                      }}
                    >
                      {" "}
                      Edit Task
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default CreateApplication;
