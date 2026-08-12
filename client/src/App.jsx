import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Room from "./pages/Room";
import WatchRoom from "./pages/WatchRoom";
import  VerifyEmail from "./pages/VerifyEmail";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Home Layout */}
        <Route path="/home" element={<Home />}>
            <Route index element={<DashboardBody />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-room" element={<CreateRoom />}></Route>
            <Route path="join-room" element={<JoinRoom />}></Route>
            <Route path="room/:roomCode" element={<WatchRoom />}></Route>
        </Route>
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/PreferenceSettings" element={ <PreferenceSettings/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
