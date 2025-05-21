import React from "react";
import "./FlipCard.css";

const FlipCard = ({ frontContent, backContent }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">{frontContent}</div>
        <div className="flip-card-back">{backContent}</div>
      </div>
    </div>
  );
};

export default FlipCard;
