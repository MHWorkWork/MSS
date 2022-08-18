import React, { useEffect, useState } from "react";
import "./Modal.css";
import userService from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function PlanModal({ open, onClose }) {
  const [plan_mvp_name, setPlanMvpName] = useState("");
  const [planList, setPlanList] = useState([]);
  const [plan_startdate, setPlanStartDate] = useState(null);
  const [plan_enddate, setPlanEndDate] = useState(null);
  // const [plan_app_acronym, setPlanAppAcronym] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const getappname = localStorage.getItem("appname");

  const handleStartDateChange = (newVal) => {
    setPlanStartDate(JSON.stringify(newVal).split("T")[0].slice(1));
  };

  const handleEndDateChange = (newVal) => {
    setPlanEndDate(JSON.stringify(newVal).split("T")[0].slice(1));
  };

  const reloadPage = () => {
    window.location.reload(true);
  };

  // useEffect(() => {
  //   //edit here
  //   userService
  //     .getallPlans({ plan_mvp_name: localStorage.getItem("planname") })
  //     .then((res) => {
  //       console.log(res);
  //       setPlanList(res.result);
  //     });
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const app = {
      plan_mvp_name: plan_mvp_name,
      plan_startDate: plan_startdate,
      plan_endDate: plan_enddate,
      plan_app_acronym: getappname,
    };

    userService.createPlan(app).then((res) => {
      if (res.result == true) {
        toast.success("Plan created!", {});
      } else {
        toast.error("Plan Exists!", {});
      }
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
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 1000,
  };

  if (!open) return null;
  return (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={reloadPage}>X</button>
          </div>

          <div className="title">
            <h3>Create new Plan</h3>
          </div>

          <div class="flex-row">
            <input
              id="planname"
              class="lf--input"
              value={plan_mvp_name}
              onChange={(e) => setPlanMvpName(e.target.value)}
              placeholder="Plan Name"
              type="text"
              required="required"
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={plan_startdate}
              inputFormat="dd-MM-yyyy"
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField
                  className="formInputDateField textcolor"
                  required
                  {...params}
                />
              )}
            />

            <br />
            <DatePicker
              label="End Date"
              value={plan_enddate}
              inputFormat="dd-MM-yyyy"
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField
                  required
                  className="formInputDateField textcolor"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <br />
          {/* <div class="flex-row">
            <label
              id="planappAcronym"
              class="lf--input"
              value={getappname}
              onChange={(e) => setPlanAppAcronym(e.target.value)}
              // placeholder="Plan App Acronym"
              // type="text"
              required="required"
            >
              Plan App Acronym: {getappname}
            </label>
          </div> */}

          <label className="textplacement">
            Plan App Acronym: {getappname}
          </label>
          <br />

          <div className="footer">
            <button onClick={reloadPage} id="cancelBtn">
              Cancel
            </button>
            <button onClick={handleSubmit}>Create</button>
          </div>
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
    </>
  );
}

export default PlanModal;
