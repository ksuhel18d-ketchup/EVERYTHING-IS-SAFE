import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import Guardian from "./pages/Guardian";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/guardian" element={<Guardian />} />
        <Route path="/assistant" element={<Assistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;