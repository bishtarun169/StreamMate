import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PreferenceSettings from "./pages/PreferenceSettings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home Layout */}
        <Route path="/home" element={<Home />}></Route>
        {/* profile */}
        <Route path="/profile" element={<Profile />} />
       <Route path="/AccountSetting" element={ <PreferenceSettings/>}></Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;