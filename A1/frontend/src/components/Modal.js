import React, { useState } from "react";
import "./Modal.css";
import userService from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Modal({ open, children, onClose }) {
  const [appname, setAppname] = useState("");
  const [description, setDescription] = useState("");
  const [runningno, setRunningno] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [permitopen, setPermitOpen] = useState([]);
  const [permitdolist, setPermitDoList] = useState([]);
  const [permitdoing, setPermitDoing] = useState([]);
  const [permitdone, setPermitDone] = useState([]);

  const handleStartDateChange = (newVal) => {
    setStartDate(JSON.stringify(newVal).split("T")[0].slice(1));
  };

  const handleEndDateChange = (newVal) => {
    setEndDate(JSON.stringify(newVal).split("T")[0].slice(1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const app = {
      app_acronym: appname,
      app_description: description,
      app_rnumber: runningno,
      app_startDate: startdate,
      app_endDate: enddate,
      app_permit_Open: permitopen,
      app_permit_todolist: permitdolist,
      app_permit_doing: permitdoing,
      app_permit_done: permitdone,
    };

    userService.createApplication(app).then((res) => {
      if (res.result == true) {
        toast.success("App created!", {});
      } else {
        toast.error("App Exists!", {});
      }
      console.log(res);
    });
  };

  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
    zIndex: 1000,
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  if (!open) return null;
  return (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={onClose}>X</button>
          </div>
          <div className="title">
            <h2>Create new App</h2>
          </div>

          <div class="flex-row">
            <label class="lf--label" for="appname">
              <svg x="0px" y="0px" width="12px" height="13px">
                <path
                  fill="#B1B7C4"
                  d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
                />
              </svg>
            </label>
            <input
              id="appname"
              class="lf--input"
              value={appname}
              onChange={(e) => setAppname(e.target.value)}
              placeholder="Name"
              type="text"
              required="required"
            />
          </div>

          <div class="flex-row">
            <textarea
              id="appdesc"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="appdesc"
              rows="4"
              cols="65"
            ></textarea>
          </div>

          <div class="flex-row">
            <input
              id="appno"
              class="lf--input"
              value={runningno}
              onChange={(e) => setRunningno(e.target.value)}
              placeholder="Running No."
              type="number"
              required="required"
            />
          </div>
          {/* <div className="datepicker">
            <label className="textsize" for="startdate">
              Start Date:
            </label>
            <input
              type="date"
              id="datepicker"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              name="startdate"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label className="textsize" for="enddate">
              End Date:
            </label>
            <input
              type="date"
              id="datepicker"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              name="enddate"
            />
          </div> */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startdate}
              inputFormat="dd-mm-yyyy"
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField
                  className="formInputDateField textcolor"
                  {...params}
                />
              )}
            />

            <br />
            <DatePicker
              label="End Date"
              value={enddate}
              inputFormat="dd-mm-yyyy"
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField
                  className="formInputDateField textcolor"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <br />
          <select
            class="space"
            value={permitopen}
            onChange={(e) => setPermitOpen(e.target.value)}
            required
          >
            <option option value="" disabled selected>
              Permit Open
            </option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </select>
          <br />
          <select
            class="space"
            value={permitdolist}
            onChange={(e) => setPermitDoList(e.target.value)}
            required
          >
            <option option value="" disabled selected>
              Permit Do List
            </option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </select>
          <br />
          <select
            class="space"
            value={permitdoing}
            onChange={(e) => setPermitDoing(e.target.value)}
            required
          >
            <option option value="" disabled selected>
              Permit Doing
            </option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </select>
          <br />
          <select
            class="space"
            value={permitdone}
            onChange={(e) => setPermitDone(e.target.value)}
            required
          >
            <option option value="" disabled selected>
              Permit Done
            </option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </select>
          <br />
          <div className="footer">
            <button onClick={onClose} id="cancelBtn">
              Cancel
            </button>
            <button onClick={handleSubmit}>Create</button>
          </div>
        </div>

        {children}
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
    </>
  );
}

export default Modal;
