import React, { useEffect, useState } from "react";
import userService from "../services/service";

function UpdateStatus() {
  const [groupStatus, setGroupStatus] = useState("");

  //get the username
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEdit = {
      groupName: localStorage.getItem("editgroup"),
      groupStatus: groupStatus,
    };

    userService.updateGroupStatus(userEdit).then((res) => {
      alert("Status updated.");
    });
  };

  return (
    <>
      <div className="formPosition">
        <div class="flex-row">
          <form class="login-form" onSubmit={handleSubmit}>
            <h1 class="lf--forgot">Update Group's Status</h1>

            <select
              class="space"
              required
              value={groupStatus}
              onChange={(e) => setGroupStatus(e.target.value)}
            >
              <option value="" disabled selected>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
            <br />
            <br />
            <input class="lf--submit" type="submit" value="Update"></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateStatus;
