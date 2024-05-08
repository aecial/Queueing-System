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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NowServing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/watcher/:department" element={<Watcher />} />
        <Route path="/window/:department" element={<Window />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/test/:department" element={<Test />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-department" element={<AddDepartment />} />
        {/* <Route path="/now-serving" element={<NowServing />} /> */}
      </Routes>
    </>
  );
}

export default App;
