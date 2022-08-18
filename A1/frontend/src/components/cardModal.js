import React, { useEffect, useState } from "react";
import "./Modal.css";
import userService from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CardModal({ open, onClose }) {
  const [taskList, setTaskList] = useState([]);

  const taskname = localStorage.getItem("viewTask");

  const handleDateChange = (newVal) => {
    return JSON.stringify(newVal).split("T")[0].slice(1);
  };

  useEffect(() => {
    userService
      .retrieveTaskByApplication({ task_name: taskname })
      .then((res) => {
        setTaskList(res.result);
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  };

  function taskCards(task) {
    return (
      <Typography variant="h5" component="div">
        Task Name: {task.task_name}
        <br />
        Task Description: {task.task_description}
        <br />
        Task Notes: {task.task_notes}
        <br />
        Task ID: {task.task_id}
        <br />
        Task Plan: {task.task_plan}
        <br />
        Task App Acronym: {task.task_app_acronym}
        <br />
        Task State: {task.task_state}
        <br />
        Task Creator: {task.task_creator}
        <br />
        Task Owner: {task.task_owner}
        <br />
        Create Date: {handleDateChange(task.task_createdate)}
        <br />
        <br />
      </Typography>
    );
  }

  if (!open) return null;
  return (
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={onClose}>X</button>
          </div>

          {taskList.map((task) => {
            return taskCards(task);
          })}

          {/* <label className="textplacement">
            Plan App Acronym: {getappname}
          </label> */}
          <br />
        </div>
      </div>
    </>
  );
}

export default CardModal;
