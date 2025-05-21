import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CakePage from "./CakePage"; // Move your existing animation logic into this
import BirthdayMessage from "./BirthdayMessage";
import Photo from "./Photo";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cake" element={<CakePage />} />
        <Route path="/birthday" element={<BirthdayMessage />} /> {/* ✅ Add this */}
        <Route path="/album" element={<Photo />} />
      </Routes>
    
  );
}

export default App;
