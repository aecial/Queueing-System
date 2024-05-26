import "./App.css";
import { Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Watcher from "./pages/Watcher";
import Kiosk from "./pages/Kiosk";
import Window from "./pages/Window";
import Test from "./pages/Test";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import AddDepartment from "./pages/AddDepartment";
import NowServing from "./pages/NowServing";
import WindowPicker from "./pages/WindowPicker";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import WindowManager from "./pages/WindowManager";
import Unauthorized from "./pages/Unauthorized";
import ProtectedTellerRoutes from "./utils/ProtectedTellerRoutes";
import Logout from "./utils/Logout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/now-serving" element={<NowServing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/watcher/:department" element={<Watcher />} />

        <Route path="/window" element={<WindowPicker />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/test/" element={<Test />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedTellerRoutes />}>
          <Route path="/window/:department" element={<Window />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/report" element={<Report />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-window" element={<AddDepartment />} />
          <Route path="/window-manager" element={<WindowManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
