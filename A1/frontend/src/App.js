import "./App.css";
import Login from "./components/login";
import UserHome from "./components/userHome";
import CreateUser from "./components/createUser";
import CreateGroup from "./components/createGroup";
import UserProfile from "./components/userProfile";
import UpdateGroup from "./components/updateGroup";
import UpdateOwnEmail from "./components/updateOwnEmail";
import UpdateOwnPass from "./components/updateOwnPass";
import WelcomePage from "./components/welcomePage";
import GroupHome from "./components/groupHome";
import AdminProfile from "./components/adminProfile";
import UpdateStatus from "./components/updateStatus";
import EditProfile from "./components/editProfile";
import CreateApplication from "./components/createApplication";
import KanbanBoard from "./components/kanbanBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//main
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/userPage" element={<UserHome />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/updateGroup" element={<UpdateGroup />} />
          <Route path="/updateOwnEmail" element={<UpdateOwnEmail />} />
          <Route path="/updateOwnPass" element={<UpdateOwnPass />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/groupHome" element={<GroupHome />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/updateGroupStatus" element={<UpdateStatus />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/createApplication" element={<CreateApplication />} />
          <Route path="/kanbanBoard" element={<KanbanBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
