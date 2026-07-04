import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PreferenceSettings from "./pages/PreferenceSettings";
import CreateRoom from "./pages/CreateRoom";
import DashboardBody from "./components/home/DashboardBody";
import JoinRoom from "./pages/JoinRoom";
import WatchRoom from "./pages/WatchRoom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home Layout */}
        <Route path="/home" element={<Home />}>
            <Route index element={<DashboardBody />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-room" element={<CreateRoom />}></Route>
            <Route path="join-room" element={<JoinRoom />}></Route>
            <Route path="room/:roomCode" element={<WatchRoom />}></Route>
        </Route>
       
      
        <Route path="/PreferenceSettings" element={ <PreferenceSettings/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;