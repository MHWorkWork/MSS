import React, { useEffect, useState } from "react";
import userService from "../services/service";

function UpdateGroup() {
  const [groupName, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    userService.findAllGroup().then((res) => {
      setGroupList(res.result);
    });
  }, []);

  //get the username
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEdit = {
      username: localStorage.getItem("edituser"),
      groupName: groupName,
    };
    userService.updateGroupUsers(userEdit).then((res) => {
      alert("Group updated.");
    });
  };

  return (
    <>
      <div class="flex-row">
        <form class="login-form" onSubmit={handleSubmit}>
          <h1 class="lf--forgot">Update Group</h1>

          <select
            class="space"
            required
            value={groupName}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="" disabled selected>
              Select Group
            </option>
            {groupList.map((item, index) => {
              return <option value={item.groupName}>{item.groupName}</option>;
            })}
          </select>
          <br />
          <br />
          <input class="lf--submit" type="submit" value="Update"></input>
        </form>
      </div>
    </>
  );
}

export default UpdateGroup;
