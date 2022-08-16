import React, { useEffect, useState } from "react";
import * as moment from "moment";
import "./Modal.css";
import userService from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

function TaskModal({ open, onClose }) {
  const [task_name, setTaskName] = useState("");
  const [task_description, setTaskDescription] = useState("");
  const [task_notes, setTaskNotes] = useState("");
  const [task_id, setTaskID] = useState("");
  const [task_plan, setTaskPlan] = useState("");
  //const [task_app_acronym, setTaskAppAcronym] = useState("");
  const [task_state, setTaskState] = useState("");
  const [task_creator, setTaskCreator] = useState("");
  const [task_owner, setTaskOwner] = useState("");
  const [task_createdate, setCreateDate] = useState(null);
  //const [planName, setPlanName] = useState([]);
  const [planList, setPlanList] = useState([]);

  const getuser = localStorage.getItem("username");
  const getappname = localStorage.getItem("appname");
  const createdate = moment(new Date()).format("YYYY/MM/DD");

  const handleSubmit = (event) => {
    event.preventDefault();

    const converttoString = JSON.stringify(task_plan.value);

    const app = {
      task_name: task_name,
      task_description: task_description,
      task_notes: task_notes,
      task_id: task_id,
      task_plan: converttoString.replace(/['‘’"“”]/g, ""),
      task_app_acronym: getappname,
      task_state: task_state,
      task_creator: getuser,
      task_owner: getuser,
      task_createdate: createdate,
    };

    userService.createTask(app).then((res) => {
      if (res.result == true) {
        toast.success("Task created!", {});
      } else {
        console.log(res);
        toast.error("Task Exists!", {});
      }
    });
  };

  useEffect(() => {
    const app = {
      plan_app_acronym: getappname,
    };
    userService.getallPlans(app).then((res) => {
      {
        planList.map((item) => {
          return (
            <option value={item.plan_mvp_name}>{item.plan_mvp_name}</option>
          );
        });
      }
      setPlanList(
        res.result.map((item) => {
          return {
            value: item.plan_mvp_name,
            label: item.plan_mvp_name,
          };
        })
      );
    });
  }, []);

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
            <h3>Create new Task</h3>
          </div>

          <div class="flex-row">
            <input
              id="taskname"
              class="lf--input"
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              type="text"
              required="required"
            />
          </div>

          <div class="flex-row">
            <input
              id="taskdesc"
              class="lf--input"
              value={task_description}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Description"
              type="text"
            />
          </div>

          <Select
            className="textsize"
            placeholder="Choose Plan"
            required
            value={task_plan}
            onChange={(e) => setTaskPlan({ value: e.value, label: e.value })}
            options={planList}
          />

          <br />

          <label className="textplacement">
            Task App Acronym: {getappname}
          </label>

          <label className="textplacement">Task Creator: {getuser}</label>

          {/* <Select
            className="textsize"
            placeholder="Choose State"
            required
            value={task_state}
            onChange={(e) => {
              setTaskState({ value: e.value, label: e.value });
            }}
            options={states}
          ></Select>
          <br /> */}
          <label className="textplacement">Task ID:</label>

          <label className="textplacement">Task Owner: {getuser}</label>

          <label className="textplacement">
            Task Create Date: {createdate}
          </label>

          <br />

          <div className="footer">
            <button onClick={onClose} id="cancelBtn">
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

export default TaskModal;
