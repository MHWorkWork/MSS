const sql = require("../config/db");

const checkGroup = async (username, groupName) => {
  return new Promise((resolve) => {
    sql.query(
      `SELECT groupName from accounts where username = ?`,
      [username],
      async (err, res) => {
        const arr = res[0].groupName.split(",");

        if (arr.includes(groupName)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};
module.exports = {
  checkGroup,
};
