//link to frontend
import axios from "axios";
const API_URL = "http://localhost:8080/";

class Service {
  getLogin(user) {
    return axios.post(API_URL + "userLogin", user).then((res) => {
      return res.data;
    });
  }

  getUserProfile(username) {
    return axios.post(API_URL + "userProfile", username).then((res) => {
      return res.data;
    });
  }

  getAllUsers() {
    return axios.get(API_URL + "findAll").then((res) => {
      return res.data;
    });
  }

  createUsers(username, password, email, groupName) {
    return axios
      .post(API_URL + "createUser", username, password, email, groupName)
      .then((res) => {
        return res.data;
      });
  }

  updateOwnEmail(email) {
    return axios.post(API_URL + "updateOwnEmail", email).then((res) => {
      return res.data;
    });
  }

  updateGroupUsers(groupName) {
    return axios.post(API_URL + "updateGroupUser", groupName).then((res) => {
      return res.data;
    });
  }

  updateGroupStatus(groupStatus) {
    return axios
      .post(API_URL + "updateGroupStatus", groupStatus)
      .then((res) => {
        return res.data;
      });
  }

  EditUserProfile(user) {
    return axios.post(API_URL + "editProfile", user).then((res) => {
      return res.data;
    });
  }

  updateOwnPass(password) {
    return axios.post(API_URL + "updateOwnPass", password).then((res) => {
      return res.data;
    });
  }

  findAllGroup(groupName) {
    return axios.get(API_URL + "findAllGroup", groupName).then((res) => {
      return res.data;
    });
  }

  createGroup(groupName) {
    return axios.post(API_URL + "createGroup", groupName).then((res) => {
      return res.data;
    });
  }

  /*Assignemt 2*/
  createApplication(application) {
    return axios
      .post(API_URL + "createApplication", application)
      .then((res) => {
        return res.data;
      });
  }

  getallApplication() {
    return axios.get(API_URL + "getallApplication").then((res) => {
      return res.data;
    });
  }
}
export default new Service();
