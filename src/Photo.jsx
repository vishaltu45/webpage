// Install required packages first:
// npm install framer-motion react-pageflip

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import './Photo.css'; // For any custom styles

const photos = [
  '/photos/photo1.png',
  '/photos/photo2.png',
  '/photos/photo3.png',
  '/photos/photo4.png',
  '/photos/photo5.png',
  '/photos/photo6.png',
  '/photos/photo7.png',
  '/photos/photo8.png',
  '/photos/photo9.png',
  '/photos/photo10.png',
  '/photos/photo11.png',
  '/photos/photo12.png',
  '/photos/photo13.png',
  
  
  // Add up to 20
];

const flipSound = new Audio('./sounds/page.mp3');

function FlipbookAlbum() {
  const book = useRef();

  return (
    <div className="flipbook-container">
      <div className="flipbook-wrapper">
        <HTMLFlipBook
          width={500}
          height={700}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          ref={book}
          onFlip={() => {
            flipSound.currentTime = 0;
            flipSound.play();
          }}
        >
          <div className="page cover-page">
            <img src="/photos/cover1.png" alt="Cover Background" className="full-page-img" />
            <div className="spiral-binding"></div>
          </div>

          {photos.map((src, index) => (
            <div className="page photo-page" key={index}>
              <img src={src} alt={`Photo ${index + 1}`} className="full-page-img" />
              <div className="spiral-binding"></div>
            </div>
          ))}

          <div className="page end-page">
            <img src="/photos/cover.png" alt="End Background" className="full-page-img" />
            <div className="spiral-binding"></div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

function LandingPage({ onStart }) {
  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      <motion.button
        className="start-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
      >
        Start Album
      </motion.button>
    </motion.div>
  );
}

export default function App() {
  const [started, setStarted] = React.useState(false);

  return (
    <div className="app">
      {started ? <FlipbookAlbum /> : <LandingPage onStart={() => setStarted(true)} />}
    </div>
  );
}
