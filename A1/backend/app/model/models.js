//model - sql statements

const sql = require("../config/db");
const funcCall = require("./checkGroup");
let bcrypt = require("bcrypt");
const { response } = require("express");

/* Retreive */
exports.findAll = (req, response) => {
  sql.query(`SELECT * FROM accounts`, (err, res) => {
    if (err) {
      response.send(err);
    } else {
      response.send({ result: res });
    }
  });
};

/* Retreive */
exports.userProfile = (req, response) => {
  sql.query(
    `SELECT * FROM accounts WHERE username = '${req.body.username}'`,
    (err, res) => {
      if (err) {
        response.send(err);
      } else {
        response.send({ result: res });
      }
    }
  );
};

/* checklogin */
exports.userLogin = (req, response) => {
  if (req.body.username) {
    sql.query(
      `SELECT * from accounts where username = ?`,
      [req.body.username],
      async (err, res) => {
        if (err) {
          response.send(err);
        }
        if (res.length) {
          const databaseHash = res[0].password;
          const suppliedPassword = req.body.password;

          const isHashMatching = bcrypt.compareSync(
            suppliedPassword,
            databaseHash
          );

          if (isHashMatching === true) {
            const ifAdmin = await funcCall.checkGroup(res[0].username, "Admin");
            response.send({ result: res[0], isAdmin: ifAdmin });
          } else {
            response.send({
              message: "Invalid Username/Password",
              result: null,
            });
          }
        } else {
          response.send({ message: "Invalid Username/Password", result: null });
        }
      }
    );
  }
};

exports.createUsers = (req, response) => {
  const plaintextPassword = req.body.password;
  const hashedPassword = bcrypt.hashSync(plaintextPassword, 10);

  sql.query(
    `insert into accounts (username,password,email,groupName)  values ('${req.body.username}','${hashedPassword}','${req.body.email}','${req.body.groupName}')`,
    (err, res) => {
      if (err) {
        response.send({ result: false, message: err.message });
      } else {
        response.send({ result: true });
      }
    }
  );
};

exports.UpdateEmailUser = (req, response) => {
  sql.query(
    `update accounts set email='${req.body.email}' where username='${req.body.username}'`,
    (err, res) => {
      if (err) {
        response.send({ res: false, message: err.message });
      } else {
        response.send({ res: true });
      }
    }
  );
};

exports.UpdateGroupUser = (req, response) => {
  sql.query(
    `update accounts set groupName='${req.body.groupName}' where username='${req.body.username}'`,
    (err, res) => {
      if (err) {
        response.send({ res: false, message: err.message });
      } else {
        response.send({ res: true });
      }
    }
  );
};

exports.UpdateGroupStatus = (req, response) => {
  sql.query(
    `update groupdetail set groupStatus='${req.body.groupStatus}' where groupName='${req.body.groupName}'`,
    (err, res) => {
      if (err) {
        response.send({ res: false, message: err.message });
      } else {
        response.send({ res: true });
      }
    }
  );
};

exports.UpdatePassUser = (req, response) => {
  const plaintextPassword = req.body.password;
  const hashedPassword = bcrypt.hashSync(plaintextPassword, 10);

  sql.query(
    `update accounts set password='${hashedPassword}' where username='${req.body.username}'`,
    (err, res) => {
      if (err) {
        response.send({ res: false, message: err.message });
      } else {
        response.send({ res: true });
      }
    }
  );
};

/* Retreive */
exports.findAllGroup = (req, response) => {
  sql.query(`SELECT * FROM groupdetail`, (err, res) => {
    if (err) {
      response.send(err);
    } else {
      response.send({ result: res });
    }
  });
};

exports.EditUserProfile = (req, response) => {
  const plaintextPassword = req.body.password;
  const hashedPassword = bcrypt.hashSync(plaintextPassword, 10);

  if (req.body.password.length != 0) {
    sql.query(
      `update accounts set password='${hashedPassword}' where username='${req.body.username}'`
    );
  }
  if (req.body.email.length != 0) {
    sql.query(
      `update accounts set email='${req.body.email}' where username='${req.body.username}'`
    );
  }
  if (req.body.groupName.length != 0) {
    sql.query(
      `update accounts set groupName='${req.body.groupName}' where username='${req.body.username}'`
    );
  }

  if (req.body.status.length != 0) {
    sql.query(
      `update accounts set status='${req.body.status}' where username='${req.body.username}'`
    );
  }
  response.send({ res: true });
  sql.query((err, res) => {
    /*     if (err) {
      response.send({ res: false, message: err.message });
    } else {
      response.send({ res: true });
    } */
  });
};

exports.createGroup = (req, response) => {
  sql.query(
    `insert into groupdetail (groupName)  values ('${req.body.groupName}')`,
    (err, res) => {
      if (err) {
        response.send({ result: false, message: err.message });
      } else {
        response.send({ result: true });
      }
    }
  );
};

/* Assignment 2*/
exports.createApplication = (req, response) => {
  sql.query(
    `insert into application (app_acronym,app_description,app_rnumber,app_startDate,app_endDate,app_permit_Open,app_permit_todolist,app_permit_doing,app_permit_done) 
    values ('${req.body.app_acronym}', '${req.body.app_description}', '${req.body.app_rnumber}', '${req.body.app_startDate}', '${req.body.app_endDate}', '${req.body.app_permit_Open}', '${req.body.app_permit_todolist}', '${req.body.app_permit_doing}', '${req.body.app_permit_done}')`,
    (err, res) => {
      if (err) {
        response.send({ result: false, message: err.message });
      } else {
        response.send({ result: true });
      }
    }
  );
};

exports.getallApplication = (req, response) => {
  sql.query(`SELECT * FROM application`, (err, res) => {
    if (err) {
      response.send(err);
    } else {
      response.send({ result: res });
    }
  });
};
