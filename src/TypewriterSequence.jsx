import React, { useEffect, useState } from "react";

const TypewriterSequence = ({ lines, typingSpeed = 80, pauseBetween = 1000 }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + line.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setCurrentLineIndex((prev) => (prev + 1) % lines.length);
      }, pauseBetween);

      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, currentLineIndex, lines, typingSpeed, pauseBetween]);

  return (
    <h1 className="typewriter-line">{currentText}</h1>
  );
};

export default TypewriterSequence;
