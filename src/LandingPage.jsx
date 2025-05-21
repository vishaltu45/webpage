import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function LandingPage() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(100);
  const [filesDeleted, setFilesDeleted] = useState(0);
  const countdownRef = useRef(null);
  const deleteIntervalRef = useRef(null);

  
  useEffect(() => {
    const text = document.querySelector(".hidden-text");
    const torch = document.querySelector(".torch");

    const moveSpotlight = (e) => {
      const rect = text.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Move mask position
      text.style.setProperty("--x", `${x}px`);
      text.style.setProperty("--y", `${y}px`);

      // Move torch emoji
      torch.style.left = `${e.clientX}px`;
      torch.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveSpotlight);
    return () => window.removeEventListener("mousemove", moveSpotlight);
  }, []);


  useEffect(() => {
  countdownRef.current = setInterval(() => {
    setTimeRemaining((prev) => {
      if (prev <= 1) {
        clearInterval(countdownRef.current);
        // Start file deletion interval
        deleteIntervalRef.current = setInterval(() => {
          setFilesDeleted((prevCount) => prevCount + 1);
        }, 2000);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => {
    clearInterval(countdownRef.current);
    clearInterval(deleteIntervalRef.current);
  };
}, []);



  return (
    <div className="landing-container">
      <div className="torch">🔦</div>
      <div className="hidden-text">
        <h3>Hi Shirin!!</h3>
        <h4>Did you know that humans are one of the only species afraid of the dark? You might already be aware of that</h4>
        <h4>but here’s something you don’t know: you now have exactly 100 seconds to click the{" "}
            <span onClick={() => navigate("/cake")}>
                Button
            </span>{" "}
            that turns on the light. If you fail, this code will start to delete files in your laptop, one by one.
            </h4>
        <h4>Good Luck💀</h4>

        <div className="timer-container">
  <div className="timer-box">
    <span className="label">Time Remaining</span>
    <span className="timer-value lcd">{timeRemaining}</span>
  </div>
  <div className="timer-box scary">
  <span className="label">Files Deleted</span>
  <span className="timer-value lcd">{filesDeleted}</span>
</div>
</div>
<div className="hint-text">
  Hint: Click the "Button"
</div>


        
      </div>
    </div>
  );
}

export default LandingPage;
