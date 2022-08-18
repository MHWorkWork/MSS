//routes

const express = require("express");
const query = require("./app/model/models");
const cors = require("cors");
const app = express();
let bcrypt = require("bcrypt");
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

app.get("/findAll", query.findAll);
app.post("/userLogin", query.userLogin);
app.post("/userProfile", query.userProfile);
app.post("/adminProfile", query.userProfile);
app.post("/createUser", query.createUsers);
app.post("/updateOwnEmail", query.UpdateEmailUser);
app.post("/updateGroupUser", query.UpdateGroupUser);
app.post("/updateGroupStatus", query.UpdateGroupStatus);
app.post("/updateOwnPass", query.UpdatePassUser);
app.post("/createGroup", query.createGroup);
app.get("/findAllGroup", query.findAllGroup);
app.post("/editProfile", query.EditUserProfile);

/*Assignment 2*/
app.post("/createApplication", query.createApplication);
app.post("/createPlan", query.createPlan);
app.post("/createTask", query.createTask);
app.get("/getallApplication", query.getallApplication);
app.post("/retrieveTaskByApplication", query.retrieveTaskByApplication);
app.post("/getallPlans", query.getallPlans);
app.post("/getOneApplication", query.getOneApplication);
app.post("/getallTasks", query.getallTasks);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// route for user
// require("./app/routes/user.route")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
