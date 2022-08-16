import React, { useState, useEffect } from "react";
import PlanModal from "./planModal";
import TaskModal from "./taskModal";
import userService from "../services/service";
import useCollapse from "react-collapsed";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function KanbanBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const getappname = localStorage.getItem("appname");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const handleDateChange = (newVal) => {
    return JSON.stringify(newVal).split("T")[0].slice(1);
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const back = () => {
    window.history.back();
  };

  useEffect(() => {
    userService
      .getallPlans({ plan_app_acronym: localStorage.getItem("appname") })
      .then((res) => {
        setPlanList(res.result);
      });

    userService
      .getallTasks({ task_app_acronym: localStorage.getItem("appname") })
      .then((res) => {
        setTaskList(res.result);
      });
  }, []);

  function taskCards(task) {
    return (
      <Card sx={{ minWidth: 100 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {task.task_name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.task_description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {task.task_notes}
          </Typography>
          <Typography variant="body2">
            {task.task_owner}
            <br />
            {handleDateChange(task.task_createdate)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  function planCards(plan) {
    return (
      <Card sx={{ minWidth: 100 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {plan.plan_mvp_name}
          </Typography>
          <button {...getToggleProps()}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <section {...getCollapseProps()}>
            <br />
            {plan.plan_startDate}
            <br />
            {plan.plan_endDate}
            <br />
            {plan.plan_app_acronym}
            <br />
          </section>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {plan.plan_startDate}
            <br />
            {plan.plan_endDate}
          </Typography>
          <Typography variant="body2">
            <br />
            {plan.plan_app_acronym}
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <h1 className="appheader">
        {getappname}
        <button
          className="editbtn editbtn2"
          type="Submit"
          onClick={() => setIsOpen(true)}
        >
          Create New Plan
        </button>
        <PlanModal open={isOpen} onClose={() => setIsOpen(false)}></PlanModal>

        <button
          className="editbtn editbtn2"
          type="Submit"
          onClick={() => setIsOpen2(true)}
        >
          Create New Task
        </button>
        <TaskModal open={isOpen2} onClose={() => setIsOpen2(false)}></TaskModal>

        <button className="editbtn editbtn2" type="Submit" onClick={back}>
          Back
        </button>
      </h1>

      <hr />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs md={1.4}>
            <Item>
              Plan
              {planList.map((plan) => {
                return planCards(plan);
              })}
            </Item>
          </Grid>
          <Grid item xs md={2}>
            <Item>
              Open
              {taskList.map((task, index) => {
                return taskCards(task);
                // <tr key={index}>
                //   <td>
                //     {task.task_name}
                //     <br />
                //     <br />
                //     <button {...getToggleProps()}>
                //       {isExpanded ? "Collapse" : "Expand"}
                //     </button>
                //     <section {...getCollapseProps()}>
                //       <br />
                //       {task.task_description}
                //       <br />
                //       {task.task_notes}
                //       <br />
                //       {task.task_owner}
                //       <br />
                //       {handleDateChange(task.task_createdate)}
                //       <br />
                //     </section>
                //   </td>
                // </tr>
              })}
            </Item>
          </Grid>
          <Grid item xs md={2}>
            <Item>To-do-list</Item>
          </Grid>

          <Grid item xs md={2}>
            <Item>Doing</Item>
          </Grid>
          <Grid item xs md={2}>
            <Item>Done</Item>
          </Grid>
          <Grid item xs md={2}>
            <Item>Close</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default KanbanBoard;
