import React, { useEffect, useState } from "react";
import userService from "../services/service";
import { useNavigate } from "react-router-dom";
import AppModal from "./appModal";

function CreateApplication() {
  const [appList, setAppList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [startdate, setStartDate] = useState(null);
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

  const handleDateChange = (newVal) => {
    return JSON.stringify(newVal).split("T")[0].slice(1);
  };

  const handleSubmit = (event) => {
    navigate("/createApplication");
  };

  function handleSubmit2(app) {
    localStorage.setItem("appname", app);
    navigate("/kanbanBoard");
  }

  // const buttonWrapperStyles = {
  //   position: "relative",
  //   zIndex: 1,
  // };

  // const otherContentStyles = {
  //   position: "relative",
  //   zIndex: 2,
  // };

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
            onClick={() => setIsOpen(true)}
          >
            Create New Application
          </button>
          <AppModal open={isOpen} onClose={() => setIsOpen(false)}></AppModal>
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
                  <td>{handleDateChange(app.app_startDate)}</td>
                  <td>{handleDateChange(app.app_endDate)}</td>
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

          {appList.map((app, index) => {
            return (
              <button
                className="moveapps"
                onClick={() => {
                  handleSubmit2(app.app_acronym);
                }}
              >
                {app.app_acronym}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CreateApplication;
