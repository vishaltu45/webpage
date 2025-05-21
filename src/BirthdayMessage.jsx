import React from "react";
import "./BirthdayMessage.css";
import FlipCard from "./FlipCard";
import TypewriterSequence from "./TypewriterSequence";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    img: "./photos/BTS.jpg",
    title: "BTS",
    message: "Oh Damn! not that BTS, I meant Behind The Scenes",
    link: "https://ewishwell.com/w/birthday-wish-for-shirin"
  },
  {
    img: "./photos/message.jpg",
    title: "SHORT MESSAGE",
    message: "Ofc message is GPT generated , Don't be too excited.",
    link: "https://vishaltu45.github.io/birthday/"
  },
  {
    img: "./photos/picture1.jpg",
    title: "PHOTO ALBUM",
    message: "Thats all I got",
    link: "./webpage/album"

  },
  {
    img: "./photos/motivation.png",
    title: "DAILY MOTIVATION",
    message: "Hope It Helps",
    link: "https://youtu.be/z6g4GJDXhYI?feature=shared"
  }
];


const greetings = [
  "Happy Birthday",
"ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು",
"जन्मदिन मुबारक हो",
"শুভ জন্মদিন",
"పుట్టినరోజు శుభాకాంక్షలు",
"वाढदिवसाच्या शुभेच्छा",
"பிறந்த நாள் வாழ்த்துக்கள்",
"سالگرہ مبارک ہو",
"જન્મદિવસ ની શુભકામનાઓ",
"ଜନ୍ମଦିନର ଶୁଭେଚ୍ଛା",
"ജന്മദിനാശംസകള്‍",
"ਜਨਮਦਿਨ ਮੁਬਾਰਕ",
"জন্মদিনৰ শুভেচ্ছা",
"जन्मदिनक शुभकामना",
"Johar Janam Din",
"سالگرہ مبارک",
"जन्मदिनको शुभकामना",
"वाढदिवसाच्या शुभेच्छा",
"جنم ڏينهن مبارڪ",
"जन्मदिन मुबारक हो",
"ꯖꯟꯃꯗꯤꯅ ꯑꯃꯨꯔ ꯀꯥꯏ",
"जन्मदिननो हरिगां",
"शुभजन्मदिनम्",

"Feliz cumpleaños",
"Joyeux anniversaire",
"Alles Gute zum Geburtstag",
"Buon compleanno",
"Feliz aniversário",
"С днём рождения",
"生日快乐",
"お誕生日おめでとうございます",
"생일 축하합니다",
"عيد ميلاد سعيد",
"Doğum günün kutlu olsun",
"สุขสันต์วันเกิด",
"Chúc mừng sinh nhật",
"Selamat ulang tahun",
"Selamat hari jadi",
"تولدت مبارک",
"Χρόνια Πολλά",
"יום הולדת שמח",
"Heri ya siku ya kuzaliwa",
"Usuku olumnandi lokuzalwa",
"Gefeliciteerd met je verjaardag",
"Wszystkiego najlepszego z okazji urodzin",
"Grattis på födelsedagen",
"Hyvää syntymäpäivää",
"Boldog születésnapot",
"La mulți ani",
"Všechno nejlepší k narozeninám"

];


const BirthdayMessage = () => {
  return (
    
    <div className="birthday-container">
        
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="./gradient.mp4" type="video/mp4" />
      </video>
      <div className="glass-background-overlay">
       
      {/* Foreground Content */}
       <div className="scaled-foreground">
        
         <div className="message-content">

        <h10 className="birthday-heading">Just Wanted To Say</h10>

        {/* Typewriter Greetings */}
        <TypewriterSequence
          lines={greetings}
          typingSpeed={80}
          pauseBetween={1000}
        />

        {/* ----------------------------- */}
        {/* ✅ UPDATED: Card Rendering */}
        {/* ----------------------------- */}
        <div className="card-grid">
          {cardData.map((card, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.4}s` }}
              className="flip-card-wrapper"
            >
              <FlipCard
                frontContent={
                  <div className="card-front-content">
                    <img
                      src={card.img}
                      alt={`Card ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                }
                backContent={
                  <div className="card-back-content">
                    <h3>{card.title}</h3>
                    <h6>{card.message}</h6>
                    <button onClick={() => window.open(card.link, "_blank")}>
                      Click to Open
                    </button>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default BirthdayMessage;
