import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Watcher from "./pages/Watcher";
import Kiosk from "./pages/Kiosk";
import Window from "./pages/Window";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/watcher" element={<Watcher />} />
        <Route path="/window" element={<Window />} />
        <Route path="/kiosk" element={<Kiosk />} />
      </Routes>
    </>
  );
}

export default App;
