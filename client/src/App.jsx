import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup"; // Ensure correct import
import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import Links from "./pages/Links";
import Settings from "./pages/Settings";
import Appearance from "./pages/Appearance";
import Analytics from "./pages/Analytics";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/links" element={<Links />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/appearance" element={<Appearance />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
